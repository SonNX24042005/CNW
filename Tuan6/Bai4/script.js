document.addEventListener('DOMContentLoaded', () => {

  //  Lấy các phần tử DOM 
  const searchInput = document.getElementById('searchInput');
  const toggleBtn = document.getElementById('toggleFormBtn');
  const addProductSection = document.getElementById('addProductSection');
  const addProductForm = document.getElementById('addProductForm');
  const productList = document.querySelector('.product-list');
  const formError = document.getElementById('formError');
  const cancelBtn = document.getElementById('cancelBtn');

  //  Chức năng tìm kiếm 
  searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Phải querySelectorAll mỗi lần gõ để lấy cả sản phẩm mới thêm
    const allProducts = document.querySelectorAll('.product-list article'); 

    allProducts.forEach(product => {
      const productName = product.querySelector('h3').textContent.toLowerCase();
      if (productName.includes(searchTerm)) {
        product.style.display = ""; 
      } else {
        product.style.display = "none";
      }
    });
  });

  //  Ẩn/hiện form (Nút "Thêm sản phẩm") 
  toggleBtn.addEventListener('click', () => {
    addProductSection.classList.toggle('hidden');
    formError.style.display = 'none'; // Ẩn lỗi cũ khi mở/đóng
  });

  //  Nút Hủy (trong form) 
  cancelBtn.addEventListener('click', () => {
    addProductSection.classList.add('hidden');
    addProductForm.reset(); 
    formError.style.display = 'none';
  });
  
  //  Xử lý Submit Form 
  addProductForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn tải lại trang
    
    // 1. Lấy giá trị
    const name = document.getElementById('productName').value.trim();
    const desc = document.getElementById('productDesc').value.trim();
    const priceInput = document.getElementById('productPrice').value.trim();
    const image = document.getElementById('productImage').value.trim();
    
    // 2. Validate
    const price = parseFloat(priceInput);
    
    if (name === '' || desc === '') {
      formError.textContent = 'Vui lòng nhập đầy đủ tên và mô tả sản phẩm.';
      formError.style.display = 'block';
      return; 
    }
    
    if (isNaN(price) || price <= 0) {
      formError.textContent = 'Giá sản phẩm phải là một số dương hợp lệ.';
      formError.style.display = 'block';
      return;
    }

    // 3. Xóa lỗi nếu hợp lệ
    formError.style.display = 'none';

    // 4. Tạo phần tử HTML
    const newProduct = document.createElement('article');
    const imageUrl = image ? image : 'https://via.placeholder.com/300x200.png?text=No+Image';
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    newProduct.innerHTML = `
      <img src="${imageUrl}" alt="Ảnh ${name}">
      <h3>${name}</h3>
      <p>${desc}</p>
      <p><strong>Giá:</strong> ${formattedPrice}</p>
    `;
    
    // 5. Thêm sản phẩm vào đầu danh sách
    productList.prepend(newProduct);
    
    // 6. Reset và ẩn form
    addProductForm.reset(); 
    addProductSection.classList.add('hidden'); 
  });

});