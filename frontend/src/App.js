import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
//import HomePage from "./pages/ListNamePage";
import ListNamePage from "./pages/ListNamePage"
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import NewList from './pages/NewList';
import PrivateRoute from './components/PrivateRoute';
import ShoppingListDetails from './components/ShoppingListDetails';
import ListItemPage from './pages/ListItemPage';
import ShoppingHistory from './pages/ShoppingHistory';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            {/* <Route path='/' element = {<HomePage/>}/>
            <Route path='/listNameId' element = {<PrivateRoute/>}>
              <Route path='/listnames/:id' element= {<NewList/>}/>
            </Route>
            <Route path='/login' element = {<LoginPage/>}/>
            <Route path='/register' element = {<RegisterPage/>}/> */}

            {/* <Route path='/' element = {<HomePage/>}/>
            <Route path='/listName/:listNameId/' element = {<NewList/>}/>
            <Route path='/login' element = {<LoginPage/>}/>
            <Route path='/NewList' element = {<NewList/>}/>
            <Route path='/register' element = {<RegisterPage/>}/>
            <Route path='/shoppingHistory' element = {<ShoppingHistory/>}/>
            <Route path='/shoppingListDetails' element = {<ShoppingListDetails/>}/> */}
            {/* <Route
              path='/new-ticket'
              element={
                <PrivateRoute>
                  <NewTicket />
                </PrivateRoute>
              }
            /> */}
            <Route path='/' element = {<HomePage/>}/>
            <Route path='/listName' element = {<ListNamePage/>}/>
            <Route path='/listName/:listNameId/' element = {<NewList/>}/>
            <Route path='/login' element = {<LoginPage/>}/>
            <Route path='/NewList' element = {<NewList/>}/>
            <Route path='/register' element = {<RegisterPage/>}/>
            <Route path='/shoppingHistory' element = {<ShoppingHistory/>}/>
            <Route path='/shoppingListDetails' element = {<ShoppingListDetails/>}/>
            <Route path='/:listNameId/lists/:listItemId' element = {<ListItemPage/>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
