
const { conn } = require("../services/db");

exports.signUp = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        conn.query(
            `INSERT INTO web.users(fullname, password, username, email, adress, phone, alergy) 
            VALUES ('${req.body.fullname}','${req.body.password}', '${req.body.username}', '${req.body.email}', '${req.body.adress}', '${req.body.phone}', '${req.body.alergy}')`,
            function (err, mysqlres) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ response: "user created!" });
                }
            }
        );
    }
};

exports.signIn = (req, res) => {
    const { email, password } = req.body;
    const q = "SELECT * FROM web.users WHERE `email` = '" + email + "' AND `password` = '" + password + "' LIMIT 1"

    conn.query(q, function (err, data, fields) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!data?.length) {
            res.status(400).json({ error: 'no user was found' });
        }
        else {
            res.status(200).json({
                response: JSON.parse(JSON.stringify(data[0])),
            });
        }
    });
};

exports.getProducts = (req, res, next) => {
    conn.query(
        "SELECT * FROM web.products",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.createOrder = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        conn.query(
            `INSERT INTO web.orders(username, products) VALUES ('${req.body.username}', '${req.body.products}')`,
            function (err, mysqlres) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ status: 'ok' });
                }
            }
        );
    }
};

exports.getOrdersByUsername= (req, res) => {
    const { username } = req.params;

    conn.query(
        `SELECT * FROM web.orders WHERE username = '${username}'`,
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};