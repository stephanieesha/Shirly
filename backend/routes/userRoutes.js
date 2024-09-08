const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controller/userController')
const {getUserLists, getUserShoppingList, updateLastBought,updateAll, getShoppingHistories } = require('../controller/listController')

const {protect} = require('../middleware/authMiddleware')
const userListRoutes = require('./userListRoutes')
router.use('/:id/lists', userListRoutes)

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getMe)
router.route('/:id/lists').get(protect, getUserLists).put(protect, updateAll)
router.route('/:id/shoppingHistories').get(protect, getShoppingHistories)
router.route('/:id/shoppingList').get(protect, getUserShoppingList).put(protect, updateLastBought)


module.exports = router