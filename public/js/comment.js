
function createNewElement() {
    // First create a DIV element.
	var txtNewInputBox = document.createElement('div');
    var txtNewButton = document.createElement('div');

    // Then add the content (a new input box) of the element.
	txtNewInputBox.innerHTML = "<input type='text' id='newInputBox'>";

      // Then add the content (a new input box) of the element.
	txtNewButton.innerHTML = "<button id='newButton'>Submit</button>";

    // Finally put it where it is supposed to appear.
	document.getElementById("newElementId").appendChild(txtNewInputBox);
    document.getElementById("newElementId").appendChild(txtNewButton);
}
