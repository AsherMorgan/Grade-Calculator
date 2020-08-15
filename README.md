# Grade-Calculator
A program to calculate your final grade given a list of assignments that are or will be in the gradebook.


## Letter grades
The following scale is used to determine letter grades. Grades above 100% or below 0% will be marked as A+ and F respectively. Grades are rounded before a letter grade is assigned.
| Letter Grade | Range    |
| ------------ | -------- |
| A+           | 97 - 100 |
| A            | 93 - 97  |
| A-           | 90 - 93  |
| B+           | 87 - 90  |
| B            | 83 - 87  |
| B-           | 80 - 83  |
| C+           | 77 - 80  |
| C            | 73 - 77  |
| C-           | 70 - 73  |
| D+           | 67 - 70  |
| D            | 63 - 67  |
| D-           | 60 - 63  |
| F            | 0 - 60   |


## Importing grades
You can import assignments from a JSON string by clicking the import button.

The JSON string must be an array of dictionaries. Each dictionary must have properties called `pointsEarned` and `pointsPossible`. The value of these properties must be either a `number`, a `string`, or `null`. Comments are not allowed in the JSON string. Example:
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
