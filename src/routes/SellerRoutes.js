const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/SellerController");

const validateToken = require("../middleware/AuthMiddleware");
const allowRoles = require("../middleware/RoleMiddleware");

// 🔥 GET ALL SELLERS (ADMIN ONLY)
router.get(
  "/get",
  validateToken,
  allowRoles("admin"),
  sellerController.getAllSellers
);

// 🔥 VERIFY / UNVERIFY
router.put(
  "/verify/:id",
  validateToken,
  allowRoles("admin"),
  sellerController.toggleVerification
);

module.exports = router;