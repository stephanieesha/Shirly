const asyncHandler = require('express-async-handler')

const ListName = require('../models/listNameModel')

const getListName = asyncHandler(async(req, res) => {
    
    const listNames = await ListName.find({user:req.user.id})
    //CHECK THIS
    
    if(!listNames){
        res.status(401)
        throw new Error('User not found')
    }
    res.status(200).json(listNames)
})

//get request
const getSingleListNameItem = asyncHandler(async(req, res) => {
    
    const listName = await ListName.findById(req.params.id)
    //CHECK THIS
    
    if(!listName){
        res.status(401)
        throw new Error('User not found')
    }
    res.status(200).json(listName)
})

//post request
const createListName = asyncHandler(async(req, res) => {
    const { ItemName} = req.body

    if(!ItemName){
        res.status(400)
        throw new Error('Please name your list my Love')
    }
    await ListName.create({
        ItemName,
        user: req.user.id,
     
    })
    const listName = await ListName.create({
        ItemName,
        user: req.user.id,
     
    })

    res.status(201).json(listName)

})

//delete request
const deleteSingleListNameItem = asyncHandler(async(req, res) => {
    
    const listName = await ListName.findById(req.params.id)
    //CHECK THIS
    
    if(!listName){
        res.status(401)
        throw new Error('User not found')
    }
    if (listName.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
      }

    await listName.findByIdAndDelete(req.params.id)
    res.status(200).json({success:true})
})

//put request
const updateSingleListNameItem = asyncHandler(async(req, res) => {
    
    const listName = await ListName.findById(req.params.id)
    //CHECK THIS
    
    if(!listName){
        res.status(401)
        throw new Error('User not found')
    }

    if(listName.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
      }
    
    const updatedItem = await ListName.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true})
    res.status(200).json(updatedItem)
})

module.exports = {

    getListName,
    getSingleListNameItem,
    createListName,
    deleteSingleListNameItem,
    updateSingleListNameItem
}