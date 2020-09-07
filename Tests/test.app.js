describe("App", function () {
    describe("created()", function () {
        before(function () {
            // Initialize Vue
            loadVue()
        });

        it('importingJSON should be false', function () {
            expect(app.importingJson).to.equal(false);
        });
        
        it('jsonInput should be empty', function () {
            expect(app.jsonInput).to.equal("");
        });
        
        it('There should be 1 category', function () {
            expect(app.categories.length).to.equal(1);
            expect(app.categories[0].name).to.equal("Category 1");
            expect(app.categories[0].weight).to.equal(100);
        });
        
        it('There should be 1 assignment', function () {
            expect(app.assignments.length).to.equal(1);
            expect(app.assignments[0].pointsEarned).to.equal(10);
            expect(app.assignments[0].pointsPossible).to.equal(10);
            expect(app.assignments[0].categoryIndex).to.equal(0);
        });
        
        it('The localStorage darkTheme item should match the darkTheme property', function () {
            expect(JSON.parse(localStorage.getItem("darkTheme"))).to.equal(app.darkTheme);
        });
    });
});
