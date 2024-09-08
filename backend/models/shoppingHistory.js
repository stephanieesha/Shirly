const mongoose = require('mongoose')
const { type } = require('os-browserify')

const ShoppingHistorySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    
    shoppingHistories:{ type:'array' },
    createdAt:{},
    updatedAt:{},
    },
    {
        timestamps: true
    },

)

module.exports = mongoose.model('ShoppingHistory', ShoppingHistorySchema)