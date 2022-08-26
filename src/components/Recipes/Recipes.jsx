import PropTypes from 'prop-types';
import React, { useEffect, useContext } from 'react';
import Context from '../../Context/Context';
import fetchAPI from '../../services/fetchAPI';
import FilterCategory from '../FilterCategory/FilterCategory';
import RecipeCard from '../RecipeCard/RecipeCard';
import SearchBar from '../SearchBar/SearchBar';
import './recipes.css';

export default function Recipes({ drink = false }) {
  const { recipes, setRecipes, showSearchInput } = useContext(Context);

  useEffect(() => {
    if (drink) {
      return fetchAPI(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      ).then((data) => {
        setRecipes(data.drinks);
      });
    }
    fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=').then(
      (data) => {
        setRecipes(data.meals);
      },
    );
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {showSearchInput ? <SearchBar /> : <FilterCategory drink={ drink } />}
      <div className="manin-recipes-list">
        {recipes.map((element, index) => {
          if (index > +'11') return true;
          return (
            <RecipeCard
              key={ index }
              recipe={ element }
              index={ index }
              drink={ drink }
            />
          );
        })}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  drink: PropTypes.bool,
}.isRequired;
