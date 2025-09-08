import React, { useState } from "react";
import { createItem } from "../../actions/userActions";
import "../Setting/setting.scss";

function Create() {
  const [form, setForm] = useState({ email: "", firstname: "", lastname: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createItem(form);
      window.location.assign("/list");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="settings-page">
      <h1 className="page-title">Create Item</h1>

      <div className="card">
        <h2 className="card-title">Item Details</h2>

        <form className="form" onSubmit={onSubmit}>
          {error && (
            <div style={{ color: "#d00", marginBottom: 12 }}>{error}</div>
          )}

          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="input"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />

          <label className="label" htmlFor="fn">First Name</label>
          <input
            id="fn"
            name="firstname"
            className="input"
            type="text"
            value={form.firstname}
            onChange={onChange}
            required
          />

          <label className="label" htmlFor="ln">Last Name</label>
          <input
            id="ln"
            name="lastname"
            className="input"
            type="text"
            value={form.lastname}
            onChange={onChange}
            required
          />

          <div className="actions">
            <button className="btn btn-secondary" type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create"}
            </button>
            <a href="/list" className="btn btn-secondary" style={{ marginLeft: 8 }}>
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;


