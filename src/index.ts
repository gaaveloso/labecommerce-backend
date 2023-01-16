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

// console.table(users)
// console.table(products)
// console.table(purchases)

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log(" 🔥 Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.get("/purchases", (req: Request, res: Response) => {
  res.status(200).send(purchases);
});

app.get("/product/search", (req: Request, res: Response) => {
  let productFilter;
  try {
    const q = req.query.q as string;

    if (q.length <= 1) {
      res.status(400);
      throw new Error("query params deve possuir pelo menos um caractere");
    }

    productFilter = products.filter((product) => {
      return product.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(productFilter);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;

    const findId = users.find((user) => user.id === id);

    if (findId) {
      res.status(400);
      throw new Error("ID indisponivel");
    }

    const findEmail = users.find((user) => user.email === email);

    if (findEmail) {
      res.status(400);
      throw new Error("EMAIL indisponivel");
    }

    const newUser: TUser = {
      id,
      email,
      password,
    };

    users.push(newUser);
    res.status(201).send("Usuario criado com sucesso 😎");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    const findId = products.find((product) => product.id === id);

    if (findId) {
      res.status(400);
      throw new Error("ID indisponivel");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      category,
    };

    products.push(newProduct);
    res.status(201).send("Produto criado com sucesso 😎");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.post("/purchases", (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;

    const findIdUser = purchases.find((purchase) => purchase.userId === userId);

    if (!findIdUser) {
      res.status(400);
      throw new Error("ID do usuario não existe");
    }

    const findIdProduct = products.find(
      (product) => product.id === productId
    );

    if (!findIdProduct) {
      res.status(400);
      throw new Error("ID do produto não existe");
    }

    
    if (findIdProduct.price * quantity !== totalPrice) {
        res.status(400)
        throw new Error("Total incorreto");
    }

    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    };

    purchases.push(newPurchase);
    res.status(201).send("Compra efetuada com sucesso 😎");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findProduct = products.find((product) => product.id === id);
    if (!findProduct) {
      res.status(400);
      throw new Error("Produto não encontrado");
    }

    const result = products.find((product) => product.id === id);

    res.status(200).send(result);
    console.log("Objeto Product Encontrado");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findUser = purchases.find((purchase) => purchase.userId === id);
    if (!findUser) {
      res.status(400);
      throw new Error("Usuario não encontrado");
    }

    const result = purchases.find((purchase) => purchase.userId === id);

    res.status(200).send(result);
    console.log("Array de compras do user procurado");
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

    const regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,12}$/g;
    
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
