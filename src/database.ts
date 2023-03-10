// import { Department, TProduct, TPurchase, TUser } from "./types";

// export const users: TUser[] = [
//   {
//     id: "1",
//     email: "veloso@labenu.com",
//     password: "labenu123",
//   },
//   {
//     id: "2",
//     email: "velosodev@labenu.com",
//     password: "123labenu",
//   },
// ];

// export const createUser = (id: string, email: string, password: string): void => {
//   const newUser: TUser[] = [{
//     id,
//     email,
//     password
//   }]
//   users.push(...newUser)
//   console.log("Cadastro realizado com sucesso")
// }

// export const getAllUsers = () => {
//   return users
// }

// export const products: TProduct[] = [
//   {
//     id: "10",
//     name: "Memória RAM DDR4",
//     price: 150,
//     category: Department.HARDWARES,
//   },
//   {
//     id: "20",
//     name: "Headset com fio USB",
//     price: 120,
//     category: Department.PERIPHERALS,
//   },
// ];

// export const createProduct = (id: string, name: string, price: number, category: Department): void => {
//   const newProduct: TProduct[] = [{
//     id,
//     name,
//     price,
//     category,
//   }]
//   products.push(...newProduct)
//   console.log("Produto criado com sucesso")
// }

// export const getAllProducts = () => {
//   return products
// }

// export const getProductById = (idToSearch: string): Array<TProduct> => {
//   return products.filter((product) => {
//       return product.id === idToSearch
//     }
//   )
// }

// export const getProductsByName = (q : string): Array<TProduct> => {
//   return products.filter((product) => {
//     return product.name.toLowerCase().includes(q.toLowerCase())
//   })
// }

// const sumPrice = (quantity: number, price: number) : number => {
//     const sum: number = quantity * price
//     return sum
// };

// export const purchases: TPurchase[] = [
//   {
//     userId: "1",
//     productId: "10",
//     quantity: 1,
//     totalPrice: sumPrice(1, 150),
//   },
//   {
//     userId: "2",
//     productId: "20",
//     quantity: 2,
//     totalPrice: sumPrice(2, 120),
//   },
// ];

// export const getAllPurchases = () => {
//   return purchases
// }

// export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice: number) : void => {
//   const newPurchase: TPurchase[] = [{
//     userId,
//     productId,
//     quantity,
//     totalPrice,
//   }]
//   purchases.push(...newPurchase)

// }

// createPurchase('1', '10', 2, 300)

// export const getAllPurchasesFromUserId = (userIdToSearch: string) : Array<TPurchase> => {
//   return purchases.filter((purchase => {
//     return purchase.userId == userIdToSearch
//   }))
// }