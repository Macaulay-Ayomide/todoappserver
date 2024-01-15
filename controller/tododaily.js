const tododailyRouter = require('express').Router()

const {
    getAlldailyTodo,
    createdailyTodo,
    getdailyTodo,
    deletedailyTodo
} = require('../routerdef/dailytodo')

tododailyRouter.route('/').get(getAlldailyTodo).post(createdailyTodo)

tododailyRouter.route('/:id').get(getdailyTodo).delete(deletedailyTodo)

module.exports = tododailyRouter
