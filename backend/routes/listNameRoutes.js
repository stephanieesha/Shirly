const express = require('express')
const router = express.Router()
const {getListNames, getListName, createListName, deleteListName, updateListName, geAlltListNames} = require('../controller/listController')

const {protect} = require('../middleware/authMiddleware')
const listRouters = require('./listRoutes')
router.use('/:listNameId/lists', listRouters)

router.route('/').get(protect, getListNames).post(protect, createListName)
router
    .route('/:id')
    .get(protect, getListName)
    .delete(protect, deleteListName)
    .put(protect, updateListName)
router.route('/:id/listsItems').get(protect, geAlltListNames)




module.exports = router