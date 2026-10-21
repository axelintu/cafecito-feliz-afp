import { useState } from 'react';
import { login as loginService } from '../../services/authService.js';
import { saveToken } from '../../utils/auth.js';
import { ERROR_MESSAGES } from '../../constants/errorMessages.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const { token } = await loginService({ email, password });
      saveToken(token);
    } catch (err) {
      handleLoginError(err);
    }
  };

  const handleLoginError = (err) => {
    if (err.kind === 'UNAUTHORIZED') {
      setErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
      setPassword('');
    } else {
      setErrorMessage(ERROR_MESSAGES.UNEXPECTED);
    }
  };

  return (
    <>
      <article className="login-container">
        {errorMessage && (
          <article className="login-error" role="alert">
            <strong>{errorMessage}</strong>
          </article>
        )}
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
