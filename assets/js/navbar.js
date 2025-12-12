function initNavbar() {
    const isDashboard = window.location.pathname.toLowerCase().includes("dashboard");

    const navButtons = document.getElementById("nav-buttons");
    const navPage = document.getElementById('nav-page');
    if (!navButtons) return;

    // Dynamic button depending on the current page
    if (isDashboard) {
        navButtons.innerHTML = `<a href="index.html" aria-label="Back to Home">Back to Home</a>`;
        navPage.innerHTML = `<h2>Dashboard</h2>`;
    } else {
        navButtons.innerHTML = `<a href="dashboard.html" aria-label="Go to Dashboard">Go to Dashboard</a>`;
        navPage.innerHTML = `<h2>Home Page</h2>`;
    }
}
