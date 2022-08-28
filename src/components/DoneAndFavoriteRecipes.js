import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardRecipe from './CardRecipe';
import Context from '../Context/Context';
import icons from '../images/iconCategories';

export default function DoneAndfavoriteRecipes({ type }) {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const { isFavorite } = useContext(Context);

  useEffect(() => {
    if (type === 'done') {
      console.log('entrei');
      setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
      console.log(recipes);
    }
    if (type === 'favorite') {
      setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
      console.log(recipes);
    }
  }, [isFavorite]);

  const filterButtonClick = ({ target }) => {
    const { value } = target;
    setFilter(value);
  };

  return (
    <div>
      <div className="filter filter-favorite-done-recipes">
        <button
          value="all"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterButtonClick }
        >
          <img src={ icons.cutlery } alt="All" />
          All
        </button>
        <button
          value="food"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterButtonClick }
        >
          <img src={ icons.Beef } alt="All" />
          Food
        </button>
        <button
          value="drink"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterButtonClick }
        >
          <img src={ icons.drink } alt="All" />
          Drinks
        </button>
      </div>
      <div className="cards">
        {recipes && recipes
          .filter((recipe) => (filter === 'all' ? true : filter === recipe.type))
          .map((recipe, index) => (
            <CardRecipe
              key={ `${recipe.name}-${index}` }
              src={ recipe.image }
              name={ recipe.name }
              date={ recipe.doneDate }
              index={ index }
              category={ recipe.category }
              tags={ recipe.tags }
              type={ recipe.type }
              nationality={ recipe.nationality }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              id={ recipe.id }
              typePage={ type }
            />
          ))}
      </div>
    </div>
  );
}

DoneAndfavoriteRecipes.propTypes = {
  type: PropTypes.string.isRequired,
};
