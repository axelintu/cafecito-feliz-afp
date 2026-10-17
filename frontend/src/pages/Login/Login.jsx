import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <article className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={onSubmit}>
          <fieldset>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={email}
                placeholder="email@cafecito.com"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Contraseña"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={!email || !password}
          >Entrar</button>
        </form>
      </article>
    </>
  );
}

export default Login;
