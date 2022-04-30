import * as orderDao from "../database/userOrders/user-orders-dao.js";
import * as productDao from "../database/products/products-dao.js";
import * as wishlistDao from "../database/wishlist/wishlist-dao.js";
import {daoFindReviewForUser} from "../database/productReview/product-review-dao.js";

const profileController = (app) => {
  app.get('/api/users/:uid/rentals', getRentalByUser);
  app.get('/api/users/:uid/listings', getListingByUser);
  app.get('/api/users/:uid/wishlist', getWishlistByUser);
  app.get('/api/users/:uid/reviews', getReviewsByUser);
  app.post('/api/users/:uid/products/:pid/reviews', createReviewByUser);
}

const getReviewsByUser = async (req, res) => {
  const uid = req.params.uid;
  const reviews = await daoFindReviewForUser(uid);
  res.json(reviews);
}

const getWishlistByUser = async (req, res) => {
  const uid = req.params.uid;
  const wishlist = await wishlistDao.daoGetWishlistForUser(uid);
  res.json(wishlist);
}

const getListingByUser = async (req, res) => {
  const uid = req.params.uid;
  const listing = await productDao.daoGetAllProductsForSeller(uid);
  res.json(listing);
}

const getRentalByUser = async (req, res) => {
  const uid = req.params.uid;
  const rental = await orderDao.findOrdersByUser(uid);
  res.json(rental);
}

export default profileController;


