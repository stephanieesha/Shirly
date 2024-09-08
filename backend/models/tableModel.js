const mongoose = require('mongoose')
const { type } = require('os-browserify')

const tableSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    listName: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ListName',
      },
    name:{
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
    },
    brand: {
        type: String,
        required: false
    },
    unitPrice: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    totalSpent: {
        type: Number,
        required: false
    },
    frequency: {
        type: String,
        required: false,
        enum: 
        [
            'Everyday', 
            'Every 2 days', 
            'Every 3 days', 
            'Weekly', 
            'Every 2 weeks', 
            'Monthly', 
            'Every 2 months', 
            'Every 3 months', 
            'Every 6 months', 
            'Yearly',
            'Nill'
        ]
    },
    comment: {
        type: String,
        required: false
    },
    createdAt:{},
    updatedAt:{},
    boughtAt:{ type:'array' },
    shoppingInProgress: {
        type: Boolean,
        default: false
    },
    itemDisabled: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
},
{multi: true}

)

module.exports = mongoose.model('List', tableSchema)