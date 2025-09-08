import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { fetchItems, deleteItem, logout } from "../../actions/userActions";
import "./List.scss";

function List() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState({ open: false, type: null, user: null });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchItems();
        setItems(data || []);
      } catch (err) {
        setItems([]);
      }
    })();
  }, []); // load once

  const confirmDelete = (user) => setModal({ open: true, type: "delete", user });
  const confirmUpdate = (user) => setModal({ open: true, type: "update", user });

  const performAction = async () => {
    const user = modal.user;
    if (!user) return;
    if (modal.type === "delete") {
      try {
        await deleteItem(user._id || user.id || user.email);
        setItems((prev) => prev.filter((x) => (x._id || x.id || x.email) !== (user._id || user.id || user.email)));
      } catch (err) {}
      setModal({ open: false, type: null, user: null });
    } else if (modal.type === "update") {
      const id = user._id || user.id || user.email;
      const params = new URLSearchParams({
        email: user.email || "",
        firstname: user.firstname || user.firstName || "",
        lastname: user.lastname || user.lastName || "",
      });
      setModal({ open: false, type: null, user: null });
      window.location.assign(`/list/update/${id}?${params.toString()}`);
    }
  };
  const closeModal = () => setModal({ open: false, type: null, user: null });

  return (
    <div className="container">
      <div className="top-bar">
        <h2 className="list-title">User List</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
      <div className="actions" style={{ marginBottom: 16 }}>
        <a href="/list/create" className="primary-btn" style={{ marginRight: 8 }}>
          Create
        </a>
        <a href="/settings" className="primary-btn">
          Settings
        </a>
      </div>
      <ul className="card-list">
        {items.map((user, index) => (
          <Card key={index} user={user} onDelete={confirmDelete} onUpdate={confirmUpdate} />
        ))}
      </ul>
      {modal.open && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-title">
              {modal.type === "delete" ? "Delete item" : "Update item"}
            </div>
            <div className="modal-text">
              {modal.type === "delete"
                ? "Are you sure you want to delete this item?"
                : "Proceed to update this item?"}
            </div>
            <div className="modal-actions">
              <button className="btn-secondary-outline" onClick={closeModal}>No</button>
              <button className="btn-primary" onClick={performAction}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
