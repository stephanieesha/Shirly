import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './authService'


const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    allList : {},
    allLists : [],
    shoppingHistory: {},
    shoppingHistories: []
}

const a = JSON.parse(localStorage.getItem('user._id'))

export const register = createAsyncThunk('auth/register', 
    async(user, thunkAPI) => {
        try{
            return await authService.register(user)
        }catch(error){
            const message =
                (   error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
})
export const logout = createAsyncThunk('auth/logout', 
    async() => {
        await authService.logout()
})

export const login = createAsyncThunk('auth/login', 
    async(user, thunkAPI) => {
        try{

            return await authService.login(user)
        }catch(error){
            const message =
                (   error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
})

export const createShoppingList = createAsyncThunk(
    'shoppinglist/create',
    async ( shoppingListId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.createShoppingList( shoppingListId, token)
      } catch (error) {
            const message =
                (   error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
      }
    }
  )

//Get all user lists
export const getUserLists = createAsyncThunk(
    'list/getUserLists',
    async (_, thunkAPI) => {
      try {
        const user_id = thunkAPI.getState().auth.user._id
        const token = thunkAPI.getState().auth.user.token
        return await authService.getUserLists( user_id, token)
      } catch (error) {
            const message =
                (   error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
      }
    }
  )


export const updateLastBought = createAsyncThunk(
    'list/updateRecords',
    async (_, thunkAPI) => {
      try {
        const user_id = thunkAPI.getState().auth.user._id
        const token = thunkAPI.getState().auth.user.token
        return await authService.updateLastBought( user_id, token)
      } catch (error) {
            const message =
                (   error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const updateAll = createAsyncThunk(
    'list/updateAllRecords',
    async (ReviewedList, thunkAPI) => {
      try {
        const user_id = thunkAPI.getState().auth.user._id
        const token = thunkAPI.getState().auth.user.token
        return await authService.updateAll( ReviewedList,user_id, token)
      } catch (error) {
            const message =
                (   error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const updateUserList = createAsyncThunk(
    'userList/update',
    async ({ updateUserListData ,listItemId}, thunkAPI) => {
      try {
        const user_id = thunkAPI.getState().auth.user._id
        const token = thunkAPI.getState().auth.user.token
        return await authService.updateUserList(updateUserListData,user_id,listItemId, token)
      } catch (error) {
            const message =
                (   error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const getShoppingHistories = createAsyncThunk(
    'shoppingHistories/get',
    async (_, thunkAPI) => {
        try {
          const user_id = thunkAPI.getState().auth.user._id
          const token = thunkAPI.getState().auth.user.token
          return await authService.getShoppingHistories( user_id, token)
        } catch (error) {
              const message =
                  (   error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString()
              return thunkAPI.rejectWithValue(message)
        }
      }
  )

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getUserLists.fulfilled, (state, action) => {
            state.allLists = action.payload
        })
        .addCase(updateAll.fulfilled,(state, action) => {
            state.shoppingHistories.push(action.meta.arg)
        } )
        .addCase(getShoppingHistories.fulfilled, (state, action) => {
            state.shoppingHistories.push(action.payload)
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer