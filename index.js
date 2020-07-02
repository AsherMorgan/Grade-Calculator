// Declare global variables
itemID = 0;



// Adds an assignment
function addAssignment(pointsEarned = 10, pointsPossible = 10) {
    // Create row
    var clone = document.getElementById("assignmentTemplate").content.cloneNode(true);

    // Set row id
    clone.children[0].setAttribute("id", `assignment-${itemID}`);
    
    // Set grade
    clone.getElementById("pointsEarned").value = pointsEarned;
    clone.getElementById("pointsPossible").value = pointsPossible;
    
    // Add remove button onclick attribute
    clone.getElementById("assignmentRemove").setAttribute("onclick", `var element = document.getElementById('assignment-${itemID}'); element.parentNode.removeChild(element); update();`);
    
    // Add row
    document.getElementById("assignments").appendChild(clone);
    
    // Increment itemID
    itemID++;

    // Update grade and add category options
    update();
}



// Adds a category
function addCategory() {
    // Create row
    var clone = document.getElementById("categoryTemplate").content.cloneNode(true);

    // Set row id
    clone.children[0].setAttribute("id", `category-${itemID}`);
    
    // Add remove button onclick attribute
    clone.getElementById("categoryRemove").setAttribute("onclick", `var element = document.getElementById('category-${itemID}'); element.parentNode.removeChild(element); update();`);
    
    // Add row
    document.getElementById("categories").appendChild(clone);
    
    // Increment itemID
    itemID++;

    // Update category options
    update();
}



// Updates assignment categories and the final grade
function update() {
    // Get category options
    var options = []
    for (category of document.getElementsByClassName("category")) {
        // Create option
        var option = document.createElement('option');

        // Set option properties
        option.text = category.getElementsByClassName("categoryName")[0].value;
        option.value = category.getElementsByClassName("categoryWeight")[0].value;

        // Add option
        options.push(option)
    }

    // Update categories
    for (selectCategory of document.getElementsByClassName("selectCategory")) {
        // Get index of currently selected category
        var index = selectCategory.selectedIndex;

        // Remove existing category actions
        selectCategory.innerHTML = "";

        // Set category options
        for (option of options) {
            selectCategory.appendChild(option.cloneNode(true));
        }

        // Reset index
        if (index == -1 || index >= options.length) {
            selectCategory.selectedIndex = 0;
        }
        else {
            selectCategory.selectedIndex = index;
        }
    }

    // Get assignment point totals
    var pointsEarned = 0;
    var pointsPossible = 0;
    for (assignment of document.getElementsByClassName("assignment")) {
        weight = parseFloat(assignment.getElementsByClassName("selectCategory")[0].value) || 0;
        pointsEarned += weight * parseFloat(assignment.getElementsByClassName("pointsEarned")[0].value);
        pointsPossible += weight * parseFloat(assignment.getElementsByClassName("pointsPossible")[0].value);
    }

    // Clear color classes
    gradeElement = document.getElementById("grade");
    gradeElement.classList.remove("letterA");
    gradeElement.classList.remove("letterB");
    gradeElement.classList.remove("letterC");
    gradeElement.classList.remove("letterD");
    gradeElement.classList.remove("letterF");

    // Calculate grade percentage
    var gradePercentage = (pointsEarned / pointsPossible) * 100;
    if (isFinite(gradePercentage)) {
        document.getElementById("gradePercentage").textContent = `${gradePercentage.toFixed(3)}%`;
    }
    else {
        document.getElementById("gradePercentage").textContent = gradePercentage;
    }

    // Set letter and color
    if (gradePercentage >= 97) {
        gradeElement.classList.add("letterA");
        document.getElementById("gradeLetter").textContent = "A+";
    }
    else if (gradePercentage >= 93) {
        gradeElement.classList.add("letterA");
        document.getElementById("gradeLetter").textContent = "A";
    }
    else if (gradePercentage >= 90) {
        gradeElement.classList.add("letterA");
        document.getElementById("gradeLetter").textContent = "A-";
    }
    else if (gradePercentage >= 87) {
        gradeElement.classList.add("letterB");
        document.getElementById("gradeLetter").textContent = "B+";
    }
    else if (gradePercentage >= 83) {
        gradeElement.classList.add("letterB");
        document.getElementById("gradeLetter").textContent = "B";
    }
    else if (gradePercentage >= 80) {
        gradeElement.classList.add("letterB");
        document.getElementById("gradeLetter").textContent = "B-";
    }
    else if (gradePercentage >= 77) {
        gradeElement.classList.add("letterC");
        document.getElementById("gradeLetter").textContent = "C+";
    }
    else if (gradePercentage >= 73) {
        gradeElement.classList.add("letterC");
        document.getElementById("gradeLetter").textContent = "C";
    }
    else if (gradePercentage >= 70) {
        gradeElement.classList.add("letterC");
        document.getElementById("gradeLetter").textContent = "C-";
    }
    else if (gradePercentage >= 67) {
        gradeElement.classList.add("letterD");
        document.getElementById("gradeLetter").textContent = "D+";
    }
    else if (gradePercentage >= 63) {
        gradeElement.classList.add("letterD");
        document.getElementById("gradeLetter").textContent = "D";
    }
    else if (gradePercentage >= 60) {
        gradeElement.classList.add("letterD");
        document.getElementById("gradeLetter").textContent = "D-";
    }
    else if (gradePercentage || gradePercentage === 0) {
        gradeElement.classList.add("letterF");
        document.getElementById("gradeLetter").textContent = "F";
    }
    else {
        document.getElementById("gradeLetter").textContent = "";
    }
}
