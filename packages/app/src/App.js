import { useState } from 'react';

import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

import {getList, addToList, deleteItem, updateItem} from './lib/todoListFunc.js';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  useEffect(() => {
    getAll()
  }, [])

  const getAll = () => {
    getList().then(data => {
      setToDo(data);
    })
  }

  const addTask = () => {
    if(newTask){
      let newEntry = {title: newTask, isDone: false}
      addToList(newEntry).then(() => {
        getAll()
      }).catch(err=> {
        console.log(err)
      })
      setNewTask('');
    }
  }

  const deleteTask = (task) => {
    deleteItem(task).then((res) => {
      if(res.data.status === 'failed'){
        console.log("Failed")
      }
      getAll()
    }).catch(err => {
      console.log(err);
    })
  }

  const markDone = (task) => {
    let updatedTaskDetails = {
      id: task.id,
      title: task.title,
      isDone: !task.isDone
    }
    updateItem(updatedTaskDetails).then((res) => {
      getAll()
    }).catch(err => {
      console.log(err);
    })
  }

  const cancelUpdate = () => {
    setUpdateData('');
  }

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      isDone: updateData.isDone ? true : false
    }
    setUpdateData(newEntry);
  }

  const updateTask = () => {
    updateItem(updateData).then(() => {
      getAll()
    }).catch(err => {
      console.log(err);
    })
    setUpdateData('');
  }

  return (
    <div className='container app'>
      <br /><br />
      <h2>To Do List</h2>
      <br /> <br />
      {updateData && updateData ? (
        <UpdateForm 
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
        />
      
      ) : (
        <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        />

      )}

    <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />  
    </div>
  );
}

export default App;
