
(function() {

var slideSpeed = 5.5;
var slideInterval = 0;

var currentPage = null;
var currentDialog = null;
var currentWidth = 0;
var currentHash = location.hash;
var hashPrefix = "#_";
var pageHistory = [];
var newPageCount = 0;
var animating = false;

// *************************************************************************************************

window.iui =
{
    showPage: function(page, backwards)
    {
        if (page)
        {
            if (currentDialog)
            {
                currentDialog.removeAttribute("selected");
                currentDialog = null;
            }

            if (hasClass(page, "dialog"))
                showDialog(page);
            else
            {
                var fromPage = currentPage;
                currentPage = page;

                if (!page.id)
                    page.id = "__" + (++newPageCount) + "__";

                location.href = currentHash = hashPrefix + page.id;
                pageHistory.push(page.id);

                if (fromPage)
                    setTimeout(slidePages, 0, fromPage, page, backwards);
                else
                    updatePage(page, fromPage);
            }
        }
    },

    showPageById: function(pageId)
    {
        var page = $(pageId);
        if (page)
        {
            var index = pageHistory.indexOf(pageId);
            var backwards = index != -1;
            if (backwards)
                pageHistory.splice(index, pageHistory.length);

            iui.showPage(page, backwards);
        }
    },

    showPageByHref: function(href, args, method, replace, cb)
    {
        var req = new XMLHttpRequest();
        req.onerror = function()
        {
            if (cb)
                cb(false);
        };
        
        req.onreadystatechange = function()
        {
            if (req.readyState == 4)
            {
                if (replace)
                    replaceElementWithSource(replace, req.responseText);
                else
                {
                    var frag = document.createElement("div");
                    frag.innerHTML = req.responseText;
                    iui.insertPages(frag.childNodes);
                }
                if (cb)
                    setTimeout(cb, 1000, true);
            }
        };

        if (args)
        {
            req.open(method || "GET", href, true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.setRequestHeader("Content-Length", args.length);
            req.send(args.join("&"));
        }
        else
        {
            req.open(method || "GET", href, true);
            req.send(null);
        }
    },
    
    insertPages: function(nodes)
    {
        var targetPage;
        for (var i = 0; i < nodes.length; ++i)
        {
            var child = nodes[i];
            if (child.nodeType == 1)
            {
                if (!child.id)
                    child.id = "__" + (++newPageCount) + "__";

                var clone = $(child.id);
                if (clone)
                    clone.parentNode.replaceChild(child, clone);
                else
                    document.body.appendChild(child);

                if (child.getAttribute("selected") == "true" || !targetPage)
                    targetPage = child;
                
                --i;
            }
        }

        if (targetPage)
            iui.showPage(targetPage);    
    },

    getSelectedPage: function()
    {
        for (var child = document.body.firstChild; child; child = child.nextSibling)
        {
            if (child.nodeType == 1 && child.getAttribute("selected") == "true")
                return child;
        }    
    }    
};

// *************************************************************************************************

addEventListener("load", function(event)
{
    var page = iui.getSelectedPage();
    if (page)
        iui.showPage(page);

    setTimeout(preloadImages, 0);
    setTimeout(checkOrientAndLocation, 0);
    setInterval(checkOrientAndLocation, 300);
}, false);
    
addEventListener("click", function(event)
{
    var link = findParent(event.target, "a");
    if (link)
    {
        function unselect() { link.removeAttribute("selected"); }
        
        if (link.href && link.hash && link.hash != "#")
        {
            link.setAttribute("selected", "true");
            iui.showPage($(link.hash.substr(1)));
            setTimeout(unselect, 500);
        }
        else if (link == $("backButton"))
            history.back();
        else if (link.getAttribute("type") == "submit")
            submitForm(findParent(link, "form"));
        else if (link.getAttribute("type") == "cancel")
            cancelDialog(findParent(link, "form"));
        else if (link.target == "_replace")
        {
            link.setAttribute("selected", "progress");
            iui.showPageByHref(link.href, null, null, link, unselect);
        }
        else if (!link.target)
        {
            link.setAttribute("selected", "progress");
            iui.showPageByHref(link.href, null, null, null, unselect);
        }
        else
            return;
        
        event.preventDefault();        
    }
}, true);

addEventListener("click", function(event)
{
    var div = findParent(event.target, "div");
    if (div && hasClass(div, "toggle"))
    {
        div.setAttribute("toggled", div.getAttribute("toggled") != "true");
        event.preventDefault();        
    }
}, true);

function checkOrientAndLocation()
{                              
    if (animating)
        return;
    
    if (window.innerWidth != currentWidth)
    {   
        currentWidth = window.innerWidth;
        var orient = currentWidth == 320 ? "profile" : "landscape";
        document.body.setAttribute("orient", orient);
        setTimeout(scrollTo, 100, 0, 1);
    }

    if (location.hash != currentHash)
    {
        var pageId = location.hash.substr(hashPrefix.length)
        iui.showPageById(pageId);
    }
}

function showDialog(page)
{
    currentDialog = page;
    page.setAttribute("selected", "true");
    
    if (hasClass(page, "dialog") && !page.target)
        showForm(page);
}

function showForm(form)
{
    form.onsubmit = function(event)
    {
        event.preventDefault();
        submitForm(form);
    };
    
    form.onclick = function(event)
    {
        if (event.target == form && hasClass(form, "dialog"))
            cancelDialog(form);
    };
}

function cancelDialog(form)
{
    form.removeAttribute("selected");
}

function updatePage(page, fromPage)
{
    var pageTitle = $("pageTitle");
    if (page.title)
        pageTitle.innerHTML = page.title;

    if (page.localName.toLowerCase() == "form" && !page.target)
        showForm(page);
        
    var backButton = $("backButton");
    if (backButton)
    {
        var prevPage = $(pageHistory[pageHistory.length-2]);
        if (prevPage && !page.getAttribute("hideBackButton"))
        {
            backButton.style.display = "inline";
            backButton.innerHTML = prevPage.title ? prevPage.title : "Back";
        }
        else
            backButton.style.display = "none";
    }
    
    animating = false;
}

function slidePages(fromPage, toPage, backwards)
{
    animating = true;

    var titlebar = findParent($("pageTitle"), "div");
    var titlebar2 = titlebar.cloneNode(true);
    titlebar2.style.position = "absolute";
    titlebar2.style.top = "0";
    titlebar2.style.width = titlebar.offsetWidth + "px";
    titlebar2.style.left = "100%";
    document.body.appendChild(titlebar2);

    if (backwards)
    {
        var from2 = fromPage.cloneNode(true);
        from2.style.left = "100%";
        document.body.appendChild(from2);
        scrollTo(320, 1);
    }
    
    setTimeout(function()
    {
        if (backwards)
        {
            fromPage.style.left = "100%";
            document.body.removeChild(from2);
        }
        
        toPage.style.left = backwards ? "0" : "100%";

        toPage.setAttribute("selected", "true");
        scrollTo(0, 1);
        animating = true;

        var percent = 100;
        var timer = setInterval(slide, slideInterval);

        function slide()
        {
            percent -= slideSpeed;
            if (percent <= 0)
            {
                percent = 0;
                clearInterval(timer);

                if (!hasClass(toPage, "dialog"))
                    fromPage.removeAttribute("selected");
            }

            var x = backwards ? (320 + (((percent-100)/100) * 320)) : ((100-percent)/100) * 320;
            scrollTo(x, 1);

            if (percent == 0)
            {
                if (!backwards)
                {
                    var page2 = toPage.cloneNode(true);
                    page2.style.left = "0";
                    document.body.appendChild(page2);

                    setTimeout(function() {
                        scrollTo(0, 1);
                        toPage.style.left = "0";
                        document.body.removeChild(page2);
                    }, 0);
                }

                setTimeout(function() {
                    document.body.removeChild(titlebar2);
                    setTimeout(updatePage, 0, toPage, fromPage);
                }, 0);
            }
        }
    }, 10);
}

function preloadImages()
{
    var preloader = document.createElement("div");
    preloader.id = "preloader";
    document.body.appendChild(preloader);
}

function submitForm(form)
{
    iui.showPageByHref(form.action || "POST", encodeForm(form), form.method);
}

function encodeForm(form)
{
    function encode(inputs)
    {
        for (var i = 0; i < inputs.length; ++i)
        {
            if (inputs[i].name)
                args.push(inputs[i].name + "=" + escape(inputs[i].value));
        }
    }

    var args = [];
    encode(form.getElementsByTagName("input"));
    encode(form.getElementsByTagName("select"));
    return args;    
}

function findParent(node, localName)
{
    while (node && (node.nodeType != 1 || node.localName.toLowerCase() != localName))
        node = node.parentNode;
    return node;
}

function hasClass(self, name)
{
    var re = new RegExp("(^|\\s)"+name+"($|\\s)");
    return re.exec(self.getAttribute("class")) != null;
}

function replaceElementWithSource(replace, source)
{
    var page = replace.parentNode;
    var parent = replace;
    while (page.parentNode != document.body)
    {
        page = page.parentNode;
        parent = parent.parentNode;
    }

    var frag = document.createElement(parent.localName);
    frag.innerHTML = source;

    page.removeChild(parent);

    while (frag.firstChild)
        page.appendChild(frag.firstChild);
}

function $(id) { return document.getElementById(id); }
function ddd() { console.log.apply(console, arguments); }

})();