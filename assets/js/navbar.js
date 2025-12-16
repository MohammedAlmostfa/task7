/**
 * ===============================
 * initNavbar()
 * ===============================
 * Purpose:
 * Dynamically update the navigation bar depending on the current page.
 * - If the user is on the dashboard page, show a "Back to Home" button.
 * - If the user is on the home page, show a "Go to Dashboard" button.
 * - Also update the page title section accordingly.
 *
 * Dependencies:
 * - HTML elements with IDs: "nav-buttons" and "nav-page"
 * - Correct file paths: "index.html" and "dashboard.html"
 */

function initNavbar() {
    // Check if the current URL path includes "dashboard"
    // This determines whether we are on the dashboard page or not
    const isDashboard = window.location.pathname.toLowerCase().includes("dashboard");

    // Select DOM elements for navigation buttons and page title
    const navButtons = document.getElementById("nav-buttons");
    const navPage = document.getElementById('nav-page');

    // If navButtons element is missing, exit early (prevents errors)
    if (!navButtons) return;

    // Dynamic button and page title depending on the current page
    if (isDashboard) {
        // If on dashboard → show "Back to Home" button
        navButtons.innerHTML = `<a href="index.html" aria-label="Back to Home">Back to Home</a>`;
        navPage.innerHTML = `<h2>Dashboard</h2>`;
    } else {
        // If on home page → show "Go to Dashboard" button
        navButtons.innerHTML = `<a href="dashboard.html" aria-label="Go to Dashboard">Go to Dashboard</a>`;
        navPage.innerHTML = `<h2>Home Page</h2>`;
    }
}
