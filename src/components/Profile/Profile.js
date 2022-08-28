import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();
  const { email: userEmail } = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState(userEmail);
  const [name, setName] = useState('User Name');
  const [password, setPassword] = useState('*******');
  const [editEmail, setEditEmail] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  return (
    <div>
      <div className="email">
        <div className="email-content">
          <p className="email-title">E-mail:</p>
          {editEmail ? (
            <input
              type="text"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          ) : (
            <p data-testid="profile-email">{email}</p>
          )}
        </div>
        <button type="button" onClick={ () => setEditEmail((prev) => !prev) }>
          Edit
        </button>
      </div>
      <div className="user">
        <div className="user-content">
          <p className="user-title">User Name:</p>
          {editName ? (
            <input
              type="text"
              value={ name }
              onChange={ ({ target }) => setName(target.value) }
            />
          ) : (
            <p data-testid="profile-name">{name}</p>
          )}
        </div>
        <button type="button" onClick={ () => setEditName((prev) => !prev) }>
          Edit
        </button>
      </div>
      <div className="password">
        <div className="password-content">
          <p className="password-title">Password:</p>
          {editPassword ? (
            <input
              type="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
            />
          ) : (
            <p data-testid="profile-password">{password}</p>
          )}
        </div>
        <button type="button" onClick={ () => setEditPassword((prev) => !prev) }>
          Edit
        </button>
      </div>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
