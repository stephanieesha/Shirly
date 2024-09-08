import axios from 'axios'

// Create new ticket
const API_URL = '/api/listName/'

const createList = async (listData,listNameId,  token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + listNameId + '/lists', listData, config)
    return response.data
  }

const getLists = async (listNameId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL+ listNameId+ '/lists', config)
    return response.data
  }
  

const deleteList = async (listNameId,listId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL+ listNameId+ '/lists/'+ listId, config)
  return response.data
}


const geAlltListNames = async (listNameId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL+ listNameId+ '/listsItems/', config)
  return response.data
}

const getList = async (listNameId,listItemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL+ listNameId+ '/lists/'+ listItemId, config)
  return response.data
}

const updateList = async (listData, listItemId, listId, token) => {
  axios({
    method: 'put',
    url: API_URL+ listItemId+ '/lists/'+listId,
    data: listData,
    headers: {
          Authorization: `Bearer ${token}`,
        },
  }).then((response) => {
    console.log(response);
  })

}

const listService = {
    createList,
    getLists,
    getList,
    deleteList,
    updateList,
    geAlltListNames
}

export default listService