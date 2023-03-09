const config = require("./db.config");
const mysql = require("mysql");
const conn = mysql.createConnection(config);
conn.connect();

init = () => {
    conn.query(
        `CREATE DATABASE IF NOT EXISTS web;`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    msg: "database web created!",
                });
            }
        }
    );

    conn.query(
        `CREATE TABLE IF NOT EXISTS web.users (
            id INT NOT NULL AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL ,
            fullname VARCHAR(50) NOT NULL ,
            email VARCHAR(50) NOT NULL ,
            phone VARCHAR(15) NOT NULL ,
            alergy TEXT NULL ,
            adress VARCHAR(100) NOT NULL ,
            password VARCHAR(25) NOT NULL ,
            PRIMARY KEY (id)
        );`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    msg: "users table created!",
                });
            }
        }
    );

    conn.query(
        `CREATE TABLE IF NOT EXISTS web.products (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL ,
            price DOUBLE NOT NULL ,
            image TEXT NOT NULL ,
            description TEXT ,
            PRIMARY KEY (id)
        );`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    msg: "products table created!",
                });
            }
        }
    );

    conn.query(
        `CREATE TABLE IF NOT EXISTS web.orders (
            id INT NOT NULL AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL ,
            products TEXT NOT NULL ,
            create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
            PRIMARY KEY (id)
        );`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    msg: "orders table created!",
                });
            }
        }
    );

    conn.query(
        `SELECT COUNT(*) as count FROM web.users`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                results = JSON.parse(JSON.stringify(data));
                if (results[0].count === 0) {
                    for (let i = 1; i <= 3; i++) {
                        conn.query(
                            `INSERT INTO web.users (id, password, fullname, username, email, alergy, adress, phone)
                        VALUES (${i}, '123456', 'משתמש ${i}', 'user${i}', 'user${i}@gmail.com', '', 'תל אביב', '054869029${i+1}')`,
                            function (err, data, fields) {
                                if (err) {
                                    throw new Error(err.message);
                                } else {
                                    console.log({
                                        msg: `user${i} created!`,
                                    });
                                }
                            }
                        );
                    }
                }
            }
        }
    );

    const products = [
        {
            name: "כריך ביצה",
            price: 20.90,
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/egg-cress-club-sandwich-9d415c2.jpg",
            description: "סנדוויץ של ביצה מבושלת, מושלם עבור הבוקר",
        },
        {
            name: "כריך פוקצה פסטו",
            price: 18.90,
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/focaccia-305b66a.jpg",
            description: "כריף פסטו צמחוני בלחם פוקצ׳ה בטאבון לבנים",
        },
        {
            name: "כריך גבינת פאניר וצדר",
            price: 25.90,
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/09/Paneer-Cheddar-Sandwich-dd874ac.jpg",
            description: "אוהבים גבינות? זהו בדיוק הכריך בשבילכם",
        },
        {
            name: "ג׳בטת נקנקיות צוריסו",
            price: 30.00,
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/ultimate-chorizo-ciabatta-c3f006e.jpg",
            description: "גאבטה קרסטית הנאפת בטאבון לבנים, עם נקנקיות צוריסו ורוטב עגבניות",
        },
        {
            name: "כריך מוצרלה עם קציצות בשר",
            price: 19.00,
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/04/Mozzarella-meatball-subs-5101d1e.jpg",
            description: "אוהבים לערבב בשר וחלב? זה הכריך בשבילכם",
        },
        {
            name: "גירוס עוף",
            price: 21.90,
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/herby-chicken-gyros-529a836.jpg",
            description: "היישר מיוון אלכם לצלחת, גירוס עוף אורגינל",
        },
        {
            name: "כריך ארבע גבינות",
            price: 22.90,
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/quatro-fromaggi-grilled-cheese-5306c9c.jpg",
            description: "ארבע גבינות בתנור, פרמזן גאודה מוצרלה ופרומז שמתחבקים בתוך כריך אחד אוורירי במיוחד",
        },
        {
            name: "כריך חלומי",
            price: 32.00,
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Halloumi-wraps-4d13065.jpg",
            description: "כשמו כן הוא",
        },
    ];

    conn.query(
        `SELECT COUNT(*) as count FROM web.products`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                results = JSON.parse(JSON.stringify(data));
                if (results[0].count === 0) {
                    for (let i = 0; i < products.length; i++) {
                        const product = products[i];
                        conn.query(
                            `INSERT INTO web.products (id, name, price, image, description)
                            VALUES (${i+1}, '${product.name}', '${product.price}', '${product.image}', '${product.description}')`,
                            function (err, data, fields) {
                                if (err) {
                                    throw new Error(err.message);
                                } else {
                                    console.log({
                                        
                                        msg: `product${i+1} created!`,
                                    });
                                }
                            }
                        );
                    }
                }
            }
        }
    );
};

module.exports = { conn, init };
