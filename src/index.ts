import {
  users,
  products,
  purchases,
  getAllUsers,
  getAllProducts,
  getProductsByName,
  createUser,
  getAllPurchases,
} from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TPurchase, TUser, Department } from "./types";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log(" 🔥 Servidor rodando na porta 3003");
});

const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,12}$/g;

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
      SELECT * FROM users;
    `);

    res.status(200).send({ users: result });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
      SELECT * FROM products;
    `);

    res.status(200).send({ products: result });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
      SELECT * FROM purchases;
    `);

    res.status(200).send({ purchases: result });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    if (q.length <= 1) {
      res.status(400);
      throw new Error("query params deve possuir pelo menos um caractere");
    }

    const product = await db.raw(`
      SELECT * FROM products
      WHERE LOWER(name) LIKE("%${q}%");
    `);

    res.status(200).send({ product: product });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, createdAt } = req.body;

    if (typeof id != "string") {
      res.status(400);
      throw new Error("'id' invalido, deve ser uma string");
    }

    if (email !== undefined) {
      if (!email.match(regexEmail)) {
        res.status(400);
        throw new Error("Email invalido");
      }
    }

    if (id.length < 1 || name.length < 1) {
      res.status(400);
      throw new Error("'id' ou 'name' devem ter no minimo 1 caractere");
    }

    if (password !== undefined) {
      if (typeof password !== "string") {
        res.status(400);
        throw new Error("'password' deve ser uma string");
      }
      if (!password.match(regexPassword)) {
        res.status(400);
        throw new Error(
          "'password' deve possuir entre 4 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
        );
      }
    }
    //Usar datenow no created
    await db.raw(`
      INSERT INTO users (id, name, email, password, createdAt)
      VALUES ("${id}", "${name}", "${email}", "${password}", "${createdAt}");
    `);

    res.status(201).send(`Usuario cadastrado com sucesso.`);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, category, imageUrl } = req.body;

    if (typeof id != "string") {
      res.status(400);
      throw new Error("'id' invalido, deve ser uma string");
    }

    if (typeof name != "string") {
      res.status(400);
      throw new Error("'name' invalido, deve ser uma string");
    }

    if (id.length < 1 || name.length < 1) {
      res.status(400);
      throw new Error("'id' ou 'name' devem ter no minimo 1 caractere");
    }

    if (typeof price != "number") {
      res.status(400);
      throw new Error("'price' invalido, deve ser um number");
    }

    if (typeof category != "string") {
      res.status(400);
      throw new Error("'category' invalido, deve ser uma string");
    }

    if (typeof imageUrl != "string") {
      res.status(400);
      throw new Error("'imageUrl' invalido, deve ser uma string");
    }

    await db.raw(`
      INSERT INTO products ( id, name, price, category, imageUrl)
      VALUES ("${id}", "${name}", "${price}", "${category}", "${imageUrl}")
    `);

    res.status(200).send(`${name} adicionado com sucesso.`);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, total_price, paid, delivered_at, buyer_id } = req.body;

    if (typeof id != "string") {
      res.status(400);
      throw new Error("'id' invalido, deve ser uma string");
    }

    if (typeof delivered_at != "string") {
      res.status(400);
      throw new Error("'delivered_at' invalido, deve ser uma string");
    }

    if (typeof buyer_id != "string") {
      res.status(400);
      throw new Error("'buyer_id' invalido, deve ser uma string");
    }

    if (typeof total_price != "number") {
      res.status(400);
      throw new Error("'total_price' invalido, deve ser um number");
    }

    if (paid > 1 && paid < 0) {
      res.status(400);
      throw new Error("'paid' invalido, deve ser 0 ou 1");
    }

    if (
      id.length < 1 ||
      paid.length < 1 ||
      delivered_at.length < 1 ||
      buyer_id.length < 1
    ) {
      res.status(400);
      throw new Error("As informações devem ter no minimo 1 caractere");
    }

    await db.raw(`
      INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
      VALUES ("${id}", "${total_price}", "${paid}", "${delivered_at}", "${buyer_id}")
    `);

    res.status(200).send(`Compra cadastrada com sucesso`);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [product] = await db.raw(`
      SELECT * FROM products
      WHERE id = "${id}"
    `);

    if (!product) {
      res.status(400);
      throw new Error("Produto não encontrado");
    }

    res.status(200).send({ product: product });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const purchases = await db.raw(`
      SELECT * FROM purchases
      WHERE buyer_id = "${id}"
    `);

    res.status(200).send({ purchases: purchases });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.delete("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findUser = users.find((user) => user.id === id);
    if (!findUser) {
      res.status(400);
      throw new Error("Usuario não encontrado");
    }

    const indexToRemove = users.findIndex((user) => user.id === id);

    if (indexToRemove >= 0) {
      users.splice(indexToRemove, 1);
    }

    res.status(200).send("User apagado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.delete("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findProduct = products.find((product) => product.id === id);
    if (!findProduct) {
      res.status(400);
      throw new Error("Produto não encontrado");
    }

    const indexToRemove = products.findIndex((product) => product.id === id);

    if (indexToRemove >= 0) {
      products.splice(indexToRemove, 1);
    }

    res.status(200).send("Produto apagado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.put("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findUser = users.find((user) => user.id === id);
    if (!findUser) {
      res.status(400);
      throw new Error("Usuario não encontrado");
    }

    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    if (newEmail === req.body.email) {
      res.status(400);
      throw new Error("Email igual ao anterior");
    }

    if (newEmail !== undefined) {
      if (!newEmail.match(regexEmail)) {
        res.status(400);
        throw new Error("Email invalido");
      }
    }

    if (newPassword !== undefined) {
      if (typeof newPassword !== "string") {
        res.status(400);
        throw new Error("'password' deve ser uma string");
      }
      if (!newPassword.match(regexPassword)) {
        res.status(400);
        throw new Error(
          "'password' deve possuir entre 4 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
        );
      }
    }
    const user = users.find((user) => user.id === id);

    if (user) {
      user.email = newEmail || user.email;
      user.password = newPassword || user.password;
    }

    res.status(200).send("Cadastro atualizado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.put("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findProduct = products.find((product) => product.id === id);
    if (!findProduct) {
      res.status(400);
      throw new Error("Produto não encontrado");
    }

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as Department | undefined;

    if (newName.length < 1) {
      res.status(400);
      throw new Error("'newName' deve ter pelo menos 1 caractere");
    }

    if (typeof newPrice !== "number") {
      res.status(400);
      throw new Error("'newPrice' deve ser um 'number'");
    }

    const product = products.find((product) => product.id === id);

    if (product) {
      product.name = newName || product.name;
      product.price = newPrice || product.price;
      product.category = newCategory || product.category;

      product.price = isNaN(newPrice) ? product.price : newPrice;
    }

    res.status(200).send("Produto atualizado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});
