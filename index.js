// Declare Vue app
let app;



// Initialize Vue
function load() {
    app = new Vue({
        el: "#app", // Mount to app div
        
        data: {
            darkTheme: false,       // Whether or not dark theme is enabled
            importingJson: false,   // Whether the JSON importer is visible
            jsonInput: "",          // The text in the JSON importer textarea
            categories: [           // The list of categories
                {
                    "name": "Category 1",
                    "weight": 100,
                }
            ],
            assignments: [          // The list of assignments
                {
                    "pointsEarned": 10,
                    "pointsPossible": 10,
                    "categoryIndex":0,
                }
            ],
        },

        methods: {
            // Adds a blank assignment
            addAssignment: function() {
                this.assignments.push({
                    "pointsEarned": null,
                    "pointsPossible": null,
                    "categoryIndex": 0,
                });
            },

            // Remove an assignment
            removeAssignment: function(index) {
                // Remove assignment
                this.assignments.splice(index, 1);

                // Ensure there is at least one assignment
                if (this.assignments.length === 0) {
                    this.addAssignment();
                }
            },

            // Add a blank category
            addCategory: function() {
                this.categories.push({
                    "name": "New category",
                    "weight": 0,
                });
            },

            // Removes a category
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

                // Ensure there is at least one category
                if (this.categories.length === 0) {
                    this.addCategory();
                }
            },

            // Imports JSON from the JSON importer
            importJSON: function() {
                try {
                    // Parse JSON
                    let json = JSON.parse(this.jsonInput);
            
                    // Iterate over assignments
                    newAssignments = []
                    for (let key in json) {
                        // Get point values
                        pointsEarned = isFinite(json[key]["pointsEarned"]) ? json[key]["pointsEarned"] : null;
                        pointsPossible = isFinite(json[key]["pointsPossible"]) ? json[key]["pointsPossible"] : null;
                        
                        // Add assignment
                        newAssignments.push({
                            "pointsEarned": pointsEarned,
                            "pointsPossible": pointsPossible,
                            "categoryIndex": 0,
                        });
                    }

                    // Set assignments
                    if (newAssignments.length > 0) {
                        this.assignments = newAssignments;
                    }
                }
                finally {
                    // Close JSON importer
                    this.importingJson = false;
                }
            },
            
            // Updates the interface theme
            updateTheme: function(darkTheme = null) {
                // Get theme from localStorage
                if (darkTheme === null) {
                    darkTheme = JSON.parse(localStorage.getItem("darkTheme"));
                }

                // Detect preferred color scheme
                if (darkTheme === null) {
                    darkTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
                }
                
                // Set theme
                this.darkTheme = darkTheme

                // Apply theme
                if (this.darkTheme) {
                    document.body.classList.add("dark");
                }
                else {
                    document.body.classList.remove("dark");
                }

                // Save theme
                localStorage.setItem("darkTheme", darkTheme);
            },
        },

        computed: {
            // Gets the final grade as a percentage
            percentage: function() {
                // Get assignment point totals
                let totalEarned = 0;
                let totalPossible = 0;
                for (assignment of this.assignments) {
                    // Get assignment data
                    let weight = parseFloat(this.categories[assignment.categoryIndex].weight);
                    let pointsEarned = parseFloat(assignment.pointsEarned);
                    let pointsPossible = parseFloat(assignment.pointsPossible);

                    // Add to point totals
                    if (isNumber(weight) && isNumber(pointsEarned) && isNumber(pointsPossible)) {
                        totalEarned += weight * pointsEarned;
                        totalPossible += weight * pointsPossible;
                    }
                }

                // Calculate grade percentage
                let gradePercentage = (totalEarned / totalPossible) * 100;

                // Return grade percentage
                return gradePercentage;
            },

            // Gets the final letter grade
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
                else if (isNumber(gradePercentage)) {
                    return "F";
                }
                else {
                    return "";
                }
            },

            // Gets the final grade color 
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
                        return "#EF3D3D";
                    case "":
                    default:
                        return "#808080";
                }
            }
        }
    });

    // Update theme on load
    app.updateTheme();
}



// Determines if a value is a number
function isNumber(value) {
    return typeof(value) === "number" && !isNaN(value);
}
