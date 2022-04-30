const userDao = require('./user-dao');

const findAllUsers = async (req, res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
}

const findUserById = async (req, res) => {
    const uid = req.params['uid'];
    const user = await userDao.findUserById(uid);

    if (user) {
        res.json(user);
    }
    else 
    {
        res.sendStatus(404);
    }

}

const findUserByEmail = async (req, res) => {
    const email = req.params['email'];
    const user = await userDao.findUserByEmail(email);
    
    if (user) {
        res.json(user);
    }
    else 
    {
        res.sendStatus(404);
    }
}

const findUserByCredentials = async (req, res) => {
    const credentials = req.body;
    const {email, password} = credentials;
    const user = await userDao.findUserByCredentials(email, password);
    
    if (user) {
        res.sendStatus(200);
    }
    else 
    {
        res.sendStatus(403);
    }
}

const createUser = async (req, res) => {
    const user = req.body;
    const dob = new Date(req.body['DOB']);
    req.body['DOB'] = dob;

    const insertedUser = await userDao.createUser(user);
    res.json(insertedUser);
}

const deleteUser = async (req, res) => {
    const uid = req.params['uid'];
    const status = await userDao.deleteUser(uid);
    res.sendStatus(200);
}


const updateUser = async (req, res) => {
    const uid = req.params['uid'];
    const user = req.body;
    const status = await userDao.updateUser(uid, user);
    req.session['profile'] = user;

    res.json(status);
}


module.exports = (app) => {
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:uid', findUserById);
    app.get('/api/users/email/:email', findUserByEmail);
    app.post('/api/users/credentials', findUserByCredentials);

    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);

} 

