// File: 20251209023905-add-photo-to-presensi.js

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // HARUS MENGGUNAKAN 'presensis' (Huruf Kecil, Jamak)
    await queryInterface.addColumn("presensis", "buktiFoto", { 
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // HARUS MENGGUNAKAN 'presensis' (Huruf Kecil, Jamak)
    await queryInterface.removeColumn("presensis", "buktiFoto"); 
  },
};