import React from "react";

function SearchForm({ onChangeValue }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Tìm theo name, username"
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}

export default SearchForm;
