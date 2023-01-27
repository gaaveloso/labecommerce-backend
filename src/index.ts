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
    const result = await db("users");

    res.status(200).send({ users: result });
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

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products");

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
    const result = await db("purchases");

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

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, category, imageUrl } = req.body;

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

    if (typeof description != "string") {
      res.status(400);
      throw new Error("'description' invalido, deve ser uma string");
    }

    await db.raw(`
      INSERT INTO products ( id, name, price, description, category, imageUrl)
      VALUES ("${id}", "${name}", "${price}", "${description}" , "${category}", "${imageUrl}")
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
    const { id, total_price, paid, buyer_id, products } = req.body;

    if (typeof id != "string") {
      res.status(400);
      throw new Error("'id' invalido, deve ser uma string");
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

    if (id.length < 1 || paid.length < 1 || buyer_id.length < 1) {
      res.status(400);
      throw new Error("As informações devem ter no minimo 1 caractere");
    }

    await db.raw(`
      INSERT INTO purchases (id, total_price, paid, buyer_id)
      VALUES ("${id}", "${total_price}", "${paid}", "${buyer_id}")
    `);

    for (let product of products) {
      await db.raw(`INSERT INTO purchases_products (purchase_id, product_id, quantity)
      VALUES ("${id}", "${product.id}", ${product.quantity})`);
    }

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

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    const [purchases] = await db("purchases").where({ id: purchaseId})

    if (!purchases) {
      res.status(400);
      throw new Error("Compra não encontrado");
    }

    await db("purchases_products").del().where({ purchase_id: purchaseId })
    await db("purchases").del().where({ id:purchaseId})

    res.status(200).send("Produto apagado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.put("/product/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newCategory = req.body.category as Department | undefined;
    const newImageUrl = req.body.imageUrl;

    if (newName.length < 1) {
      res.status(400);
      throw new Error("'newName' deve ter pelo menos 1 caractere");
    }

    if (typeof newPrice !== "number") {
      res.status(400);
      throw new Error("'newPrice' deve ser um 'number'");
    }

    const [product] = await db("products").where({ id: id });

    if (product) {
      const updateProduct = {
        id: newId || req.body.id,
        name: newName || req.body.name,
        price: newPrice || req.body.price,
        description: newDescription || req.body.description,
        category: newCategory || req.body.category,
        imageUrl: newImageUrl || req.body.imageUrl,

      };
      await db("products").update(updateProduct).where({ id: id });
    } else {
      res.status(404);
      throw new Error("'id' não encontrado");
    }

    res.status(200).send({ message: "Produto atualizado com sucesso." });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const [purchase] = await db("purchases").where({ id: req.params.id });
    const [buyer] = await db("users").where({ id: purchase.buyer_id });

    const products = [];

    const purchasesProducts = await db("purchases_products").where({
      purchase_id: purchase.id,
    });

    for (let purchaseProduct of purchasesProducts) {
      const [product] = await db("products").where({
        id: purchaseProduct.product_id,
      });
      products.push(product);
    }

    res.status(200).send({
      purchaseId: purchase.id,
      buyerId: purchase.buyer_id,
      buyerName: buyer.name,
      buyerEmail: buyer.email,
      totalPrice: purchase.total_price,
      createdAt: purchase.created_at,
      paid: purchase.paid,
      products,
    });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});
