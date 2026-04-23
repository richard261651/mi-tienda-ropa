import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'ROPITA2026';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <main className="login-page">
      <div className="login-box">
        <h2>Acceso <span className="accent-text">Admin</span></h2>
        <input className="login-input" type="text" placeholder="Usuario" value={user} onChange={e => setUser(e.target.value)} />
        <input className="login-input" type="password" placeholder="Contraseña" value={pass} onChange={e => setPass(e.target.value)} />
        {error && <p className="login-error">{error}</p>}
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleLogin}>Entrar</button>
      </div>
    </main>
  );
}
