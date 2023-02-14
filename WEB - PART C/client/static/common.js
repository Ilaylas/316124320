function createNavbar() {
    let nav = `
        <nav>
            <div class="logo"> <a  href="index.html"><span>LAS</span>ANDWICH </a></div>
            <div class="nav-links">
                <ul>
                    <li><a href="about.html">?מי אנחנו</a> </li>
                    <li><a href="menu.html">לסנדוויצ'ים שלנו</a> </li>
                    <li><a href="ContactUs.html">צור קשר</a> </li>`;

        if (sessionStorage.getItem("LOGGED_IN_USER")) {
            nav += `<li><a href="order.html">ההזמנות שלי</a> </li>`;
            nav += `<li onclick="logout()">התנתק</li>`;
        }
        else {
            nav += `<li><a class="navlink" href="Login.html">התחבר</a> </li>`;
            nav += `<li><a class="navlink" href="register.html">הרשם</a> </li>`;
        }
        
        nav += `</ul>
            </div>
        </nav>`;

    document.body.innerHTML = nav + document.body.innerHTML;
}
createNavbar();

function logout() {
    sessionStorage.clear();
    window.location = "login.html";
}