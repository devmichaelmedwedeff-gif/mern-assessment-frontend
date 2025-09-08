import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem, updateItem } from "../../actions/userActions";
import "../Setting/setting.scss";

function Update() {
  const { id } = useParams();
  const [form, setForm] = useState({ email: "", firstname: "", lastname: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const prefill = {
          email: params.get("email") || "",
          firstname: params.get("firstname") || "",
          lastname: params.get("lastname") || "",
        };
        if (prefill.email || prefill.firstname || prefill.lastname) {
          setForm(prefill);
        } else {
          const data = await getItem(id);
          setForm({ email: data.email || "", firstname: data.firstname || "", lastname: data.lastname || "" });
        }
      } catch (err) {
        setError("Failed to load item");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await updateItem(id, form);
      window.location.assign("/list");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update item");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="settings-page"><h1 className="page-title">Loading...</h1></div>;

  return (
    <div className="settings-page">
      <h1 className="page-title">Update Item</h1>
      <div className="card">
        <h2 className="card-title">Item Details</h2>
        <form className="form" onSubmit={onSubmit}>
          {error && (<div style={{ color: "#d00", marginBottom: 12 }}>{error}</div>)}

          <label className="label" htmlFor="email">Email</label>
          <input id="email" name="email" className="input" type="email" value={form.email} onChange={onChange} required />

          <label className="label" htmlFor="fn">First Name</label>
          <input id="fn" name="firstname" className="input" type="text" value={form.firstname} onChange={onChange} required />

          <label className="label" htmlFor="ln">Last Name</label>
          <input id="ln" name="lastname" className="input" type="text" value={form.lastname} onChange={onChange} required />

          <div className="actions">
            <button className="btn btn-secondary" type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update"}
            </button>
            <a href="/list" className="btn btn-secondary" style={{ marginLeft: 8 }}>Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;


