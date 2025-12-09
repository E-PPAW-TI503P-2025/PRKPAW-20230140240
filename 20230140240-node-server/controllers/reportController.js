const { Presensi, User } = require("../models");
const { Op } = require("sequelize");

exports.getDailyReport = async (req, res) => {
  console.log("✅ CONTROLLER BARU KEPAKAI (getDailyReport)");

  try {
    const { nama, tanggalMulai, tanggalSelesai } = req.query;

    const options = {
      where: {},
      include: [
        {
          model: User,
          as: "user",
          attributes: ["nama"],
        },
      ],
    };

    if (nama) {
      options.include[0].where = {
        nama: { [Op.like]: `%${nama}%` },
      };
    }

    if (tanggalMulai && tanggalSelesai) {
      options.where.checkIn = {
        [Op.between]: [tanggalMulai, tanggalSelesai],
      };
    }

    const records = await Presensi.findAll(options);

    const formattedRecords = records.map((record) => ({
      id: record.id,
      userId: record.userId,
      nama: record.user.nama,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      latitude: record.latitude,
      longitude: record.longitude,
      buktiFoto: record.buktiFoto,
    }));

    res.json({
      reportDate: new Date().toLocaleDateString(),
      filter: { nama, tanggalMulai, tanggalSelesai },
      data: formattedRecords,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil laporan",
      error: error.message,
    });
  }
};
