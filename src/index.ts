import { users, products, purchases, getAllUsers, getAllProducts, getProductsByName, createUser, getAllPurchases } from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TProduct, TPurchase, TUser, Department } from "./types";

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
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/purchases', (req: Request, res: Response) => {
    res.status(200).send(purchases)
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

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const result = products.find((product) => product.id === id)

    res.status(200).send(result)
    console.log('Objeto Product Encontrado')
})

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id

    const result = purchases.find((purchase) => purchase.userId === id)

    res.status(200).send(result)
    console.log('Array de compras do user procurado')
})

app.delete("/user/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = users.findIndex((user) => user.id === id)

    if(indexToRemove >= 0){
        users.splice(indexToRemove, 1)
    }

    res.status(200).send("User apagado com sucesso")
})

app.delete("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = products.findIndex((product) => product.id === id)

    if(indexToRemove >= 0){
        products.splice(indexToRemove, 1)
    }

    res.status(200).send("Produto apagado com sucesso")
})

app.put('/user/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)

    if(user) {
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }

    res.status(200).send("Cadastro atualizado com sucesso")
})

app.put('/product/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as Department | undefined

    const product = products.find((product) => product.id === id)

    if(product) {
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.category = newCategory || product.category

        product.price = isNaN(newPrice) ? product.price : newPrice
    }

    res.status(200).send("Produto atualizado com sucesso")
})