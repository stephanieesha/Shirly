import axios from 'axios'

const API_URL = '/api/listName/'


const createListName = async (listNameData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, listNameData, config)
    return response.data
  }

const getListNames = async ( token, user_id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
    return response.data
  }

const getListName = async (listNameId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + listNameId, config)
  return response.data
}

const updateListName = async (listNameData, listItemId, token) => {
  axios({
    method: 'put',
    url: API_URL+ listItemId,
    data: listNameData,
    headers: {
          Authorization: `Bearer ${token}`,
        },
  }).then((response) => {
    console.log(response);
  })

}

const deleteListName = async (listNameId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL+ listNameId , config)

  return response.data
}

const listNameService = {
    createListName,
    getListNames,
    getListName,
    updateListName,
    deleteListName
}

export default listNameService