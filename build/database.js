"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.purchases = exports.getProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
const types_1 = require("./types");
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
const createUser = (id, email, password) => {
    const newUser = [{
            id,
            email,
            password
        }];
    exports.users.push(...newUser);
    console.log("Cadastro realizado com sucesso");
};
exports.createUser = createUser;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
exports.products = [
    {
        id: "10",
        name: "Memória RAM DDR4",
        price: 150,
        category: types_1.Department.HARDWARES,
    },
    {
        id: "20",
        name: "Headset com fio USB",
        price: 120,
        category: types_1.Department.PERIPHERALS,
    },
];
const createProduct = (id, name, price, category) => {
    const newProduct = [{
            id,
            name,
            price,
            category,
        }];
    exports.products.push(...newProduct);
    console.log("Produto criado com sucesso");
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    return exports.products.filter((product) => {
        return product.id === idToSearch;
    });
};
exports.getProductById = getProductById;
const getProductsByName = (q) => {
    return exports.products.filter((product) => {
        return product.name.includes(q);
    });
};
exports.getProductsByName = getProductsByName;
const sumPrice = (quantity, price) => {
    const sum = quantity * price;
    return sum;
};
exports.purchases = [
    {
        userId: "1",
        productId: "10",
        quantity: 1,
        totalPrice: sumPrice(1, 150),
    },
    {
        userId: "2",
        productId: "20",
        quantity: 2,
        totalPrice: sumPrice(2, 120),
    },
];
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = [{
            userId,
            productId,
            quantity,
            totalPrice,
        }];
    exports.purchases.push(...newPurchase);
    console.log("Compra realizada com sucesso");
};
exports.createPurchase = createPurchase;
(0, exports.createPurchase)('1', '10', 2, 300);
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchases.filter((purchase => {
        return purchase.userId == userIdToSearch;
    }));
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
console.log((0, exports.getAllPurchasesFromUserId)('1'));
//# sourceMappingURL=database.js.map