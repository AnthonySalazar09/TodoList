const axios = require('axios');
const API_URL = 'http://127.0.0.1:8080'

export const signup = (request, setState) => {
  axios.post(`${API_URL}/auth/signup/`, request)
    .then((resp) => {
      localStorage.setItem('user_data', JSON.stringify(resp.data))
      setState(resp.data);
    })
    .catch((error) => {
    })
}

export const getFolders = (user_id, setState) => {
  axios.get(`${API_URL}/todo/folder/user/${user_id}`)
    .then((resp) => {
      setState(resp.data);
    })
    .catch((error) => {
    })
}

export const getFullFolder = (folder_id, setStateFolder, setStateTasks) => {
  axios.get(`${API_URL}/todo/folder/${folder_id}`)
    .then((resp) => {
      setStateFolder(resp.data);
      setStateTasks(resp.data.tasks);
    })
    .catch((error) => {
    })
}

export const createTask = (folder_id, request, setState) => {
  axios.post(`${API_URL}/todo/folder/${folder_id}`, request)
    .then((resp) => {
      setState(resp.data);
    })
    .catch((error) => {
    })
}

export const updateTask = (folder_id, task_id, request, setState) => {
  axios.post(`${API_URL}/todo/folder/${folder_id}/task/${task_id}`, request)
    .then((resp) => {
      console.log(resp.data);
      setState(resp.data);
    })
    .catch((error) => {
    })
}

export const deleteTask = (folder_id, task_id, setState) => {
  axios.get(`${API_URL}/todo/folder/${folder_id}/task/${task_id}`)
    .then((resp) => {
      setState(resp.data);
    })
    .catch((error) => {
    })
}

export const createFolder = (user_id, request, setState) => {
  axios.post(`${API_URL}/todo/folder/user/${user_id}`, request)
    .then((resp) => {
      setState(resp.data);
    })
    .catch((error) => {
    })
}


export const deleteFolder = (user_id, request, setState) => {
  axios.post(`${API_URL}/todo/folder/user/${user_id}/delete/`, request)
    .then((resp) => {
      setState(resp.data);
    })
    .catch((error) => {
    })
}