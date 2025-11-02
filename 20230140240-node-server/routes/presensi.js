const express = require("express");
const router = express.Router();
const presensiController = require("../controllers/presensiController");
const { addUserData } = require("../middleware/permissionMiddleware");
const { body } = require("express-validator");

// Middleware untuk menambahkan user info
router.use(addUserData);

// ============================
// CHECK-IN & CHECK-OUT
// ============================
router.post("/check-in", presensiController.CheckIn);
router.post("/check-out", presensiController.CheckOut);

// ============================
// UPDATE DATA PRESENSI (PUT)
// Validasi format tanggal menggunakan express-validator
// ============================
router.put(
  "/:id",
  [
    body("checkIn")
      .optional()
      .isISO8601()
      .withMessage("checkIn harus dalam format tanggal yang valid (ISO 8601)"),
    body("checkOut")
      .optional()
      .isISO8601()
      .withMessage("checkOut harus dalam format tanggal yang valid (ISO 8601)"),
  ],
  presensiController.updatePresensi
);

// ============================
// DELETE DATA PRESENSI
// ============================
router.delete("/:id", presensiController.deletePresensi);

// ============================
// SEARCH BERDASARKAN NAMA
// Contoh: GET /api/presensi/search/nama?nama=tasnim
// ============================
router.get("/search/nama", presensiController.searchByName);

// ============================
// SEARCH BERDASARKAN TANGGAL
// Contoh: GET /api/presensi/search/tanggal?tanggalMulai=2025-10-01&tanggalSelesai=2025-10-31
// ============================
router.get("/search/tanggal", presensiController.searchByDate);

module.exports = router;
