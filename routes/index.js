const express = require("express");
const controller = require("../controllers/index");
const router = express.Router();

router
    .route("/api/signIn")
    .post(controller.signIn);

router
    .route("/api/signUp")
    .post(controller.signUp);

router
    .route("/api/products")
    .get(controller.getProducts);

router
    .route("/api/orders")
    .post(controller.createOrder);

router
    .route("/api/orders/:username")
    .get(controller.getOrdersByUsername);

module.exports = router;