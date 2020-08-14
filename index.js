// Declare global variables
itemID = 0;

var app;
function load() {
    app = new Vue({
        el: "main",
        data: {
            assignments: [
                {
                    "pointsEarned": 10,
                    "pointsPossible": 10,
                }
            ],
            categories: [
                {
                    "name": "Category 1",
                    "weight": 100,
                }
            ]
        },
        methods: {
            addAssignment: function() {
                this.assignments.push({
                    "pointsEarned": null,
                    "pointsPossible": null,
                });
                update();
            },
            removeAssignment: function(index) {
                this.assignments.splice(index, 1)
                update();
            },
            addCategory: function() {
                this.categories.push({
                    "name": "New category",
                    "weight": 0,
                });
                update();
            },
            removeCategory: function(index) {
                this.categories.splice(index, 1)
                update();
            }
        },
    });
}



// Updates the interface theme
function UpdateTheme(theme = null) {
    // Get theme from localStorage
    if (theme === null) {
        theme = localStorage.getItem("theme");
    }

    // Detect preferred color scheme
    if (theme === null) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = "Dark";
        }
        else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            theme = "Light";
        }
    }
    
    // Apply theme
    if (theme === "Dark") {
        // Add dark class
        document.body.classList.add("dark");
    
        // Update toggle
        document.getElementById("toggleTheme").textContent = "Light theme";
        document.getElementById("toggleTheme").href = "javascript:UpdateTheme('Light');";
    }
    else {
        // Add light class
        document.body.classList.remove("dark");
    
        // Update toggle
        document.getElementById("toggleTheme").textContent = "Dark theme";
        document.getElementById("toggleTheme").href = "javascript:UpdateTheme('Dark');";
    }

    // Save theme
    localStorage.setItem("theme", theme);
}



// Updates the final grade
function update() {
    // Get assignment point totals
    let totalEarned = 0;
    let totalPossible = 0;
    for (assignment of document.getElementsByClassName("assignment")) {
        // Get assignment data
        let weight = parseFloat(assignment.getElementsByClassName("selectCategory")[0].value);
        let pointsEarned = parseFloat(assignment.getElementsByClassName("pointsEarned")[0].value);
        let pointsPossible = parseFloat(assignment.getElementsByClassName("pointsPossible")[0].value);

        // Add to point totals
        if (!isNaN(weight) && !isNaN(pointsEarned) && !isNaN(pointsPossible)) {
            totalEarned += weight * pointsEarned;
            totalPossible += weight * pointsPossible;
        }
    }

    // Clear color classes
    gradeElement = document.getElementById("grade");
    gradeElement.classList.remove("letterA");
    gradeElement.classList.remove("letterB");
    gradeElement.classList.remove("letterC");
    gradeElement.classList.remove("letterD");
    gradeElement.classList.remove("letterF");

    // Calculate grade percentage
    let gradePercentage = (totalEarned / totalPossible) * 100;

    // Set grade percentage
    if (isFinite(gradePercentage)) {
        document.getElementById("gradePercentage").textContent = `${gradePercentage.toFixed(3)}%`;
    }
    else {
        document.getElementById("gradePercentage").textContent = gradePercentage;
    }

    // Round grade percentage (only effects letter grades)
    gradePercentage = Math.round(gradePercentage);

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



// Opens the import div
function openImportDiv() {
    document.getElementById("mainContainer").hidden = true;
    document.getElementById("importContainer").hidden = false;
}



// Closes the import div
function closeImportDiv() {
    document.getElementById("importBox").value = "";
    document.getElementById("importContainer").hidden = true;
    document.getElementById("mainContainer").hidden = false;
}



// Import grades
function importJSON() {
    try {
        // Parse JSON
        let json = JSON.parse(document.getElementById("importBox").value);

        // Remove existing assignments
        let assignments = document.getElementsByClassName("assignment");
        while (assignments.length > 0) {
            assignment.parentNode.removeChild(assignments[0]);
        }

        // Iterate over assignments
        for (let key in json) {
            // Get assignment info
            let earned = json[key]["pointsEarned"];
            let possible = json[key]["pointsPossible"];
            
            if (!isFinite(earned)) { earned = null; }
            if (!isFinite(possible)) { possible = null; }
            
            // Add assignment
            addAssignment(earned, possible);
        }
    }
    finally {
        // Close import div
        closeImportDiv();
    }
}
