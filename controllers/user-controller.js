import {daoFindRoleIDForName} from "../database/roles/roles-dao.js";
import {
    daoAddUserInformation, daoDeleteUserInformation,
    daoGetAllUserInformationForUser,
    daoGetAllUsersInformation, daoUpdateUserInformation
} from "../database/userInformation/userInformation-dao.js";
import {daoCreateUser, daoDeleteUser, daoFindUserRoleGivenID, daoUpdateUser} from "../database/users/user-dao.js";
import {daoDeleteCartForUser} from "../database/cart/cart-dao.js";
import {daoDeleteWishlistForUser} from "../database/wishlist/wishlist-dao.js";
import {daoDeleteAllOrderForUser} from "../database/userOrders/user-orders-dao.js";
import {daoDeleteAllProductByUser} from "../database/products/products-dao.js";
import {daoDeleteReviewForUser} from "../database/productReview/product-review-dao.js";

const userController = (app) => {
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:uid', findUserById);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const createUser = async (req, res) => {
    const userData = req.body;
    // get role id from roles table
    const role = await daoFindRoleIDForName(userData['userType'])
    // put email, password and userRole in users table
    const newUser = await daoCreateUser({email:userData["email"],password:userData["password"], userRoleID:role["_id"]})
    // put user information to information table
    await daoAddUserInformation({userID:newUser["_id"],firstName:userData["firstName"], lastName:userData["lastName"], DOB: userData["DOB"], phoneNumber:userData["phoneNumber"], profilePicture:userData["profilePicture"], address:userData["address"]})
    res.send(200);
}

const findAllUsers = async (req, res) => {
    const users = await daoGetAllUsersInformation();
    res.json(users);
}

const findUserById = async (req, res) => {
    const userID = req.params.uid;
    const user = await daoGetAllUserInformationForUser(userID);
    if (user) {
        res.send(user);
    }
    else
    {
        res.sendStatus(404);
    }
}

const deleteUser = async (req, res) => {
    // remove user cart if buyer or buyer/seller
    // remove user wishlist if buyer or buyer/seller
    // remove user orders if buyer or buyer/seller
    // remove user reviews if buyer or buyer/seller
    // remove products if seller or buyer/seller
    // remove user profile information
    // remove user login information
    const userID = req.params['uid'];
    const user = await daoFindUserRoleGivenID(userID)
    const userRoleName = user['userRoleID']['roleName']
    if (userRoleName === "Buyer"){
        await daoDeleteCartForUser(userID);
        await daoDeleteWishlistForUser(userID)
        await daoDeleteAllOrderForUser(userID)
        await daoDeleteReviewForUser(userID)
    } else if (userRoleName === 'Seller') {
        await daoDeleteAllProductByUser()
    } else if ( userRoleName === "Buyer_Seller"){
        await daoDeleteCartForUser(userID);
        await daoDeleteWishlistForUser(userID)
        await daoDeleteAllOrderForUser(userID)
        await daoDeleteReviewForUser(userID)
        await daoDeleteAllProductByUser()
    }
    await daoDeleteUserInformation(userID)
    await daoDeleteUser(userID);
    res.sendStatus(200);
}

const updateUser = async (req, res) => {
    const userData = req.body;
    const userID = req.params.uid;
    // get role id from roles table
    const role = await daoFindRoleIDForName(userData['userType'])
    // put email, password and userRole in users table
    await daoUpdateUser(userID,{email:userData["email"],password:userData["password"], userRoleID:role["_id"]})
    // put user information to information table
    await daoUpdateUserInformation(userID,{userID,firstName:userData["firstName"], lastName:userData["lastName"], DOB: userData["DOB"], phoneNumber:userData["phoneNumber"], profilePicture:userData["profilePicture"], address:userData["address"]})
    res.send(200);
}

export default userController;


