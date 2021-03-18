'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [{
      url: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06539618.png',
      productId: 1,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
