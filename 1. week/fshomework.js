const fs = require('fs')


// writeFile func created.
const writeFile=((name,salary)=>{
    // obj to json and write file
fs.writeFile('employees.json',JSON.stringify([{"name":name,"Salary":salary}]),'utf8',(err)=>{
    if(err) throw err
    
})
})

// readFile func created
const readFile=( (path)=>{
    fs.readFile(path,(err,data)=>{
        if(err) throw err
        // json to obj
        data=JSON.parse(data)
        console.log(data)
        
        
    })
     
})

// Add new row func created
const addRowFile=((path,name,salary)=>{
    fs.readFile(path,(err,data)=>{
        // json to obj  and push new obj
         data=JSON.parse(data.toString())
         data.push({"name":name,"Salary":salary})
         //updated obj to json and write file
        fs.writeFile('employees.json',JSON.stringify(data),'utf8',(err)=>{
            if(err) throw err
            
        })
            
        
    })
})

// update json data
const updateFile=((path,number,name,salary)=>{

    fs.readFile(path,(err,data)=>{
        data=JSON.parse(data)
        data[number].name=name
        data[number].Salary=salary
        fs.writeFile('employees.json',JSON.stringify(data),'utf8',(err)=>{
            if(err) throw err
        
    })
    })

})
// delete file func created
const deleteFile=((path)=>{
     fs.unlink(path,(err)=>{
        if(err) throw err
        console.log('File deleted')
    })
})

// Manage File Operations 
// You can manage file operations with the help of number
const fileOps=(number)=>{
    if(number===1){writeFile("Employee 1 Name",2000)}
    else if(number===2){readFile('./employees.json')}
    else if (number===3){addRowFile('./employees.json',"Employee 3 Name",4000)}
    else if (number===4){updateFile('./employees.json',0,"Test",4000)}
    else if(number===5){deleteFile('./employees.json')}
    }

//Example
fileOps(1)
