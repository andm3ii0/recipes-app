import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import Context from '../../Context/Context';
import fetchAPI from '../../services/fetchAPI';
import icons from '../../images/iconCategories';
import './filter.css';

export default function FilterCategory({ drink }) {
  const [categories, setCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState('');
  const { setRecipes } = useContext(Context);

  useEffect(() => {
    if (drink) {
      return fetchAPI(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      ).then((data) => setCategories(data.drinks));
    }
    fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then(
      (data) => setCategories(data.meals),
    );
    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    if (isFiltered !== e.target.name && e.target.name) {
      if (drink) {
        return fetchAPI(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e.target.name}`,
        ).then((data) => {
          setRecipes(data.drinks);
          setIsFiltered(e.target.name);
        });
      }
      return fetchAPI(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.name}`,
      ).then((data) => {
        setRecipes(data.meals);
        setIsFiltered(e.target.name);
      });
    }
    if (drink) {
      return fetchAPI(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      ).then((data) => {
        setRecipes(data.drinks);
        setIsFiltered('');
      });
    }
    fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=').then(
      (data) => {
        setRecipes(data.meals);
        setIsFiltered('');
      },
    );
  };

  return (
    <div className="filter">
      <button
        className="all"
        type="button"
        data-testid="All-category-filter"
        onClick={ (e) => handleClick(e) }
      >
        <img src={ icons.cutlery } alt="All" />
        All
      </button>
      {categories
        && categories.map(({ strCategory }, index) => {
          if (index > +'4') return true;
          return (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ `strCategory ${index}` }
              name={ strCategory }
              type="button"
              className={ strCategory }
              onClick={ async (e) => handleClick(e) }
            >
              <img src={ icons[strCategory] } alt={ strCategory } />
              {strCategory}
            </button>
          );
        })}
    </div>
  );
}

FilterCategory.propTypes = {
  drink: PropTypes.bool,
}.isRequired;
