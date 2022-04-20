/**
 * @file Implements model to represent users.
 */
import mongoose from "mongoose";
import UserType from "./user-type";

export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    userType: UserType,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    DOB: string,
    profilePhoto?: string,
    phoneNumber: string,
    address1: string,
    address2?: string,
    city: string,
    state: string,
    zipCode: string
};
