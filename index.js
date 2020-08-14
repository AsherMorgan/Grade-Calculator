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
                    "categoryIndex":0,
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
                    "categoryIndex": 0,
                });
            },
            removeAssignment: function(index) {
                this.assignments.splice(index, 1);
            },
            addCategory: function() {
                this.categories.push({
                    "name": "New category",
                    "weight": 0,
                });
            },
            removeCategory: function(index) {
                // Correct assignment category indexes
                for (assignment of this.assignments) {
                    if (assignment.categoryIndex == index) {
                        assignment.categoryIndex = 0;
                    }
                    else if (assignment.categoryIndex > index) {
                        assignment.categoryIndex--;
                    }
                }

                // Remove category
                this.categories.splice(index, 1);
            }
        },
        computed: {
            percentage: function() {
                // Get assignment point totals
                let totalEarned = 0;
                let totalPossible = 0;
                for (assignment of this.assignments) {
                    // Get assignment data
                    let weight = this.categories[assignment.categoryIndex].weight
                    let pointsEarned = assignment.pointsEarned;
                    let pointsPossible = assignment.pointsPossible;

                    // Add to point totals
                    if (weight !== null && pointsEarned !== null && pointsPossible !== null) {
                        totalEarned += weight * pointsEarned;
                        totalPossible += weight * pointsPossible;
                    }
                }

                // Calculate grade percentage
                let gradePercentage = (totalEarned / totalPossible) * 100;

                // Return grade percentage
                return gradePercentage.toFixed(3);
            },
            letter: function() {
                // Get grade percentage
                gradePercentage = this.percentage;
                
                // Return letter
                if (gradePercentage >= 97) {
                    return "A+";
                }
                else if (gradePercentage >= 93) {
                    return "A";
                }
                else if (gradePercentage >= 90) {
                    return "A-";
                }
                else if (gradePercentage >= 87) {
                    return "B+";
                }
                else if (gradePercentage >= 83) {
                    return "B";
                }
                else if (gradePercentage >= 80) {
                    return "B-";
                }
                else if (gradePercentage >= 77) {
                    return "C+";
                }
                else if (gradePercentage >= 73) {
                    return "C";
                }
                else if (gradePercentage >= 70) {
                    return "C-";
                }
                else if (gradePercentage >= 67) {
                    return "D+";
                }
                else if (gradePercentage >= 63) {
                    return "D";
                }
                else if (gradePercentage >= 60) {
                    return "D-";
                }
                else if (gradePercentage || gradePercentage === 0) {
                    return "F";
                }
                else {
                    return "";
                }
            },
            color: function() {
                // Get grade letter
                letter = this.letter;

                // Return color
                switch (letter) {
                    case "A+":
                    case "A":
                    case "A-":
                        return "#87BD6C";
                    case "B+":
                    case "B":
                    case "B-":
                        return "#CFE7FF";
                    case "C+":
                    case "C":
                    case "C-":
                        return "#FFFF8D";
                    case "D+":
                    case "D":
                    case "D-":
                        return "#F9AC48";
                    case "F":
                    default:
                        return "#EF3D3D";
                }
            }
        }
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
