const Todo = require('../models/todo')
const DailyTodo = require('../models/dailytodo')

const getAllTodo = async (request, response) => {
    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
    const todolist = await DailyTodo.find({ tododate: formattedDate }).populate('todo', { todo: 1 })
    if (todolist.length === 0) { response.send('false') }
    response.json(todolist)
}

const createTodo = async (request, response) => {
    const body = request.body
    const todo = new Todo({
        todo: body.todo,
        done: false,
        dailytodo: body.dailytodo_id
    })
    const savedtodo = await todo.save()
    const dailytodo = await DailyTodo.findById(body.dailytodo_id)
    dailytodo.todo = dailytodo.todo.concat(savedtodo._id)
    await dailytodo.save()
    response.status(201).json(savedtodo)
}

const updateTodo = async (request, response) => {
    const body = request.body

    const todo = {
        todo: body.todo,
        done: body.done,
        dailytodo: body.dailytodo_id
    }

    const updatedtodo = await Todo.findByIdAndUpdate(request.params.id, todo, { new: true })
    response.json(updatedtodo)
}

const deleteTodo = async (request, response) => {
    await Todo.findByIdAndDelete(request.params.id)
    response.status(204).end()
}

module.exports = {
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo
}
