const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());


let employees = [
    {id : 1 , name : "Baibhab Karmakar" , position : "SDE - 1" , salary : 100000},
    {id : 2 , name : "Swarnotaj Kundu" , position : "SDE - 2" , salary : 150000},
    {id : 3 , name : "Sonu Singh Patar" , position : "SDE - 2" , salary : 150000},
];

// Get all employees : 
app.get("/employees" , (req , res) => {
    res.json(employees);
});

// Add an employee : 
app.post("/employees/new" , (req , res) => {
    const newEmployee = req.body;
    newEmployee.id = employees.length + 1;
    employees.push(newEmployee);
    res.status(201).json({message : "Employee added successfully" , employee : newEmployee});
});
// update an existing employee : 
app.put("/employees/:id" , (req , res) => {
    const id = parseInt(req.params.id);
    const updatedEmployee = req.body;
    let employee = employees.find(emp => emp.id === id);

    if(employee) {
        employee.name = updatedEmployee.name || employee.name;
        employee.position = updatedEmployee.position || employee.position;
        employee.salary = updatedEmployee.salary || employee.salary;
        res.status(200).json({message : "Employee updated successfully", employee : employee});
    }
    else {
        res.status(404).json({message : "Employee not found"});
    }
});

// delete an employee : 
app.delete("/employees/:id" , (req , res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex(emp => emp.id === id); 

    if(index !== -1){
        employees.splice(index , 1);
        res.status(200).json({message : "Employee deleted successfully"});
    }
    else {
        res.status(404).json({message : "Employee not found"});
    }
});


// Start the REST API server : 
app.listen(3000 , () => {
    console.log("Server is listening on the port : 3000");
});







