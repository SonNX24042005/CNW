document.addEventListener('DOMContentLoaded', () => {

  //  Chức năng tìm kiếm 
  const searchInput = document.getElementById('searchInput');
  const allProducts = document.querySelectorAll('.product-list article');

  searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    allProducts.forEach(product => {
      const productName = product.querySelector('h3').textContent.toLowerCase();

      if (productName.includes(searchTerm)) {
        product.style.display = ""; // Hiển thị
      } else {
        product.style.display = "none"; // Ẩn
      }
    });
  });

  //  Chức năng ẩn/hiện form 
  const toggleBtn = document.getElementById('toggleFormBtn');
  const addProductSection = document.getElementById('addProductSection');
  const addProductForm = document.getElementById('addProductForm');

  toggleBtn.addEventListener('click', () => {
    // Thêm hoặc xóa class 'hidden'
    addProductSection.classList.toggle('hidden');
  });
  
  // Ngăn form tải lại trang khi submit
  addProductForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const name = document.getElementById('productName').value;
    alert(`Đã gửi sản phẩm: ${name}!`);
    
    addProductForm.reset(); 
    addProductSection.classList.add('hidden'); // Ẩn form sau khi gửi
  });

});