describe("App", function () {
    describe("Created lifecycle hook", function () {
        beforeEach(function () {
            // Initialize Vue
            loadVue();
        });

        it("ImportingJSON should be false", function () {
            expect(app.importingJson).to.equal(false);
        });
        
        it("JsonInput should be empty", function () {
            expect(app.jsonInput).to.equal("");
        });
        
        it("Should have 1 category with default properties", function () {
            expect(app.categories.length).to.equal(1);
            expect(app.categories[0].name).to.equal("Category 1");
            expect(app.categories[0].weight).to.equal(100);
        });
        
        it("Should have 1 assignment with default properties", function () {
            expect(app.assignments.length).to.equal(1);
            expect(app.assignments[0].pointsEarned).to.equal(10);
            expect(app.assignments[0].pointsPossible).to.equal(10);
            expect(app.assignments[0].categoryIndex).to.equal(0);
        });
        
        it("LocalStorage darkTheme item should match the darkTheme property", function () {
            expect(JSON.parse(localStorage.getItem("darkTheme"))).to.equal(app.darkTheme);
        });
    });
    
    describe("AddAssignment method", function () {
        beforeEach(function () {
            // Initialize Vue
            loadVue();
        });

        it("Should add a blank assignment", function () {
            // Add assignment
            app.addAssignment();

            // Assert assignment added
            expect(app.assignments.length).to.equal(2);
            expect(app.assignments[0].pointsEarned).to.equal(10);
            expect(app.assignments[0].pointsPossible).to.equal(10);
            expect(app.assignments[0].categoryIndex).to.equal(0);
            expect(app.assignments[1].pointsEarned).to.equal(null);
            expect(app.assignments[1].pointsPossible).to.equal(null);
            expect(app.assignments[1].categoryIndex).to.equal(0);
        });
    });
    
    describe("RemoveAssignment method", function () {
        beforeEach(function () {
            // Initialize Vue
            loadVue();
        });

        it("Should remove the specified assignment", function () {
            // Initialize assignments
            app.assignments = [
                {
                    "pointsEarned": 10,
                    "pointsPossible": 10,
                    "categoryIndex":0,
                },
                {
                    "pointsEarned": 20,
                    "pointsPossible": 20,
                    "categoryIndex":0,
                },
                {
                    "pointsEarned": 30,
                    "pointsPossible": 30,
                    "categoryIndex":0,
                }
            ];

            // Remove assignment
            app.removeAssignment(1);

            // Assert assignment removed
            expect(app.assignments.length).to.equal(2);
            expect(app.assignments[0].pointsEarned).to.equal(10);
            expect(app.assignments[0].pointsPossible).to.equal(10);
            expect(app.assignments[0].categoryIndex).to.equal(0);
            expect(app.assignments[1].pointsEarned).to.equal(30);
            expect(app.assignments[1].pointsPossible).to.equal(30);
            expect(app.assignments[1].categoryIndex).to.equal(0);
        });

        it("Should add a blank assignment when there are no more assignments", function () {
            // Remove assignment
            app.removeAssignment(0);

            // Assert assignment removed and blank assignment added
            expect(app.assignments.length).to.equal(1);
            expect(app.assignments[0].pointsEarned).to.equal(null);
            expect(app.assignments[0].pointsPossible).to.equal(null);
            expect(app.assignments[0].categoryIndex).to.equal(0);
        });
    });
    
    describe("AddCategory method", function () {
        beforeEach(function () {
            // Initialize Vue
            loadVue();
        });
        
        it("Should add a blank category", function () {
            // Add category
            app.addCategory();

            // Assert category added
            expect(app.categories.length).to.equal(2);
            expect(app.categories[0].name).to.equal("Category 1");
            expect(app.categories[0].weight).to.equal(100);
            expect(app.categories[1].name).to.equal("New category");
            expect(app.categories[1].weight).to.equal(0);
        });
    });

    describe("RemoveCategory method", function () {
        beforeEach(function () {
            // Initialize Vue
            loadVue();
        });

        it("Should remove the specified category", function () {
            // Initialize categories
            app.categories = [
                {
                    "name": "Category 1",
                    "weight": 100,
                },
                {
                    "name": "Category 2",
                    "weight": 200,
                },
                {
                    "name": "Category 3",
                    "weight": 300,
                },
            ];

            // Remove category
            app.removeCategory(1);

            // Assert category removed
            expect(app.categories.length).to.equal(2);
            expect(app.categories[0].name).to.equal("Category 1");
            expect(app.categories[0].weight).to.equal(100);
            expect(app.categories[1].name).to.equal("Category 3");
            expect(app.categories[1].weight).to.equal(300);
        });

        it("Should add a blank category when there are no more categories", function () {
            // Remove category
            app.removeCategory(0);

            // Assert category removed and blank category added
            expect(app.categories.length).to.equal(1);
            expect(app.categories[0].name).to.equal("New category");
            expect(app.categories[0].weight).to.equal(0);
        });
    });

    describe("ImportJSON method", function () {
        beforeEach(function () {
            // Initialize Vue
            loadVue();
        });

        it("Valid JSON should be imported", function () {
            // Input JSON string
            app.importingJson = true;
            app.jsonInput = "[{\"pointsEarned\": 15, \"pointsPossible\": \"20\"}, {\"pointsEarned\": null}]";

            // Import JSON
            app.importJSON();

            // Assert assignments imported
            expect(app.assignments.length).to.equal(2);
            expect(app.assignments[0].pointsEarned).to.equal(15);
            expect(app.assignments[0].pointsPossible).to.equal("20");
            expect(app.assignments[0].categoryIndex).to.equal(0);
            expect(app.assignments[1].pointsEarned).to.equal(null);
            expect(app.assignments[1].pointsPossible).to.equal(null);
            expect(app.assignments[1].categoryIndex).to.equal(0);

            // Assert JSON importer closed
            expect(app.importingJson).to.equal(false);
        });

        it("JSON should not be imported if it doesn't contain any assignments", function () {
            // Input JSON string
            app.importingJson = true;
            app.jsonInput = "[]";

            // Mock 'alert' method
            let old_alert = alert;
            alert = function() {};

            // Import JSON
            app.importJSON();

            // Assert assignments not imported
            expect(app.assignments.length).to.equal(1);
            expect(app.assignments[0].pointsEarned).to.equal(10);
            expect(app.assignments[0].pointsPossible).to.equal(10);
            expect(app.assignments[0].categoryIndex).to.equal(0);

            // Assert JSON importer not closed
            expect(app.importingJson).to.equal(true);

            // Restore alert method
            alert = old_alert;
        });

        it("Invalid JSON should not be imported", function () {
            // Input JSON string
            app.importingJson = true;
            app.jsonInput = "test";

            // Mock 'alert' method
            let old_alert = alert;
            alert = function() {};

            // Import JSON
            try {
                app.importJSON();
            }
            catch {
                // JSON.parse will throw a syntax error due to invalid JSON
            }

            // Assert assignments not imported
            expect(app.assignments.length).to.equal(1);
            expect(app.assignments[0].pointsEarned).to.equal(10);
            expect(app.assignments[0].pointsPossible).to.equal(10);
            expect(app.assignments[0].categoryIndex).to.equal(0);

            // Assert JSON importer not closed
            expect(app.importingJson).to.equal(true);

            // Restore alert method
            alert = old_alert;
        });
    });

    describe("UpdateTheme method", function () {
        beforeEach(function () {
            // Initialize Vue
            loadVue();
        });

        it("Should update darkTheme property", function () {
            // Save original setting from localStorage
            let originalValue = JSON.parse(localStorage.getItem("darkTheme"));
            
            // Update theme and assert darkTheme property updated
            app.updateTheme(true);
            expect(app.darkTheme).to.equal(true);
            
            // Update theme and reassert darkTheme property updated
            app.updateTheme(false);
            expect(app.darkTheme).to.equal(false);

            // Restore original setting to localStorage
            localStorage.setItem("darkTheme", originalValue);
        });

        it("Should update localStorage darkTheme property", function () {
            // Save original setting from localStorage
            let originalValue = JSON.parse(localStorage.getItem("darkTheme"));

            // Update theme and assert localstorage setting updated
            app.updateTheme(true);
            expect(JSON.parse(localStorage.getItem("darkTheme"))).to.equal(true);
            
            // Update theme and reassert localstorage setting updated
            app.updateTheme(false);
            expect(JSON.parse(localStorage.getItem("darkTheme"))).to.equal(false);

            // Restore original setting to localStorage
            localStorage.setItem("darkTheme", originalValue);
        });
    });

    describe("Percentage property", function () {
        beforeEach(function () {
            // Initialize Vue
            loadVue();
        });

        it("Should be correctly calculated from the assignments and categories.", function () {
            // Initialize categories and assignments
            app.categories = [
                {
                    "name": "Category 1",
                    "weight": 100,
                },
                {
                    "name": "Category 2",
                    "weight": 50,
                }
            ];
            app.assignments = [
                {
                    "pointsEarned": 10,
                    "pointsPossible": 10,
                    "categoryIndex":0,
                },
                {
                    "pointsEarned": 15,
                    "pointsPossible": 20,
                    "categoryIndex":1,
                }
            ];

            // Assert percentage is correct
            expect(app.percentage).to.equal(87.5);
        });

        it("Should be NaN when assignment values are all null", function () {
            // Initialize assignments
            app.assignments = [
                {
                    "pointsEarned": null,
                    "pointsPossible": null,
                    "categoryIndex":0,
                },
                {
                    "pointsEarned": null,
                    "pointsPossible": null,
                    "categoryIndex":0,
                }
            ];

            // Assert percentage is correct
            expect(isNaN(app.percentage)).to.equal(true);
        });

        it("Should not be NaN when assignment values are not all null", function () {
            // Initialize assignments
            app.assignments = [
                {
                    "pointsEarned": 10,
                    "pointsPossible": 10,
                    "categoryIndex":0,
                },
                {
                    "pointsEarned": null,
                    "pointsPossible": null,
                    "categoryIndex":0,
                }
            ];

            // Assert percentage is correct
            expect(app.percentage).to.equal(100);
        });

        it("Should be NaN when category weights are all 0", function () {
            // Initialize categories and assignments
            app.categories = [
                {
                    "name": "Category 1",
                    "weight": 0,
                },
                {
                    "name": "Category 2",
                    "weight": 0,
                }
            ];
            app.assignments = [
                {
                    "pointsEarned": 10,
                    "pointsPossible": 10,
                    "categoryIndex":0,
                },
                {
                    "pointsEarned": 5,
                    "pointsPossible": 10,
                    "categoryIndex":1,
                }
            ];

            // Assert percentage is correct
            expect(isNaN(app.percentage)).to.equal(true);
        });

        it("Should not be NaN when category weights are not all 0", function () {
            // Initialize categories and assignments
            app.categories = [
                {
                    "name": "Category 1",
                    "weight": 0,
                },
                {
                    "name": "Category 2",
                    "weight": 1,
                }
            ];
            app.assignments = [
                {
                    "pointsEarned": 10,
                    "pointsPossible": 10,
                    "categoryIndex":0,
                },
                {
                    "pointsEarned": 5,
                    "pointsPossible": 10,
                    "categoryIndex":1,
                }
            ];

            // Assert percentage is correct
            expect(app.percentage).to.equal(50);
        });

        it("Should be NaN when category weights are all null", function () {
            // Initialize categories and assignments
            app.categories = [
                {
                    "name": "Category 1",
                    "weight": null,
                },
                {
                    "name": "Category 2",
                    "weight": null,
                }
            ];
            app.assignments = [
                {
                    "pointsEarned": 10,
                    "pointsPossible": 10,
                    "categoryIndex":0,
                },
                {
                    "pointsEarned": 5,
                    "pointsPossible": 10,
                    "categoryIndex":1,
                }
            ];

            // Assert percentage is correct
            expect(isNaN(app.percentage)).to.equal(true);
        });

        it("Should not be NaN when category weights are not all null", function () {
            // Initialize categories and assignments
            app.categories = [
                {
                    "name": "Category 1",
                    "weight": null,
                },
                {
                    "name": "Category 2",
                    "weight": 1,
                }
            ];
            app.assignments = [
                {
                    "pointsEarned": 10,
                    "pointsPossible": 10,
                    "categoryIndex":0,
                },
                {
                    "pointsEarned": 5,
                    "pointsPossible": 10,
                    "categoryIndex":1,
                }
            ];

            // Assert percentage is correct
            expect(app.percentage).to.equal(50);
        });
    });

    describe("Letter property", function () {
        beforeEach(function () {
            // Initialize Vue
            loadVue();
        });

        it("Should match the percentage", function () {
            // Assert letter is correct
            expect(app.letter).to.equal("A+");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 10.5;
            expect(app.letter).to.equal("A+");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 9.5;
            expect(app.letter).to.equal("A");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 9;
            expect(app.letter).to.equal("A-");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 8.75;
            expect(app.letter).to.equal("B+");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 8.5;
            expect(app.letter).to.equal("B");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 8.25;
            expect(app.letter).to.equal("B-");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 7.75;
            expect(app.letter).to.equal("C+");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 7.5;
            expect(app.letter).to.equal("C");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 7.25;
            expect(app.letter).to.equal("C-");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 6.75;
            expect(app.letter).to.equal("D+");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 6.5;
            expect(app.letter).to.equal("D");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 6.25;
            expect(app.letter).to.equal("D-");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 5.75;
            expect(app.letter).to.equal("F");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = 0;
            expect(app.letter).to.equal("F");

            // Adjust percentage and reassert letter
            app.assignments[0].pointsEarned = -1;
            expect(app.letter).to.equal("F");
        });

        it("Should be empty if the percentage is NaN", function () {
            // Initialize assignments
            app.assignments = [
                {
                    "pointsEarned": null,
                    "pointsPossible": null,
                    "categoryIndex":0,
                }
            ];

            // Assert letter is correct
            expect(app.letter).to.equal("");
        });
    });

    describe("Color property", function () {
        beforeEach(function () {
            // Initialize Vue
            loadVue();
        });

        it("Should match the letter", function () {
            // Assert color is correct
            expect(app.color).to.equal("letter-a");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 10.5;
            expect(app.color).to.equal("letter-a");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 9.5;
            expect(app.color).to.equal("letter-a");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 9;
            expect(app.color).to.equal("letter-a");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 8.75;
            expect(app.color).to.equal("letter-b");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 8.5;
            expect(app.color).to.equal("letter-b");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 8.25;
            expect(app.color).to.equal("letter-b");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 7.75;
            expect(app.color).to.equal("letter-c");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 7.5;
            expect(app.color).to.equal("letter-c");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 7.25;
            expect(app.color).to.equal("letter-c");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 6.75;
            expect(app.color).to.equal("letter-d");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 6.5;
            expect(app.color).to.equal("letter-d");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 6.25;
            expect(app.color).to.equal("letter-d");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 5.75;
            expect(app.color).to.equal("letter-f");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = 0;
            expect(app.color).to.equal("letter-f");

            // Adjust percentage and reassert color
            app.assignments[0].pointsEarned = -1;
            expect(app.color).to.equal("letter-f");
        });

        it("Should be N/A if the percentage is NaN", function () {
            // Initialize assignments
            app.assignments = [
                {
                    "pointsEarned": null,
                    "pointsPossible": null,
                    "categoryIndex":0,
                }
            ];

            // Assert color is correct
            expect(app.color).to.equal("letter-na");
        });
    });
});
