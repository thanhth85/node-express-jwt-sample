'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Users', [
      { id: 1, username: 'admin', password: '$2a$10$T1W8ybvUt4CSqdqoIA/CkOttiDusVHDoxRirVca11DjGa3ZX.PKX2',  role: 'ADMIN', createdAt: new Date(),
      updatedAt: new Date() },
      { id: 2, username: 'user', password: '$2a$10$6JMo4paEWMLED5SGhuE75eEyv.j5wxktBpZIBKel/btGpMwCrXkVe',  role: 'USER', createdAt: new Date(),
      updatedAt: new Date() }
    ], {})
    .catch((error) => console.log(error));
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
