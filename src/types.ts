export type TUser = {
    id: string
    email: string
    password: string
}

export enum Department {
    HARDWARES = "Hardwares",
    PERIPHERALS = "Periféricos",
    COMPUTER = "Computadores"
}

export type TProduct = {
    id: string
    name: string
    price: number
    description: string
    category: Department
}

export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
    buyer_id: string
}