"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Products", [
            {
                name: "Pizza",
                category: "Food",
                description: "Delicious pizza with various toppings",
                price: 150000,
                quantity: 50,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Coke",
                category: "Drink",
                description: "Refreshing carbonated soft drink",
                price: 7500,
                quantity: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Chocolate Bar",
                category: "Snack",
                description: "Milk chocolate bar",
                price: 15000,
                quantity: 80,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Hamburger",
                category: "Food",
                description:
                    "Classic beef burger with lettuce, tomato, and cheese",
                price: 25000,
                quantity: 40,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Orange Juice",
                category: "Drink",
                description: "Freshly squeezed orange juice",
                price: 8000,
                quantity: 60,
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
