# Grade-Calculator
A program to calculate your final grade given a list of assignments that are or will be in the gradebook.


## Letter grades
The following scale is used to determine letter grades. Grades above 100% or below 0% will be marked as A+ and F respectively. Grades are rounded before a letter grade is assigned.
| Range    | Letter Grade | Color  |
| -------- | ------------ | ------ |
| 97 - 100 | A+           | Green  |
| 93 - 97  | A            | Green  |
| 90 - 93  | A-           | Green  |
| 87 - 90  | B+           | Blue   |
| 83 - 87  | B            | Blue   |
| 80 - 83  | B-           | Blue   |
| 77 - 80  | C+           | Yellow |
| 73 - 77  | C            | Yellow |
| 70 - 73  | C-           | Yellow |
| 67 - 70  | D+           | Orange |
| 63 - 67  | D            | Orange |
| 60 - 63  | D-           | Orange |
| 0 - 60   | F            | Red    |


## Importing grades
You can import assignments from a JSON string by clicking the import button.

The JSON string must be an array of dictionaries. Each dictionary must have properties called `pointsEarned` and `pointsPossible`. The value of these properties must be either a `Number`, a `String`, or `null`. Comments are not allowed in the JSON string. Example:
```JSON
[
    {
        "pointsEarned":9,
        "pointsPossible":10
    },
    {
        "pointsEarned":null,
        "pointsPossible":"5"
    }
]
```
