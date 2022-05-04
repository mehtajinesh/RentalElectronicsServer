import {
  daoAddProductReview,
  daoFindReviewForUser
} from "../database/productReview/product-review-dao.js";
import {daoAddReview} from "../database/reviews/review-dao.js";
import {daoGetWishlistForUser} from "../database/wishlist/wishlist-dao.js";
import {daoGetAllProductsForSeller} from "../database/products/products-dao.js";
import {daoGetAllOrdersForUser} from "../database/userOrders/user-orders-dao.js";

const profileController = (app) => {
  app.get('/api/users/:uid/rentals', getRentalByUser);
  app.get('/api/users/:uid/listings', getListingByUser);
  app.get('/api/users/:uid/wishlist', getWishlistByUser);
  app.get('/api/users/:uid/reviews', getReviewsByUser);
  app.post('/api/users/:uid/products/:pid/reviews', createReviewByUser);
}

const createReviewByUser = async (req, res) => {
  const userID = req.params.pid;
  const productID = req.params.pid;
  const review = req.body;
  const reviewCreated = await daoAddReview(review);
  const productReview = await daoAddProductReview(userID, productID, reviewCreated["_id"]);
  res.json(productReview);
}

const getReviewsByUser = async (req, res) => {
  const uid = req.params.uid;
  const reviews = await daoFindReviewForUser(uid);
  res.json(reviews);
}

const getWishlistByUser = async (req, res) => {
  const uid = req.params.uid;
  const wishlist = await daoGetWishlistForUser(uid);
  res.json(wishlist);
}

const getListingByUser = async (req, res) => {
  const uid = req.params.uid;
  const listing = await daoGetAllProductsForSeller(uid);
  res.json(listing);
}

const getRentalByUser = async (req, res) => {
  const uid = req.params.uid;
  const rental = await daoGetAllOrdersForUser(uid);
  res.json(rental);
}

export default profileController;


