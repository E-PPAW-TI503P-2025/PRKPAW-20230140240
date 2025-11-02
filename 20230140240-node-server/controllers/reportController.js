const { Presensi } = require("../models");
const { Op } = require("sequelize");

exports.getDailyReport = async (req, res) => {
  try {
    const { nama, tanggalMulai, tanggalSelesai } = req.query;
    let options = { where: {} };

    // Filter berdasarkan nama (jika ada)
    if (nama) {
      options.where.nama = {
        [Op.like]: `%${nama}%`,
      };
    }

    // Filter berdasarkan rentang tanggal (jika ada)
    if (tanggalMulai && tanggalSelesai) {
      options.where.waktuCheckIn = {
        [Op.between]: [new Date(tanggalMulai), new Date(tanggalSelesai)],
      };
    }

    const records = await Presensi.findAll(options);

    res.json({
      reportDate: new Date().toLocaleDateString("id-ID"),
      totalData: records.length,
      filter: {
        nama: nama || null,
        tanggalMulai: tanggalMulai || null,
        tanggalSelesai: tanggalSelesai || null,
      },
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil laporan",
      error: error.message,
    });
  }
};
