// Select DOM elements
const track = document.getElementById('track');          // Slider track container
const prev = document.getElementById('prev');            // Previous button
const next = document.getElementById('next');            // Next button
const nameFilter = document.getElementById('searchName'); // Input field for name search
const categoryFilter = document.getElementById('categoryFilter'); // Dropdown for category filter
const priceSort = document.getElementById('priceSort');   // Dropdown for price sorting

// Load categories and products from localStorage
let categorys = JSON.parse(localStorage.getItem('categorys')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

// Slider state
let index = 0;
const visibleItems = 3; // Number of items visible at once

// ✅ Update slider position
function updateSlider() {
  if (track.children.length === 0) return;

  const item = track.children[0]; // First product element
  const itemWidth = item.offsetWidth; // Width of one product

  const style = window.getComputedStyle(track);
  const gap = parseFloat(style.gap) || 0; // Gap between items

  const step = itemWidth + gap; // Step size for sliding
  track.style.transform = `translateX(-${index * step}px)`; // Move track

  // Disable buttons when at start or end
  prev.disabled = index === 0;
  next.disabled = index >= track.children.length - visibleItems;
}

// ✅ Next button
next.addEventListener('click', () => {
  if (index < track.children.length - visibleItems) {
    index++;
    updateSlider();
  }
});

// ✅ Previous button
prev.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});

// ✅ Update slider when window resizes
window.addEventListener('resize', updateSlider);

// ✅ Filter array by key/value
function filterByKey(arr, key, value) {
  return arr.filter(item => item[key].toLowerCase().includes(value.toLowerCase()));
}

// ✅ Populate category filter dropdown
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
getCategorys();

// ✅ Render products dynamically with filters and sorting
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

  // Render products
  filtered.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.url}" alt="${product.name}">
      <h4>${product.name}</h4>
   
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-heart-fill  heartIcon" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg>
      <p>${product.category}</p>
      <p>$${product.price}</p>
    `;
    track.appendChild(productDiv);
  });

  // ✅ اربط الأحداث لكل أيقونة قلب بعد الرندر


  index = 0; // Reset slider index
  updateSlider();
}

// ✅ Run on page load
renderProducts();

// ✅ دالة تغيير اللون
function changeColor(event){

  const icon = event.target;
  if(icon.style.color === 'red'){
    icon.style.color = '#ffffff';
  }else{
    icon.style.color = 'red';
  }
  
}

// ✅ Update when filters change
nameFilter.addEventListener('input', renderProducts);
categoryFilter.addEventListener('change', renderProducts);
priceSort.addEventListener('change', renderProducts);
  document.querySelectorAll('.heartIcon').forEach(icon => {
    icon.addEventListener('click', changeColor);
  });