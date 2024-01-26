const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const ItemController = require("../controllers/ItemController");
const CartController = require("../controllers/CartController");
const CategoryController = require("../controllers/CategoryController");
const AuthController = require("../controllers/AuthController");
const WishlistController = require("../controllers/WishlistController");
// middleware
import isSeller from "../middleware/isSeller"
import isBuyer from "../middleware/isBuyer"
import isAdmin from "../middleware/isAdmin"

// User routes
router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// Item routes
router.post("/items", ItemController.createItem);
router.get("/items",  ItemController.getAllItems);
router.get("/items/:id",  ItemController.getItemById);
router.put("/items/:id", ItemController.updateItem);
router.delete("/items/:id", ItemController.deleteItem);

// Cart routes
router.post("/carts",CartController.createCart);
router.get("/carts", isBuyer, artController.getAllCarts);
router.get("/carts/:id", CartController.getCartById);
router.put("/carts/:id", CartController.updateCart);
router.delete("/carts/:id", CartController.deleteCart);

// Category routes
router.post("/categories", CategoryController.createCategory);
router.get("/categories", CategoryController.getAllCategories);
router.get("/categories/:id", CategoryController.getCategoryById);
router.put("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

// Wishlist routes
router.post("/wishlists", WishlistController.createWishlist);
router.get("/wishlists", WishlistController.getAllWishlists);
router.get("/wishlists/:id", WishlistController.getWishlistById);
router.put("/wishlists/:id", WishlistController.updateWishlist);
router.delete("/wishlists/:id", WishlistController.deleteWishlist);
// Auth routes
router.post("/register", AuthController.signUp);
router.post("/login", AuthController.login);

module.exports = router;
