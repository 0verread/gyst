import axios from 'axios';

export const getList = () => {
  return axios
      .get('/api/todos', {
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
      })
      .then(res => {
          res.data.status = 'success'
          return res.data
      }).catch(err => {
          return {
              status:'failed',
              message:err.message
          }
      })
}

export const addToList = task => {
return axios
  .post(
    '/api/todos',
    {
      title: task.title,
      isDone: task.isDone
    },
    {
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    }
  )
  .then(function(response) {
      return response.data;
  }).catch(err => {
      return {
          error:'Error to add',
          status:'failed',
          message:err.message
      }
  })
}

export const deleteItem = (task) => {
return axios
  .delete(`/api/todos/${task.id}`, {
    headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  })
  .then(function(response) {
      console.log(response)
      return response;
  })
  .catch(function(error) {
    console.log(error)
    return error;
  })
}

export const updateItem = taskUpdateRequest => {
return axios
  .put(
    `/api/todos/${taskUpdateRequest.id}`,
    {
      title: taskUpdateRequest.title,
      isDone: taskUpdateRequest.isDone
    },
    {
      headers: { 
          'Content-Type': 'application/json'
      }
    }
  )
  .then(function(response) {
      return response.data;
  })
}