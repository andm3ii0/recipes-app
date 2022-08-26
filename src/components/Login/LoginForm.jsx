import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './loginForm.css';
import emailImage from '../../images/email.svg';
import passwordImage from '../../images/password.svg';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validationEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  const validationPassword = password.length > +'6';
  const history = useHistory();

  const handleClick = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <div className="bg-image">
      <div className="bg-blur">
        <form>
          <p className="title">Login</p>
          <div className="inputs-form">
            <label htmlFor="email-input" className="email-input">
              <img className="email" src={ emailImage } alt="email" />
              <input
                placeholder="Email"
                type="text"
                id="email-input"
                value={ email }
                data-testid="email-input"
                onChange={ ({ target }) => setEmail(target.value) }
              />
            </label>
            <label htmlFor="password-input" className="password-input">
              <img className="password" src={ passwordImage } alt="password" />
              <input
                placeholder="Password"
                type="password"
                id="password-input"
                value={ password }
                data-testid="password-input"
                onChange={ ({ target }) => setPassword(target.value) }
              />
            </label>
          </div>
          <button
            className="button-form"
            type="button"
            data-testid="login-submit-btn"
            disabled={ !(validationEmail && validationPassword) }
            onClick={ handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
