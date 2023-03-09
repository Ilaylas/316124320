products = [];
if (sessionStorage.getItem("PRODUCTS")) {
    products = JSON.parse(sessionStorage.getItem("PRODUCTS"));
    drawProducts();
    loadCart();
} else {
    fetch(`/api/products`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.data) {
                products = response.data;
                drawProducts();
                loadCart();
            } else {
                alert("לא נמצאו מוצרים להצגה");
            }
        })
        .catch((e) => {
            console.log(e);
            alert("התקבלה שגיאת שרת");
        });
}

function drawProducts() {
    const productsElem = document.getElementById("products");
    for (let i = 0; i < products?.length; i++) {
        const product = products[i];
        let html = ``;
        html += `
            <div class="item" product-id="${product.id}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDesc">${product.description}</p>
                <div class="itemImg">
                    <img class="image" src="${product.image}">
                </div>
                <div class="detailsConteiner">
                    ₪${product.price}
                </div>
                `;
        if (sessionStorage.getItem("LOGGED_IN_USER")) {
            html += ` <div class="detailsConteiner add-to-cart" onclick="addToCart('${product.id}')">
                       הוסף לסל שלי
                    </div>`;
        }
        html += `
            </div>
        `;
        productsElem.innerHTML += html;
    }
}

function loadCart() {
    if (!sessionStorage.getItem("LOGGED_IN_USER")) {
        document.querySelector(".btn").remove();
    }

    if (
        sessionStorage.getItem("CART") &&
        sessionStorage.getItem("LOGGED_IN_USER")
    ) {
        cartItems = JSON.parse(sessionStorage.getItem("CART"));
        for (let i = 0; i < cartItems.length; i++) {
            const id = cartItems[i];
            document.querySelector(
                '[product-id="' + id + '"] .add-to-cart'
            ).outerHTML = '<p class="in-cart">נמצא בסל שלך</p>';
        }
    }
}

function addToCart(id) {
    document.querySelector(
        '[product-id="' + id + '"] .add-to-cart'
    ).outerHTML = '<p class="in-cart">נמצא בסל שלך</p>';

    let cartItems = [];
    if (sessionStorage.getItem("CART")) {
        cartItems = JSON.parse(sessionStorage.getItem("CART"));
    }
    cartItems.push(id);
    sessionStorage.setItem("CART", JSON.stringify(cartItems));
}

function submit() {
    if (sessionStorage.getItem("CART")) {
        cartItems = JSON.parse(sessionStorage.getItem("CART"));
        const user = sessionStorage.getItem("LOGGED_IN_USER");
        if (user) {
            fetch(`/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: JSON.parse(user).username,
                    products: JSON.stringify(
                        cartItems
                            .map((id) =>
                                products.find((p) => p.id == id)
                            )
                            .map((p) => p.name)
                    ),
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status === "ok") {
                        sessionStorage.removeItem("CART");
                        sessionStorage.removeItem("PRODUCTS");
                        window.location = "order.html";
                    } else {
                        alert("התקבלה שגיאה בעת יצירת הזמנה חדשה");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    alert("התקבלה שגיאה בעת יצירת הזמנה חדשה");
                });
        }
    } else {
        alert(
            "העגלה שלך ריקה, יש לבחור מוצרים"
        );
        return;
    }
}