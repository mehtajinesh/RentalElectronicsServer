const signup  = (req, res) => {
    const newUser = req.body;
    const credentials = req.body;

    users.push(credentials);
    req.session['profile'] = credentials;
    res.sendStatus(200);
}

const profile = (req, res) => {
    res.json(req.session['profile']);
}

const login = (req, res) => {
    const credentials = req.body;
    const profile = users.find(user => 
        user.username === credentials.username
        && user.password === credentials.password
        );
    
    if (profile) {
        req.session['profie'] = profile;
        res.sendStatus(200);
        return;
    }

    res.sendStatus(403)
}

const logout = (req, res) => {
    req.session.destroy();
}

module.exports = (app) => {
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:uid', findUserById);
    app.get('/api/users/email/:email', findUserByEmail);

    app.post('/api/users', createUser);

    app.delete('/api/users/:uid', deleteUser);

    app.put('/api/users/:uid', updateUser);

    app.post('/api/profile', signup);
    app.post('/api/login', login);
    app.post('/api/logout', logout);
} 
