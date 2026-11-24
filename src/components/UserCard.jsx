import "./UserCard.css";

function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0)}
      </div>

      <h2>{user.name}</h2>

      <p><strong>Email:</strong> {user.email}</p>

      <p><strong>Usuário:</strong> {user.username}</p>

      <p><strong>Cidade:</strong> {user.address.city}</p>

      <p><strong>Empresa:</strong> {user.company.name}</p>
    </div>
  );
}

export default UserCard;