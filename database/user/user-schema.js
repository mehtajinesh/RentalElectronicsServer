const mongoose = require('mongoose');

const userTypeArray = ["buyer", "seller", "buyer_seller","admin"];

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    DOB: Date,
    phoneNumber: Number,
    profilePicture: {
      type: String,
      default: "http://www.gravatar.com/avatar/?d=identicon",
    },
    address: {
      line1: {type: String, required: true},
      line2: String,
      city: {type: String, required: true},
      state: {type: String, required: true},
      zipcode: {type: String, required: true},
    },
    userType: {
      type: String,
      enum: userTypeArray,
      required: true
    },
    reviews: {
      type: Array,
      defualt: [],
    },
    listed_items: {
      type: Array,
      defualt: [],
    },
    cart: {
      type: Array,
      defualt: [],
    },
    wishlist: {
      type: Array,
      defualt: [],
    }
}, {collection: 'users'});


module.exports = userSchema;