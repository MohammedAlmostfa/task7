// ===============================
// Product Slider with Filters
// ===============================
// This script allows users to:
// - Browse products in a horizontal slider
// - Navigate with next/prev buttons
// - Filter products by name and category
// - Sort products by price
// - Toggle a heart icon color (like/favorite)
// - Persist products and categories via localStorage
// ===============================


// -------------------------------
// DOM Element Selection
// -------------------------------
const track = document.getElementById('track');          // Slider track container (holds product cards)
const prev = document.getElementById('prev');            // Previous button for slider
const next = document.getElementById('next');            // Next button for slider
const nameFilter = document.getElementById('searchName'); // Input field for searching products by name
const categoryFilter = document.getElementById('categoryFilter'); // Dropdown for filtering by category
const priceSort = document.getElementById('priceSort');   // Dropdown for sorting products by price


// -------------------------------
// Load Data from localStorage
// -------------------------------
// If no data exists, initialize with empty arrays
let categorys = JSON.parse(localStorage.getItem('categorys')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];


// -------------------------------
// Slider State
// -------------------------------
let index = 0;              // Current slider position
const visibleItems = 3;     // Number of items visible at once


// -------------------------------
// Update Slider Position
// -------------------------------
function updateSlider() {
  if (track.children.length === 0) return; // Exit if no products exist

  const item = track.children[0];          // First product element
  const itemWidth = item.offsetWidth;      // Width of one product card

  const style = window.getComputedStyle(track);
  const gap = parseFloat(style.gap) || 0;  // Gap between items (from CSS)

  const step = itemWidth + gap;            // Step size for sliding
  track.style.transform = `translateX(-${index * step}px)`; // Move track horizontally

  // Disable navigation buttons when at start or end
  prev.disabled = index === 0;
  next.disabled = index >= track.children.length - visibleItems;
}


// -------------------------------
// Next Button Click
// -------------------------------
next.addEventListener('click', () => {
  if (index < track.children.length - visibleItems) {
    index++;
    updateSlider();
  }
});


// -------------------------------
// Previous Button Click
// -------------------------------
prev.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});


// -------------------------------
// Update Slider on Window Resize
// -------------------------------
window.addEventListener('resize', updateSlider);


// -------------------------------
// Utility: Filter Array by Key/Value
// -------------------------------
function filterByKey(arr, key, value) {
  return arr.filter(item => item[key].toLowerCase().includes(value.toLowerCase()));
}


// -------------------------------
// Populate Category Filter Dropdown
// -------------------------------
function getCategorys() {
  const categorySelect = document.getElementById('categoryFilter');
  categorySelect.innerHTML = '<option value="">Select a category</option>';

  categorys.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}
getCategorys(); // Run on page load


// -------------------------------
// Render Products with Filters & Sorting
// -------------------------------
function renderProducts() {
  track.innerHTML = ''; // Clear old content

  let filtered = [...products]; // Copy products array

  // Filter by name
  if (nameFilter.value) {
    filtered = filterByKey(filtered, 'name', nameFilter.value);
  }

  // Filter by category
  if (categoryFilter.value && categoryFilter.value !== 'all') {
    filtered = filterByKey(filtered, 'category', categoryFilter.value);
  }

  // Sort by price
  if (priceSort.value === 'asc') {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (priceSort.value === 'desc') {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  }

  // Render each product card
  filtered.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.url}" alt="${product.name}">
      <h4>${product.name}</h4>
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" 
           class="bi bi-heart-fill heartIcon" viewBox="0 0 16 16">
        <path fill-rule="evenodd" 
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 
                 3.562-3.248 8 1.314"/>
      </svg>
      <p>${product.category}</p>
      <p>$${product.price}</p>
    `;
    track.appendChild(productDiv);
  });

  // Reset slider index after rendering
  index = 0;
  updateSlider();

  // ✅ Attach heart icon events after rendering
  document.querySelectorAll('.heartIcon').forEach(icon => {
    icon.addEventListener('click', changeColor);
  });
}


// -------------------------------
// Run on Page Load
// -------------------------------
renderProducts();


// -------------------------------
// Heart Icon Color Toggle
// -------------------------------
function changeColor(event) {
  const icon = event.target;
  if (icon.style.color === 'red') {
    icon.style.color = '#ffffff'; // Reset to white
  } else {
    icon.style.color = 'red';     // Mark as favorite
  }
}


// -------------------------------
// Update Products when Filters Change
// -------------------------------
nameFilter.addEventListener('input', renderProducts);
categoryFilter.addEventListener('change', renderProducts);
priceSort.addEventListener('change', renderProducts);
