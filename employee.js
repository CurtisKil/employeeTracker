var inquirer = require("inquirer");
var connection = require("./db/connection.js");

function startingPoint() {
    showPrompt();


}

function showPrompt() {
    inquirer
        .prompt({
            name: "firstChoice",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "View All Departments", "Add Department", "Add Role"]
        }
        ).then(function (answer) {
            switch (
            answer.firstChoice
            ) {
                case "Add Department":
                    addDepartment();
                    break;

                case "View All Departments":
                    allDepartments();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "View All Employees By Department":
                    viewAll();
                    break;

                case "View All Employees By Manager":
                    // function
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    // function
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;

                case "Update Employee Manager":
                    // function
                    break;

                case "View All Roles":
                    allRoles();
                    break;

            }
        });
}

function addDepartment() {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'What department would you like to add?'
        })
        .then(function (answer) {
            connection.query('INSERT INTO department SET ?',
                {
                    name: answer.department
                }, function (err) {
                    if (err) throw err;
                    console.log("You added a department");
                    showPrompt();
                })
        })

}


function addRole() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What employee role would you like to add?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?'
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'What is the deparment id for this role?'
            },

        ])
        .then(function (answer) {
            connection.query('INSERT INTO role SET ?',
                {
                    // left side has to match the column name
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                }, 
                function (err) {
                    if (err) throw err;
                    console.log("You added a role");
                    showPrompt();
                });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "What is the employee's first name?"
            },
            {
                name: 'lastName',
                type: 'input',
                message: "What is the employee's last name?"
            },
            {
                name: 'roleId',
                type: 'input',
                message: "What is the employee's role id?"
            }

        ])
        .then(function (answer) {
            connection.query('INSERT INTO employee SET ?',
                {
                    // left side has to match the column name
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId

                }, function (err) {
                    if (err) throw err;
                    console.log("You added a role");
                    showPrompt();
                })
        })

}

function updateRole() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What employee role would you like to update?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?'
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'What is the deparment id for this role?'
            },

        ])
        .then(function (answer) {
            connection.query('UPDATE role SET ? WHERE ?',
                {
                    // left side has to match the column name
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                }, 
                function (err) {
                    if (err) throw err;
                    console.log("You updated a role");
                    showPrompt();
                });
        });
}


function viewAll() {
    connection.query('SELECT * FROM employee', function (err, results) {
        if (err) throw err;
        console.log(results);
    })
}

function allDepartments() {
    connection.query('SELECT * FROM department', function (err, results) {
        if (err) throw err;
        console.log(results);
    })
}

function allRoles() {
    connection.query('SELECT * FROM role', function (err, results) {
        if (err) throw err;
        console.log(results);
    })
}


startingPoint();