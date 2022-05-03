import {daoCreateUser, daoFindUserByCredentials} from "../database/users/user-dao.js";
import {daoFindRoleIDForName} from "../database/roles/roles-dao.js";
import {
    daoAddUserInformation,
    daoGetAllUserInformationForUser
} from "../database/userInformation/userInformation-dao.js";

const authController = (app) => {
    app.post('/api/register', register);
    app.post('/api/login', login);
    app.post('/api/logout', logout);
}

const register = async (req, res) => {
    const userData = req.body;
    const existingUser = await daoFindUserByCredentials(userData.email, userData.password);
    if (existingUser) {
        res.sendStatus(403);
    } else {
        // get role id from roles table
        const role = await daoFindRoleIDForName(userData['userType'])
        // put email, password and userRole in users table
        const newUser = await daoCreateUser({email:userData["email"],password:userData["password"], userRoleID:role["_id"]})
        // put user information to information table
        await daoAddUserInformation({userID:newUser["_id"],firstName:userData["firstName"], lastName:userData["lastName"], DOB: userData["DOB"], phoneNumber:userData["phoneNumber"], profilePicture:userData["profilePicture"], address:userData["address"]})
        res.send(200);
    }
}

const login = async (req, res) => {
    const credentials = req.body;
    const user = await daoFindUserByCredentials(credentials.email, credentials.password);

    if (user) {
        const userProfileInformation = await daoGetAllUserInformationForUser(user["_id"])
        req.session['profile'] = userProfileInformation;
        res.json(userProfileInformation);
        req.session.save();
        return;
    }
    res.sendStatus(403)
}

const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

export default authController;
