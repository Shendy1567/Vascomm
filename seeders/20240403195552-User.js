"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Users", [
            {
                name: "John Doe",
                email: "john.doe@example.com",
                password_hash:
                    "$2b$10$cuuYRV1TfZ.qRUN9mwUXb..ktYtK4//rv9qBhZJSSpMitt9V.djmq", // test
                phone_number: "628123155443",
                role: "admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Jane Smith",
                email: "jane.smith@example.com",
                password_hash:
                    "$2b$10$cuuYRV1TfZ.qRUN9mwUXb..ktYtK4//rv9qBhZJSSpMitt9V.djmq", // test
                phone_number: "628987654321",
                role: "user",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Michael Johnson",
                email: "michael.johnson@example.com",
                password_hash:
                    "$2b$10$cuuYRV1TfZ.qRUN9mwUXb..ktYtK4//rv9qBhZJSSpMitt9V.djmq", // test
                phone_number: "628555123456",
                role: "user",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Emily Brown",
                email: "emily.brown@example.com",
                password_hash:
                    "$2b$10$cuuYRV1TfZ.qRUN9mwUXb..ktYtK4//rv9qBhZJSSpMitt9V.djmq", // test
                phone_number: "628777987654",
                role: "user",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Christopher Lee",
                email: "christopher.lee@example.com",
                password_hash:
                    "$2b$10$cuuYRV1TfZ.qRUN9mwUXb..ktYtK4//rv9qBhZJSSpMitt9V.djmq", // test
                phone_number: "628333444555",
                role: "admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
