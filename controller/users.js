const userRouter = require('express').Router()
const {
    getAllUser,
    createUser
} = require('../routerdef/user')

userRouter.route('/').get(getAllUser).post(createUser)

module.exports = userRouter
