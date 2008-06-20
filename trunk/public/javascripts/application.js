function toggleNote(id) {
    
    note = $("note-" + id);
    image = $("note-icon-" + id);
    if (note.getStyle('display') != "block") {
        image.src = "../images/Note-selected.png"
    } else {
        image.src = "../images/Note-deselected.png"
    }

    Effect.toggle("note-" + id, 'appear', {duration: 0.3});
}

function clearForms()
{
  var i;
  for (i = 0; (i < document.forms.length); i++) {
    document.forms[i].reset();
  }
}