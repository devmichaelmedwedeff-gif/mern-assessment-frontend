import "./Card.scss";

function Card({ user, onDelete, onUpdate }) {
  return (
    <li className="card">
      <h2 className="card__head">
        {user.firstname || user.firstName} {user.lastname || user.lastName}
      </h2>
      <p className="card__text">{user.email}</p>
      <p className="card__text">{user._id || user.id}</p>
      <div className="card__actions">
        <button
          className="btn btn-danger"
          onClick={() => onDelete && onDelete(user)}
          title="Delete"
        >
          Delete
        </button>
        <button
          className="btn btn-success"
          onClick={() => onUpdate && onUpdate(user)}
          title="Update"
        >
          Update
        </button>
      </div>
    </li>
  );
}

export default Card;
