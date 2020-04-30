// Declare global variables
assignmentID = 0;



// Adds an assignment
function addAssignment() {
    // Create row
    var clone = document.getElementById("assignmentTemplate").content.cloneNode(true);

    // Set row id
    clone.children[0].setAttribute("id", `assignment-${assignmentID}`);
    
    // Add remove button onclick attribute
    clone.getElementById("assignmentRemove").setAttribute("onclick", `var element = document.getElementById('assignment-${assignmentID}'); element.parentNode.removeChild(element);`);
    
    // Add row
    document.getElementById("assignments").appendChild(clone);
    
    // Increment assignmentID
    assignmentID++;
}