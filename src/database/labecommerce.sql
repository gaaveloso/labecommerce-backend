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
    );

INSERT INTO
    users(id, email, password)
VALUES (
        "2",
        "velosodev@labenu.com",
        "123labenu"
    );

INSERT INTO
    users(id, email, password)
VALUES (
        "3",
        "velososql@labenu.com",
        "labenu456"
    );

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
    );

INSERT INTO
    products(id, name, price, category)
VALUES (
        "20",
        "Headset com fio USB",
        120,
        "Periférico"
    );

INSERT INTO
    products(id, name, price, category)
VALUES (
        "30",
        "Placa mãe",
        500,
        "Hardware"
    );

INSERT INTO
    products(id, name, price, category)
VALUES (
        "40",
        "SSD M.2",
        500,
        "Hardware"
    );

INSERT INTO
    products(id, name, price, category)
VALUES (
        "50",
        "WebCam",
        200,
        "Periférico"
    );

SELECT * FROM products;
