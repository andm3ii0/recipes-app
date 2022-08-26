import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
// import whiteHeartIcon from '../../images/unliked.svg';
// import blackHeartIcon from '../../images/liked.svg';
// import share from '../../images/share.svg';
// import Context from '../../Context/Context';
import './recipeCard.css';

export default function RecipeCard({ recipe, index, drink }) {
  const history = useHistory();
  // const {
  //   shareButtonClick,
  //   isFavorite,
  //   favoriteButtonClick,
  //   setIsFavorite,
  //   showCopied,
  // } = useContext(Context);

  // useEffect(() => {
  //   const favoriteArray = localStorage.getItem('favoriteRecipes');

  //   if (favoriteArray !== null) {
  //     setIsFavorite(favoriteArray.includes(recipe.idDrink));
  //   }
  // }, []);

  // const objShape = {
  //   alcoholicOrNot: recipe.strAlcoholic,
  //   category: recipe.strCategory,
  //   id: recipe.idDrink,
  //   image: recipe.strDrinkThumb,
  //   name: recipe.strDrink,
  //   nationality: '',
  //   type: 'drink',
  // };

  if (drink) {
    console.log(recipe);
    return (
      <div
        className="main-card-recipe"
        onClick={ () => history.push(`/drinks/${recipe.idDrink}`) }
        role="button"
        tabIndex={ 0 }
        onKeyDown={ () => history.push(`/drinks/${recipe.idDrink}`) }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrink }
          width="150"
        />

        <div className="main-card-recipe-footer">
          <h3 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h3>
          {/* {showCopied && <p className="copied-message">Link copied!</p>}
          <div className="main-recipe-card-buttons">
            <button
              data-testid="share-btn"
              type="button"
              onClick={ () => shareButtonClick(match) }
            >
              <img src={ share } alt="heart" />
            </button>
            <button
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              data-testid="favorite-btn"
              type="button"
              onClick={ () => favoriteButtonClick(objShape, match.params.id) }
            >
              <img
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                alt="heart"
              />
            </button>
          </div> */}
        </div>
      </div>
    );
  }
  return (
    <div
      className="main-card-recipe"
      onClick={ () => history.push(`/foods/${recipe.idMeal}`) }
      role="button"
      tabIndex={ 0 }
      onKeyDown={ () => history.push(`/foods/${recipe.idMeal}`) }
    >
      <div>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
          width="150"
        />
      </div>
      <div className="main-card-recipe-footer">
        <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
        {/* {showCopied && <p className="copied-message">Link copied!</p>}
        <div className="main-recipe-card-buttons">
          <button
            data-testid="share-btn"
            type="button"
            onClick={ () => shareButtonClick(match) }
          >
            <img src={ share } alt="heart" />
          </button>
          <button
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            data-testid="favorite-btn"
            type="button"
            onClick={ () => favoriteButtonClick(objShape, match.params.id) }
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="heart"
            />
          </button>
        </div> */}
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
  drink: PropTypes.bool,
}.isRequired;
