const mongoose = require('mongoose')
const Boook = require ('./book')
const book = require('./book')

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next){
    book.find({ author: this.id}, (err,books)=>{
        if(err){
            next(err)
        }else if (book.length >0){
            next(new Error('this author has books still'))

        }else{
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)