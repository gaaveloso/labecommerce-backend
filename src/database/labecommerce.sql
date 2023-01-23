-- Active: 1673880071138@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        createdAt TEXT NOT NULL
    );

INSERT INTO
    users(id, name, email, password, createdAt)
VALUES (
        "1",
        "João",
        "veloso@labenu.com",
        "labenu123",
        "23-01-2023"
    ), (
        "2",
        "Pedro",
        "velosodev@labenu.com",
        "123labenu",
        "23-01-2023"
    ), (
        "3",
        "Maria",
        "velososql@labenu.com",
        "labenu456",
        "23-01-2023"
    );

--retorna todos os usuários cadastrados--

SELECT * FROM users;

CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL,
        imageUrl TEXT NULL
    );

INSERT INTO
    products(id, name, price, category, imageUrl)
VALUES (
        "10",
        "Memória RAM DDR4",
        150,
        "Hardware",
        "https://images-americanas.b2w.io/produtos/210455695/imagens/memoria-ram-kingston-4gb-ddr4-pc4-2400-cl17-288/210455695_1_large.jpg"
    ), (
        "20",
        "Headset com fio USB",
        120,
        "Periférico",
        "https://a-static.mlcdn.com.br/800x560/headset-usb-voip-dh-80-zox-com-cancelador-de-ruido/pontualoffice/7522783908/df381d339d9030252d0a1071d2fe85b4.jpg"
    ), (
        "30",
        "Placa mãe",
        500,
        "Hardware",
        "https://img.terabyteshop.com.br/produto/g/placa-mae-asus-prime-h610m-e-d4-chipset-h610-intel-lga-1700-matx-ddr4-90mb19n0-m0eay0_136252.jpg"
    ), (
        "40",
        "SSD M.2",
        500,
        "Hardware",
        "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/jvofipse/file.png"
    ), (
        "50",
        "WebCam",
        200,
        "Periférico",
        "https://resource.logitech.com/content/dam/logitech/en/products/webcams/c922/gallery/c922-gallery-1.png"
    );

--retorna todos os produtos cadastrados--

SELECT * FROM products;

--retorna o produto baseado no termo de busca--

SELECT * FROM products WHERE name LIKE "%placa%";

--mocke um novo usuário

--insere o item mockado na tabela users

INSERT INTO
    users(id, name, email, password, createdAt)
VALUES (
        "4",
        "Paula",
        "velosodatabase@labenu.com",
        "labenu789",
        "23-01-2023"
    );

--mocke um novo produto

--insere o item mockado na tabela products

INSERT INTO
    products(id, name, price, category, imageUrl)
VALUES (
        "60",
        "Placa de Vídeo",
        1500,
        "Hardware",
        "https://s2.glbimg.com/NaWdSD_-mHDjuaj1PbO2CXhXV8w=/0x0:695x521/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2017/Q/q/F5BBqCR4AtDbXjT2jtAQ/gigabyte-aorus-570.png"
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
WHERE users.id = "2";

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

SELECT * FROM purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("p001", "50", 2),
("p002", "40", 1),
("p003", "30", 1);

SELECT
purchases.id,
purchases.total_price,
purchases.paid,
purchases.delivered_at,
purchases.buyer_id,
purchases_products.product_id AS productId,
purchases_products.quantity,
products.name,
products.price,
products.category
FROM purchases
LEFT JOIN purchases_products
ON purchases_products.purchase_id = purchases.id 
INNER JOIN products
on purchases_products.product_id = products.id
;