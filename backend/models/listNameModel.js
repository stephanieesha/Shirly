const mongoose = require('mongoose')

const listNameSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ItemName:{
        type: String,
        required: [true, 'Please add a name listName'],
        unique: true,
    },
    AmountSpent:{ type:'array' },
},
{
    timestamps: true
}
)

module.exports = mongoose.model('ListName', listNameSchema)