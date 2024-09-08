import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import listNameService from './listNameService'

const initialState = {
    listName : {},
    listNames : [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createListName = createAsyncThunk(
    'listName/create',
    async (listNameData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await listNameService.createListName(listNameData, token)
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

//Get user tickets
export const getListNames = createAsyncThunk(
  'listName/getAll',
  async (_, thunkAPI) => {
    try {
      const user_id = thunkAPI.getState().auth.user._id
      const token = thunkAPI.getState().auth.user.token
  
      return await listNameService.getListNames( token, user_id)
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

//get single item
export const getListName = createAsyncThunk(
  'listName/get',
  async (listNameId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listNameService.getListName(listNameId, token)
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

export const updateListName = createAsyncThunk(
  'listName/update',
  async ({listNameData, listNameId}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listNameService.updateListName(listNameData,listNameId, token)
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

export const deleteListName = createAsyncThunk(
  'listName/delete',
  async ( listNameId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listNameService.deleteListName(listNameId, token)
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

export const listNameSlice = createSlice({
    name: 'listName',
    initialState,
    reducers: {
      reset: (state) => {
          state.listNames = []
          state.isLoading = false
          state.isError = false
          state.isSuccess = false
          state.message = ''
      }
  },
    extraReducers: (builder) => {
        builder
          .addCase(createListName.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createListName.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
          })
          .addCase(getListName.fulfilled, (state, action) => {
            state.listName = action.payload
          })
          .addCase(createListName.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            
          })
          .addCase(getListNames.pending, (state) => {
            state.listName = null
          })
          .addCase(getListNames.fulfilled, (state, action) => {
            state.listNames = action.payload
          })
      },
})

export const { reset} = listNameSlice.actions
export default listNameSlice.reducer