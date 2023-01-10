import { users, products, purchases, getAllUsers, getAllProducts, getProductsByName, createUser, getAllPurchases } from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TProduct, TPurchase, TUser } from "./types";

// console.table(users)
// console.table(products)
// console.table(purchases)

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log(" 🔥 Servidor rodando na porta 3003");
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(getAllUsers())
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(getAllProducts())
})

app.get('/purchases', (req: Request, res: Response) => {
    res.status(200).send(getAllPurchases())
})

app.get('/product/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    res.status(200).send(getProductsByName(q))
})

app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    const newUser: TUser = {
        id,
        email,
        password
    }

    users.push(newUser)
    res.status(201).send('Usuario criado com sucesso 😎')
    // res.status(201).send(createUser(id, email, password))
})

app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct: TProduct = {
        id,
        name,
        price,
        category,
    }

    products.push(newProduct)
    res.status(201).send('Produto criado com sucesso 😎')
})

app.post('/purchases', (req: Request, res: Response) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
    }

    purchases.push(newPurchase)
    res.status(201).send('Compra efetuada com sucesso 😎')
})