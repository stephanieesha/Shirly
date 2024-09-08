const express = require('express')
const router = express.Router({ mergeParams: true })
const {getLists, getList, createList, deleteList, updateList, deleteListNameLists, createLastBought} = require('../controller/listController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getLists).post(protect, createList).delete(protect, deleteListNameLists)
router
    .route('/:id')
    .get(protect, getList)
    .delete(protect, deleteList)
    .put(protect, updateList)




module.exports = router