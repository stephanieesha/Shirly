const express = require('express')
const router = express.Router({ mergeParams: true })
const {updateUserLists, getUserList} = require('../controller/listController')

const {protect} = require('../middleware/authMiddleware')

router.route('/:id').get(protect, getUserList).put(protect, updateUserLists)





module.exports = router