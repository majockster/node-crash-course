const mongoose = require('mongoose')
const Schema = mongoose.Schema//Will define the structure of the documents that will be stored in the database/collection
                              //Its the thing that models wraps around
//Defining schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, 
{ timestamps: true })//Generate timestamp properties

//Defining model
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog