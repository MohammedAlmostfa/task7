// Select DOM elements
const form = document.querySelector('form'); // Main product form
const ProductNameInput = document.getElementById('productName'); // Input for product name
const ProductPriceInput = document.getElementById('productPrice'); // Input for product price
const productImageUrl = document.getElementById('productImageUrl'); // Input for product image URL
const ProductCategoryInput = document.getElementById('productCategory'); // Dropdown for product category
const tableBody = document.querySelector('tbody'); // Table body to render products
const submitButton = document.querySelector('form button[type="submit"]'); // Submit button
const saveCategoryBtn = document.getElementById('saveCategoryBtn'); // Button inside modal to save category
const newCategoryInput = document.getElementById('newCategory'); // Input field for new category

// Flags for edit mode
let isEdit = false;
let editIndex = null;

// Load products and categories from localStorage (or empty arrays if none exist)
let products = JSON.parse(localStorage.getItem('products')) || [];
let categorys = JSON.parse(localStorage.getItem('categorys')) || [];

// Initial render
renderTable();
getCategorys();

// ✅ Add a new category
function addCategory() {
  const categoryValue = newCategoryInput.value.trim();

  if (categoryValue && !categorys.includes(categoryValue)) {
    // Add category to array and save to localStorage
    categorys.push(categoryValue);
    localStorage.setItem('categorys', JSON.stringify(categorys));
    getCategorys();
    newCategoryInput.value = ''; // Clear input field

    // Close modal after saving
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    if (modal) modal.hide();
  } else if (!categoryValue) {
    alert('Please enter a category name');
  } else {
    alert('Category already exists');
  }
}

// ✅ Render categories in the dropdown
function getCategorys() {
  const categorySelect = document.getElementById('productCategory');
  categorySelect.innerHTML = '<option value="">Select a category</option>';

  categorys.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// ✅ Add or update a product
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

    // Reset button state
    submitButton.textContent = 'Add Product';
    submitButton.classList.remove('btn-warning');
    submitButton.classList.add('btn-primary');
  } else {
    // Add new product
    products.push(productData);
  }

  // Save products to localStorage
  localStorage.setItem('products', JSON.stringify(products));

  renderTable();
  form.reset(); // Clear form
}

// ✅ Render product table
function renderTable() {
  let productsNumber = products.length;
  let productNumberSection = document.querySelector('.product-count');

  // Show product count
  productNumberSection.innerHTML = `<h5>Product Number: ${productsNumber}</h5>`;
  tableBody.innerHTML = '';

  // Create table rows for each product
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

// ✅ Delete a product
function deleteProduct(index) {
  if (confirm('Are you sure you want to delete this product?')) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderTable();
  }
}

// ✅ Edit a product
function editProduct(index) {
  submitButton.textContent = 'Update Product';
  submitButton.classList.remove('btn-primary');
  submitButton.classList.add('btn-warning');

  isEdit = true;
  editIndex = index;

  const product = products[index];
  ProductNameInput.value = product.name;
  ProductPriceInput.value = product.price;
  ProductCategoryInput.value = product.category;
  productImageUrl.value = product.url;

  // Scroll to form for editing
  form.scrollIntoView({ behavior: 'smooth' });
}

// ✅ Event listeners
form.addEventListener('submit', function (event) {
  event.preventDefault();
  addProduct();
});

saveCategoryBtn.addEventListener('click', addCategory);
