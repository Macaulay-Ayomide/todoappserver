const mongoose = require('mongoose')

const dailySchema = new mongoose.Schema({
    tododate: { type: Date, required: true, unique: true },
    todo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

dailySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('DailyTodo', dailySchema)
