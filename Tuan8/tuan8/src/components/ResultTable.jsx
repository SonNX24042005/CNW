import React, { useEffect, useState } from "react";
import Modal from "./Modal"; // 💬 import modal để dùng khi sửa

function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null); // 💬 state chứa user đang được sửa
  const [loading, setLoading] = useState(true);

  // 💬 Tải dữ liệu ban đầu từ API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // 💬 Khi có user mới được thêm
  useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { id: Date.now(), ...user }]);
      onAdded();
    }
  }, [user]);

  // 💬 Kích hoạt modal chỉnh sửa
  const editUser = (u) => {
    setEditing({ ...u, address: { ...u.address } }); // deep copy
  };

  // 💬 Cập nhật dữ liệu trong form khi người dùng nhập
  const handleEditChange = (e) => {
    const { id, value } = e.target;
    if (id === "city") {
      setEditing({ ...editing, address: { city: value } });
    } else {
      setEditing({ ...editing, [id]: value });
    }
  };

  // 💬 Lưu người dùng sau khi sửa
  const saveUser = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === editing.id ? editing : u))
    );
    setEditing(null); // 💬 đóng modal
  };

  // 💬 Xóa người dùng trực tiếp (Bước 7)
  const removeUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // 💬 Lọc danh sách theo keyword
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div>
      {/* 💬 Hiển thị bảng người dùng */}
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Username</th>
            <th>Email</th>
            <th>Thành phố</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address?.city}</td>
              <td>
                {/* 💬 Nút mở modal sửa */}
                <button onClick={() => editUser(u)}>Sửa</button>
                {/* 💬 Nút xóa trực tiếp */}
                <button onClick={() => removeUser(u.id)} style={{ marginLeft: 5 }}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 💬 Modal chỉnh sửa người dùng */}
      {editing && (
        <Modal title="Chỉnh sửa người dùng" onClose={() => setEditing(null)}>
          <input id="name" value={editing.name} onChange={handleEditChange} placeholder="Name" />
          <input id="username" value={editing.username} onChange={handleEditChange} placeholder="Username" />
          <input id="email" value={editing.email} onChange={handleEditChange} placeholder="Email" />
          <input id="city" value={editing.address.city} onChange={handleEditChange} placeholder="City" />
          <button onClick={saveUser}>Lưu</button>
        </Modal>
      )}
    </div>
  );
}

export default ResultTable;
