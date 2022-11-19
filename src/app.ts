import express from 'express'
import morgan from 'morgan'
import { v4 as uuidv4 } from 'uuid';
import { Grade, People, Task } from './types/generalType';

const app=express();

app.use(morgan('dev'));
app.use(express.json());



// Q1.1
let people:People[]=[];

app.get('/people',(req,res)=>{
    return res.json(people)
});

app.post('/people',(req,res)=>{
    const newPeople=req.body as People;
    newPeople.id=uuidv4();
    people.push(newPeople);
    return res.json({
        message:'Name added!'
    })
});

app.put('/people/:id',(req,res)=>{
const {id}=req.params;
const updatedName=req.body as People;
updatedName.id=id;

const updatedPeopleList=people.filter(name=>{
    return name.id!==id;
});
updatedPeopleList.push(updatedName);
people=updatedPeopleList;
return res.json({
    message:'Name updated!'
})});

app.delete('/people/:id',(req,res)=>{
const {id}=req.params;
const newPeopleList= people.filter(name=>{
    return name.id!==id;
})
people=newPeopleList;
return res.json({
    message:"Name deleted!"
})
});



// Q1.2
let gradeList:Grade[]=[];

app.get('/grade' , (req,res)=>{
    return res.json(gradeList);
})

app.post('/grade', (req,res)=>{
    const newGrade=req.body as Grade;
    newGrade.id=uuidv4();
    gradeList.push(newGrade);
    return res.json({
        message:"Grade Added!"
    });
})

app.put('/grade/:id',(req,res)=>{
const {id}=req.params;
const updatedGrade=req.body as Grade;
updatedGrade.id=id;

const updatedGradeList=gradeList.filter(grade=>{
    return grade.id!==id;
})

updatedGradeList.push(updatedGrade);
gradeList=updatedGradeList;
return res.json({
    message:'Grade Updated'
})
})

app.delete('/grade/:id',(req,res)=>{
    const {id}=req.params;
    const newGradeList=gradeList.filter(grade=>{
        return grade.id!==id;
    })
    gradeList=newGradeList;
    return res.json({
        message:"Grade deleted"
    })
})



// Q2
let taskList:Task[]=[];

app.get('/task' , (req,res)=>{
    return res.json(taskList);
})

app.post('/task', (req,res)=>{
    const newTask=req.body as Task;
    newTask.id=uuidv4();
    newTask.status="not done"
    taskList.push(newTask);
    return res.json({
        message:"Task Added!"
    });
})

app.put('/task/:id',(req,res)=>{
const {id}=req.params;
const updatedTask=req.body as Task;
updatedTask.id=id;

const updatedTaskList=taskList.filter(task=>{
    return task.id!==id;
})

updatedTaskList.push(updatedTask);
taskList=updatedTaskList;
return res.json({
    message:'Task Updated'
})
})

app.delete('/task/:id',(req,res)=>{
    const {id}=req.params;
    const newTaskList=taskList.filter(task=>{
        return task.id!==id;
    })
    taskList=newTaskList;
    return res.json({
        message:"Task deleted"
    })
})

// Change status
app.put('/task/:id/:status',(req,res)=>{
     const id=req.params.id;
     const status=req.params.status;

     const updatedTask=taskList.filter(task=>{
        return task.id===id;
     })
     updatedTask[0].status=status;

     const updatedTaskList=taskList.filter(task=>{
        return task.id!==id;
    })
    updatedTaskList.push(updatedTask[0]);
    taskList=updatedTaskList;

    return res.json({
        message:"Status changed"
    })
})

// Search 
app.get('/task/search/:title',(req,res)=>{
    const {title}=req.params;

    const searchedTask=taskList.filter(task=>{
        return task.title===title;
    })

    if(searchedTask.length===0){
        return res.json({
            message:"No result!"
        })
    }else{
        return res.json(searchedTask[0])
    }
})



app.listen(3000, () => {
    console.log('Server is running in port ' + 3000);
  });