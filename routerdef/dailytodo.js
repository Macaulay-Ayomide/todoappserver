const DailyTodo = require('../models/dailytodo')
const User = require('../models/user')

const getAlldailyTodo = async (request, response) => {
    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
    const todolist = await DailyTodo.find({ tododate: formattedDate })
    response.json(todolist)
}

const createdailyTodo = async (request, response) => {
    const body = request.body
    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
    const todolist = await DailyTodo.find({ tododate: formattedDate })
    console.log(formattedDate)
    if (todolist.length === 0) {
        const newlist = await DailyTodo.create({ user: body.user_id, tododate: formattedDate })
        const savedlist = await newlist.save()
        const user = await User.findById(body.user_id)
        user.dailytodo = user.dailytodo.concat(savedlist._id)
        await user.save()
        response.json(savedlist)
    }
    response.json(todolist)
}

const getdailyTodo = async (request, response) => {
    const todolist = await DailyTodo.findById(request.params.id)
    response.json(todolist)
}

const deletedailyTodo = async (request, response) => {
    await DailyTodo.findByIdAndDelete(request.params.id)
    response.status(204).end()
}

module.exports = {
    getAlldailyTodo,
    createdailyTodo,
    getdailyTodo,
    deletedailyTodo
}
