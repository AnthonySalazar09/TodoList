import React, { useState, useEffect } from "react";
import AuthForm from './components/AuthForm'
import CreateForm from './components/CreateForm'
import {
  getFolders,
  createFolder,
  getFullFolder,
  createTask,
  deleteFolder,
  updateTask,
  deleteTask,
} from './services/task_service'
const App = (props) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState();
  const [user_data, setUser] = useState(null);
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {

      if (id === task.id) {

        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const tasksNoun = tasks.length !== 1 ? 'tasks' : 'task';
  const headingText = `${tasks.length} ${tasksNoun} left`;

  const manageInitialUserData = (user_data) => {
    setUser(user_data);
    getFolders(user_data.id, setFolders);
  }

  const manageCreateFolder = (title) => {
    const request = { title }
    createFolder(user_data.id, request, setFolders);
  }
  const manageCreateTask = (title) => {
    const request = { title };
    createTask(folder.id, request, setTasks);
  }

  const mamageSelectFolder = (f) => {
    getFullFolder(f.id, setFolder, setTasks)
  }
  const mamageSelectTask = (t) => {
    setTask(t)
  }

  const manageUpdateTask = (title) => {
    const request = { title };
    updateTask(folder.id, task.id, request, setTasks)
    setTask(null)
  }

  const mamageRemoveFolder = (f) => {
    const request = { "folder": f.id };
    deleteFolder(user_data.id, request, setFolders)
  }

  const mamageGoBack = () => {
    setFolder(null)
  }

  const mamageRemoveTask = (t) => {
    deleteTask(folder.id, t.id, setTasks)
  }
  const mamageLogout = () => {
    localStorage.clear()
    setUser(null)
  }

  const marckAsCompleted = (t) => {
    const is_completed = !t.is_completed
    console.log(t.is_completed);
    console.log(t.is_completed);
    console.log(t.is_completed);
    const request = { is_completed };
    updateTask(folder.id, t.id, request, setTasks)
  }

  useEffect(() => {
    const local_storage_user = localStorage.getItem('user_data')
    if (local_storage_user) {
      manageInitialUserData(JSON.parse(local_storage_user))
    }
  }, []);

  return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1> :
      {user_data ?
        <h2>Hola {user_data.username},</h2> :
        <AuthForm addUser={manageInitialUserData} />
      }
      {user_data && !task &&
        (folder ?
          <h2 tabIndex="-1">
            <button className="underline" onClick={mamageGoBack}>{folder.title}</button> {">"} {headingText}
          </h2> :
          <h2 tabIndex="-1">
            Folders:
          </h2>)
      }
      {user_data && !task && (folder ?
        <ul role="list" className="todo-list stack-large stack-exception">
          {tasks.map((t, idx) => <li key={`${t.id}-${idx}`}>
            <input className="cb" onChange={() => marckAsCompleted(t)} type="checkbox" checked={t.is_completed}/>
            {t.title}  <button className="btn btn__primary" onClick={() => mamageSelectTask(t)}>Edit</button> <button className="btn btn__danger" onClick={() => mamageRemoveTask(t)}>Remove</button> </li>)}
        </ul> :
        <ul role="list" className="todo-list stack-large stack-exception">
          {folders.map((f, idx) => <li key={`${f.id}-${idx}`}><b>{idx + 1} -</b>  {f.title}  <button className="btn btn__primary" onClick={() => mamageSelectFolder(f)}>View Items</button> <button className="btn btn__danger" onClick={() => mamageRemoveFolder(f)}>Remove</button> </li>)}
        </ul>
      )}

      {user_data && !task && (folder ?
        <CreateForm buttonText={'Add Task'} createData={manageCreateTask} title={null} /> :
        <CreateForm buttonText={'Add Folder'} createData={manageCreateFolder} title={null} />
      )}
      {user_data && task && <CreateForm buttonText={'Update Task'} createData={manageUpdateTask} title={task.title} />}
      {user_data && <button className="mx_auto btn btn__danger btn-w_full" onClick={() => mamageLogout()}>Logout</button>}
    </div>
  );
}

export default App;
