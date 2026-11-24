import { useState, useEffect } from "react";
import api from "./services/api";
import UserCard from "./components/UserCard";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get("/users");

        setUsers(response.data);
      } catch (error) {
        console.error(error);

        setError(
          "Não foi possível carregar os usuários. Tente novamente."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <header>
        <h1>Lista de Usuários</h1>
        <p>Dados carregados através de uma API pública</p>
      </header>

      <input
        type="text"
        placeholder="Pesquisar usuário..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading && (
        <p className="loading">
          Carregando dados...
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="total">
            Usuários encontrados: {filteredUsers.length}
          </p>

          <div className="users-grid">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                />
              ))
            ) : (
              <p>Nenhum usuário encontrado.</p>
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default App;