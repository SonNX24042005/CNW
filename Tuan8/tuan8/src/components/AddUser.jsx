import React, { useState } from "react";
import Modal from "./Modal"; // 💬 import Modal tái sử dụng

function AddUser({ onAdd }) {
  // 💬 state kiểm soát mở/đóng modal
  const [showModal, setShowModal] = useState(false);

  // 💬 state quản lý dữ liệu form
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { city: "" },
  });

  // 💬 Cập nhật dữ liệu form khi người dùng nhập
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "city") {
      setUser({ ...user, address: { city: value } });
    } else {
      setUser({ ...user, [id]: value });
    }
  };

  // 💬 Thêm user mới và đóng modal
  const handleAdd = () => {
    if (!user.name || !user.username) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user);
    // 💬 Reset form
    setUser({ name: "", username: "", email: "", address: { city: "" } });
    setShowModal(false);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      {/* 💬 Nút mở modal */}
      <button onClick={() => setShowModal(true)}>Thêm người dùng</button>

      {/* 💬 Hiển thị modal khi state showModal = true */}
      {showModal && (
        <Modal title="Thêm người dùng" onClose={() => setShowModal(false)}>
          <input id="name" placeholder="Name" value={user.name} onChange={handleChange} />
          <input id="username" placeholder="Username" value={user.username} onChange={handleChange} />
          <input id="email" placeholder="Email" value={user.email} onChange={handleChange} />
          <input id="city" placeholder="City" value={user.address.city} onChange={handleChange} />
          <button onClick={handleAdd}>Lưu</button>
        </Modal>
      )}
    </div>
  );
}

export default AddUser;
