const mongoose = require('mongoose')

const lastBoughtSchema = mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      boughtAt:{ type:'array' }
      

})

module.exports = mongoose.model('LastBought', lastBoughtSchema)