-- Active: 1673880071138@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );

INSERT INTO
    users(id, email, password)
VALUES (
        "1",
        "veloso@labenu.com",
        "labenu123"
    ), (
        "2",
        "velosodev@labenu.com",
        "123labenu"
    ), (
        "3",
        "velososql@labenu.com",
        "labenu456"
    );

--retorna todos os usuários cadastrados--

SELECT * FROM users;

CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products(id, name, price, category)
VALUES (
        "10",
        "Memória RAM DDR4",
        150,
        "Hardware"
    ), (
        "20",
        "Headset com fio USB",
        120,
        "Periférico"
    ), (
        "30",
        "Placa mãe",
        500,
        "Hardware"
    ), (
        "40",
        "SSD M.2",
        500,
        "Hardware"
    ), (
        "50",
        "WebCam",
        200,
        "Periférico"
    );

--retorna todos os produtos cadastrados--

SELECT * FROM products;

--retorna o produto baseado no termo de busca--

SELECT * FROM products WHERE name LIKE "%placa%";

--mocke um novo usuário

--insere o item mockado na tabela users

INSERT INTO
    users(id, email, password)
VALUES (
        "4",
        "velosodatabase@labenu.com",
        "labenu789"
    );

--mocke um novo produto

--insere o item mockado na tabela products

INSERT INTO
    products(id, name, price, category)
VALUES (
        "60",
        "Placa de Vídeo",
        1500,
        "Hardware"
    );

--busca produto baseada no id mockado

SELECT * FROM products WHERE id = "20";

--busca user baseado no id mockado

SELECT * FROM users WHERE id = "1";

--delete a linha do produto baseada no id mockado

DELETE FROM products WHERE id = "20";

--edite a linha do user baseada nos valores mockados

UPDATE users SET email = 'veloso2@labenu.com' WHERE id = "1";

--edite a linha do product baseada nos valores mockados

UPDATE products SET price = '200.00' WHERE id = "20";

--retorna o resultado ordenado pela coluna name em ordem crescente

--não tenho name então usei email

SELECT * FROM users ORDER BY email ASC;

--retorna o resultado ordenado pela coluna price em ordem crescente

--limite o resultado em 20 iniciando pelo primeiro item

--"Começando do primeiro item, eu pulo o primeiro ?"

--Não tenho 20 produtos mockados

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 1;

--mocke um intervalo de preços, por exemplo entre 100.00 e 300.00

--retorna os produtos com preços dentro do intervalo mockado em ordem crescente

SELECT * FROM products WHERE price >= 100.00 AND price <= 300.00;

--Criação da tabela de pedidos

CREATE TABLE
    purchases(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL UNIQUE NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT NULL,
        buyer_id TEXT NOT NULL,
        FOREIGN Key (buyer_id) REFERENCES users (id)
    );

UPDATE purchases
SET delivered_at = datetime()
WHERE id = "p003";

INSERT INTO
    purchases (
        id,
        total_price,
        paid,
        delivered_at,
        buyer_id
    )
VALUES  ("p001", 200.00, 0, 'null', "1"),
        ("p002", 400.00, 1, 'null', "1"),
        ("p003", 650.00, 0, 'null', "2"),
        ("p004", 80.00, 1, 'null', "2");

--Assim não deu certo, porque?

--Caso quisesse colocar datas diferentes pra cada usuario

-- VALUES ("p001", 200.00, 0, SELECT DATE('now'), "1"), ("p002", 400.00, 1, SELECT DATE('now'), "1"), ("p003", 650.00, 0, 'null', "2"), ("p004", 80.00, 1, 'null', "2");

SELECT
    purchases.id as purchase_id,
    purchases.total_price,
    purchases.paid,
    purchases.delivered_at,
    purchases.buyer_id as user_id,
    users.email,
    users.password
FROM purchases
    INNER JOIN users on users.id = purchases.buyer_id;

SELECT *
FROM purchases
    INNER JOIN users on users.id = purchases.buyer_id
WHERE users.id = "2"