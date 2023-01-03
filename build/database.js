"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "1",
        email: "veloso@labenu.com",
        password: "labenu123",
    },
    {
        id: "2",
        email: "velosodev@labenu.com",
        password: "123labenu",
    },
];
exports.products = [
    {
        id: "10",
        name: "Memória RAM DDR4",
        price: 150,
        category: "hardware",
    },
    {
        id: "20",
        name: "Headset com fio USB",
        price: 120,
        category: "perifericos",
    },
];
const sumPrice = (quantity, price) => {
    const sum = quantity * price;
    return sum;
};
exports.purchases = [
    {
        userId: "1",
        productId: "10",
        quantity: 2,
        totalPrice: sumPrice(2, 150),
    },
    {
        userId: "2",
        productId: "20",
        quantity: 1,
        totalPrice: sumPrice(1, 120),
    },
];
//# sourceMappingURL=database.js.map