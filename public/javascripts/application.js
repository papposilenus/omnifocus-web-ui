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

function clearFormValues(form) {
   for ( i=0; i < form.elements.length; i++) {
       form.elements[i].value = "";
   }

}