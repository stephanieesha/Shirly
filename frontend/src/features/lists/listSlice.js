import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import listService from './listService'

const initialState = {
    list : {},
    lists : [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const createList = createAsyncThunk(
    'list/create',
    async ({listData, listNameId}, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.createList(listData,listNameId, token)
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

export const getLists = createAsyncThunk(
  'list/getAll',
  async (listNameId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.getLists( listNameId, token)
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
export const getList = createAsyncThunk(
  'list/get',
  async ({listNameId,listItemId}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.getList(listNameId,listItemId, token)
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

//delete single item
export const deleteList = createAsyncThunk(
  'list/delete',
  async ({listNameId,listId}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.deleteList(listNameId,listId, token)
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

export const geAlltListNames = createAsyncThunk(
  'list/geAlltListNames',
  async ({listNameId}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.geAlltListNames(listNameId, token)
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

export const updateList = createAsyncThunk(
  'list/updateListItem',
  async ({listData, listNameId,listId} , thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log(listData)
      return await listService.updateList(listData,listNameId, listId, token)
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

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
      reset: (state) => {
          state.lists = []
          state.isLoading = false
          state.isError = false
          state.isSuccess = false
          state.message = ''
      }
  },
    extraReducers: (builder) => {
        builder
          .addCase(createList.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createList.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.lists.push(action.payload)
          })
          .addCase(getList.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.list = action.payload
          })
          .addCase(createList.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload           
          })
          .addCase(getLists.fulfilled, (state, action) => {
            state.lists = action.payload
          })
      },
})

export const { reset} = listSlice.actions
export default listSlice.reducer