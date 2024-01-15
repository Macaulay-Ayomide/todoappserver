const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todo: String,
    done: Boolean,
    dailytodo: { type: mongoose.Schema.Types.ObjectId, ref: 'DailyTodo' }
})

todoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Todo', todoSchema)
