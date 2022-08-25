import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import profileIcon from '../../images/perfil.svg';
import searchIcon from '../../images/lupa.svg';
import './index.css';
import Context from '../../Context/Context';

export default function Header({ pageTitle, searchIconRender = true }) {
  const { onSearchIconClick } = useContext(Context);

  return (
    <header>
      <NavLink className="profile" to="/profile">
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </NavLink>
      <p className="page-title" data-testid="page-title">{pageTitle}</p>
      {searchIconRender && (
        <button className="searc" type="button" onClick={ onSearchIconClick }>
          <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string,
}.isRequired;
