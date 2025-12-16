// ===============================
// Product Management Application
// ===============================
// This script allows users to:
// - Add, edit, and delete products
// - Categorize products
// - Persist data using localStorage
// - Render products dynamically in a table
// ===============================


// -------------------------------
// DOM Element Selection
// -------------------------------
const form = document.querySelector('form'); // Main product form
const ProductNameInput = document.getElementById('productName'); // Input field for product name
const ProductPriceInput = document.getElementById('productPrice'); // Input field for product price
const productImageUrl = document.getElementById('productImageUrl'); // Input field for product image URL
const ProductCategoryInput = document.getElementById('productCategory'); // Dropdown for product category
const tableBody = document.querySelector('tbody'); // Table body where products will be rendered
const submitButton = document.querySelector('form button[type="submit"]'); // Submit button in the form
const saveCategoryBtn = document.getElementById('saveCategoryBtn'); // Button inside modal to save new category
const newCategoryInput = document.getElementById('newCategory'); // Input field for adding a new category


// -------------------------------
// Flags for Edit Mode
// -------------------------------
let isEdit = false;   // Tracks whether we are editing an existing product
let editIndex = null; // Stores the index of the product being edited


// -------------------------------
// Load Data from localStorage
// -------------------------------
// If no data exists, initialize with empty arrays
let products = JSON.parse(localStorage.getItem('products')) || [];
let categorys = JSON.parse(localStorage.getItem('categorys')) || [];


// -------------------------------
// Initial Render
// -------------------------------
renderTable();   // Render product table on page load
getCategorys();  // Populate category dropdown on page load


// -------------------------------
// Add a New Category
// -------------------------------
function addCategory() {
  const categoryValue = newCategoryInput.value.trim();

  if (categoryValue && !categorys.includes(categoryValue)) {
    // Add category to array and persist in localStorage
    categorys.push(categoryValue);
    localStorage.setItem('categorys', JSON.stringify(categorys));

    // Refresh category dropdown
    getCategorys();

    // Clear input field
    newCategoryInput.value = '';

    // Close modal after saving
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    if (modal) modal.hide();

  } else if (!categoryValue) {
    alert('Please enter a category name');
  } else {
    alert('Category already exists');
  }
}


// -------------------------------
// Render Categories in Dropdown
// -------------------------------
function getCategorys() {
  const categorySelect = document.getElementById('productCategory');
  categorySelect.innerHTML = '<option value="">Select a category</option>';

  // Add each category as an option
  categorys.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}


// -------------------------------
// Add or Update a Product
// -------------------------------
function addProduct() {
  const productData = {
    name: ProductNameInput.value,
    price: ProductPriceInput.value,
    category: ProductCategoryInput.value,
    url: productImageUrl.value
  };

  if (isEdit) {
    // Update existing product
    products[editIndex] = productData;
    isEdit = false;
    editIndex = null;

    // Reset button state back to "Add Product"
    submitButton.textContent = 'Add Product';
    submitButton.classList.remove('btn-warning');
    submitButton.classList.add('btn-primary');
  } else {
    // Add new product
    products.push(productData);
  }

  // Save updated products list to localStorage
  localStorage.setItem('products', JSON.stringify(products));

  // Refresh product table
  renderTable();

  // Clear form inputs
  form.reset();
}


// -------------------------------
// Render Product Table
// -------------------------------
function renderTable() {
  let productsNumber = products.length;
  let productNumberSection = document.querySelector('.product-count');

  // Show product count
  productNumberSection.innerHTML = `<h5>Product Number: ${productsNumber}</h5>`;
  tableBody.innerHTML = '';

  // Create table rows dynamically
  products.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}


// -------------------------------
// Delete a Product
// -------------------------------
function deleteProduct(index) {
  if (confirm('Are you sure you want to delete this product?')) {
    products.splice(index, 1); // Remove product at given index
    localStorage.setItem('products', JSON.stringify(products)); // Update localStorage
    renderTable(); // Refresh table
  }
}


// -------------------------------
// Edit a Product
// -------------------------------
function editProduct(index) {
  // Change button to "Update Product"
  submitButton.textContent = 'Update Product';
  submitButton.classList.remove('btn-primary');
  submitButton.classList.add('btn-warning');

  // Enable edit mode
  isEdit = true;
  editIndex = index;

  // Load product data into form fields
  const product = products[index];
  ProductNameInput.value = product.name;
  ProductPriceInput.value = product.price;
  ProductCategoryInput.value = product.category;
  productImageUrl.value = product.url;

  // Scroll to form for editing
  form.scrollIntoView({ behavior: 'smooth' });
}


// -------------------------------
// Event Listeners
// -------------------------------
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page reload
  addProduct();           // Add or update product
});

saveCategoryBtn.addEventListener('click', addCategory); // Save new category
