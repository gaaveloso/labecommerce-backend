import { TProduct, TPurchase, TUser } from "./types";

export const users: TUser[] = [
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

export const products: TProduct[] = [
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

const sumPrice = (quantity: number, price: number) : number => {
    const sum: number = quantity * price
    return sum
};

export const purchases: TPurchase[] = [
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
