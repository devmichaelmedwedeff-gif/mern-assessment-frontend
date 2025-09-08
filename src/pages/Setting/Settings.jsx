// import user from "./1.json";
import "./setting.scss";
import { fetchMe } from "../../actions/userActions";
import { useState, useEffect } from "react";

function Settings() {
  const [user, setUser] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMe();
        setUser(data || { id: "", name: "", email: "" });
      } catch (err) {
        setUser({ id: "", name: "", email: "" });
      }
    })();
  }, []); // load once
  return (
    <div className="settings-page">
      <h1 className="page-title">Settings</h1>

      <div className="card">
        <h2 className="card-title">User Information</h2>

        <div className="form">
          <label className="label" htmlFor="userId">
            User ID
          </label>
          <input
            id="userId"
            className="input"
            type="text"
            value={user.id}
            disabled
          />

          {/* <label className="label" htmlFor="first">
            First Name
          </label>
          <input
            id="first"
            className="input"
            type="text"
            value={user.firstname}
            disabled
          /> */}

          <label className="label" htmlFor="last">
            Last Name
          </label>
          <input
            id="last"
            className="input"
            type="text"
            value={user.name}
            disabled
          />

          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input"
            type="email"
            value={user.email}
            disabled
          />
        </div>
      </div>
      <div className="actions">
        <a href="/list" className="btn btn-secondary">
          Back to List
        </a>
      </div>
    </div>
  );
}

export default Settings;
