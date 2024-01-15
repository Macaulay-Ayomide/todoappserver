const User = require('../models/user')

const getAllUser = async (request, response) => {
    const users = await User.find({})
    response.json(users)
}

const createUser = async (request, response) => {
    const { username, name, gmail, password } = request.body

    if (username.length < 3 || password.length < 3) {
        return response.status(401).send('Username or password length is less than 3')
    }

    const user = new User({
        username,
        name,
        gmail,
        password
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser).send()
}

module.exports = {
    getAllUser,
    createUser
}
