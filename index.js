// Declare Vue app
let app;



/**
 * Initializes the Vue
 */
function loadVue() {
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
            /**
             * Add a blank assignment
             */
            addAssignment: function() {
                this.assignments.push({
                    "pointsEarned": null,
                    "pointsPossible": null,
                    "categoryIndex": 0,
                });
            },

            /**
             * Remove an assignment
             * @param {Number} index - The index of the assignment
             */
            removeAssignment: function(index) {
                // Remove assignment
                this.assignments.splice(index, 1);

                // Ensure there is at least one assignment
                if (this.assignments.length === 0) {
                    this.addAssignment();
                }
            },

            /**
             * Add a blank category
             */
            addCategory: function() {
                this.categories.push({
                    "name": "New category",
                    "weight": 0,
                });
            },

            /**
             * Remove a category
             * @param {Number} index - The index of the category
             */
            removeCategory: function(index) {
                // Correct assignment category indexes
                for (let assignment of this.assignments) {
                    if (assignment.categoryIndex === index) {
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

            /**
             * Import JSON from the JSON importer
             */
            importJSON: function() {
                try {
                    // Parse JSON
                    let json = JSON.parse(this.jsonInput);

                    // Iterate over assignments
                    let newAssignments = []
                    for (let key in json) {
                        // Get point values
                        let pointsEarned = isFinite(json[key]["pointsEarned"]) ? json[key]["pointsEarned"] : null;
                        let pointsPossible = isFinite(json[key]["pointsPossible"]) ? json[key]["pointsPossible"] : null;

                        // Add assignment
                        newAssignments.push({
                            "pointsEarned": pointsEarned,
                            "pointsPossible": pointsPossible,
                            "categoryIndex": 0,
                        });
                    }

                    // Set assignments
                    if (newAssignments.length > 0) {
                        // Update assignments
                        this.assignments = newAssignments;

                        // Close JSON importer and clear input
                        this.importingJson = false;
                        this.jsonInput = "";
                    }
                    else {
                        alert("The JSON string does not contain any assignments.");
                    }
                }
                catch (error) {
                    // Log error
                    console.error(error);

                    // Alert user of error
                    if (error.name === "SyntaxError") {
                        alert("The JSON string is invalid.");
                    }
                    else {
                        alert("An error occured, check the console for more details.");
                    }
                }
            },

            /**
             * Update the interface theme
             * @param {bool} darkTheme - False for light mode, true for dark mode, null to detect the prefered theme.
             */
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
            /**
             * The percentage of the final grade
             * @returns {Number} - The final grade
             */
            percentage: function() {
                // Get assignment point totals
                let totalEarned = 0;
                let totalPossible = 0;
                for (let assignment of this.assignments) {
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

            /**
             * The final grade as a letter grade
             * @returns {String} - The letter grade
             */
            letter: function() {
                // Get grade percentage
                let gradePercentage = this.percentage;

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

            /**
             * The color of the final grade
             * @returns {String} - The color class
             */
            color: function() {
                // Get grade letter
                let letter = this.letter;

                // Return color
                switch (letter) {
                    case "A+":
                    case "A":
                    case "A-":
                        return "letter-a";
                    case "B+":
                    case "B":
                    case "B-":
                        return "letter-b";
                    case "C+":
                    case "C":
                    case "C-":
                        return "letter-c";
                    case "D+":
                    case "D":
                    case "D-":
                        return "letter-d";
                    case "F":
                        return "letter-f";
                    case "":
                    default:
                        return "letter-na";
                }
            }
        },

        created: function() {
            // Update theme
            this.updateTheme();
        },
    });
}



/**
 * Load the Vue and the page
 */
function load() {
    // Initialize Vue
    loadVue();

    // Unhide hidden divs
    // Divs were hidden to improve interface for users with JS blocked
    document.getElementById("finalGrade").hidden = false;
    document.getElementById("importContainer").hidden = false;
    document.getElementById("categories").hidden = false;
    document.getElementById("assignments").hidden = false;
    document.querySelector("footer").hidden = false;
}



/**
 * Determine if a value is a number
 * @param {*} value - The value to test
 */
function isNumber(value) {
    return typeof(value) === "number" && !isNaN(value);
}
