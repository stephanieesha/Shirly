import axios from 'axios'

const API_URL = 'api/users/'

const register = async (userData ) =>{
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData ) =>{
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const createShoppingList = async (shoppingListId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    //console.log(listNameId)
    const response = await axios.get(API_URL + shoppingListId+ '/shoppingList', config)
    //console.log(response.data)
    localStorage.setItem('shoppingList', JSON.stringify(response.data))
    //localStorage.setItem('doneItems')
    
      return response.data
    }

  const getUserLists = async (user_id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(API_URL+ user_id+ '/lists', config)
    return response.data
  }

  // const updateUserList = async (itemDisabled, listItemId,user_id, token) => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  
  //   const response = await axios.put(API_URL+ user_id+ '/lists/'+listItemId,itemDisabled, config)
  //   console.log(response)
  //     return response.data
  //   }

    const updateUserList = async (updateUserListData, user_id,listItemId, token) => {
      // console.log(updateUserListData)
      // console.log(listItemId)
      axios({
        method: 'put',
        url: API_URL+ user_id+ '/lists/'+listItemId,
        data: updateUserListData,
        headers: {
              Authorization: `Bearer ${token}`,
            },
      }).then((response) => {
        console.log(response);
      })}

//     http://localhost:4000/api/users/
// 66a47b7ebc27f438429cdb22/lists/66c7bea18b456ac5a0875a74

  
  const updateLastBought = async (user_id, token) => {

    axios({
      method: 'put',
      url: API_URL+ user_id+ '/shoppingList/',
      data: {
        
      },
      headers: {
            Authorization: `Bearer ${token}`,
          },
    }).then((response) => {
      //console.log(response);
    });
  }

    const updateAll = async (ReviewedList,user_id, token) => {
     // console.log(ReviewedList)
      axios({
        method: 'put',
        url: API_URL+ user_id+ '/lists',
        data: ReviewedList,
        headers: {
              Authorization: `Bearer ${token}`,
            },
      }).then((res) => {
       // console.log(res);
      })
  }

  const getShoppingHistories = async (user_id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(API_URL+ user_id+ '/shoppingHistories', config)
    return response.data

  }

  
const logout = () => localStorage.removeItem('user')
const authService = {
    register,
    logout,
    login,
    createShoppingList,
    getUserLists,
    updateLastBought,
    updateUserList,
    updateAll,
    getShoppingHistories
}

export default authService