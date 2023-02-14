if (!sessionStorage.getItem('LOGGED_IN_USER')) {
    window.location = 'login.html'
}
else {
    const user = JSON.parse(sessionStorage.getItem('LOGGED_IN_USER'));
    fetch(`/api/orders/${user.username}`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
        if (response.data?.length > 0) {
            const tbody = document.getElementById('tbody');
            for (let i=0; i<response.data.length; i++) {
                const order = response.data[i];
                tbody.innerHTML += `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.products}</td>
                        <td>${new Date(order.create_date).toLocaleDateString()}</td>
                    </tr>
                `;
            }
        } else {
            alert("אין לך הזמנות קודמות");
        }
    })
    .catch((e) => {
        console.log(e);
        alert("התרחשה שגיאת שרת");
    });
}