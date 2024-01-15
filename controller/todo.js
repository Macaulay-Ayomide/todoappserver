const todoRouter = require('express').Router()
const {
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../routerdef/todo')

todoRouter.route('/').get(getAllTodo).post(createTodo)

todoRouter.route('/:id').put(updateTodo).delete(deleteTodo)

module.exports = todoRouter
