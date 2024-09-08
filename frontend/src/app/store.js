import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import listReducer from '../features/lists/listSlice'
import listNameReducer from '../features/listName/listNameSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    listNames: listNameReducer,
    allLists: authReducer,
    shoppingHistories: authReducer,
  },
});
