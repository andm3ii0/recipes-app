import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/unliked.svg';
import blackHeartIcon from '../../images/liked.svg';
import share from '../../images/share.svg';
import Context from '../../Context/Context';

function FoodHeaderDetails({ details, match }) {
  const {
    shareButtonClick,
    isFavorite,
    favoriteButtonClick,
    setIsFavorite,
    showCopied,
  } = useContext(Context);

  useEffect(() => {
    const favoriteArray = localStorage.getItem('favoriteRecipes');

    if (favoriteArray !== null) {
      setIsFavorite(favoriteArray.includes(details.idMeal));
    }
  }, []);

  const objShape = {
    alcoholicOrNot: '',
    category: details.strCategory,
    id: details.idMeal,
    image: details.strMealThumb,
    name: details.strMeal,
    nationality: details.strArea,
    type: 'food',
  };
  return (
    <div className="recipe-details-header">
      <img
        src={ details.strMealThumb }
        alt={ details.strMeal }
        data-testid="recipe-photo"
      />
      <div className="recipe-details-header-title">
        <div>
          <h1 data-testid="recipe-title">{details.strMeal}</h1>
        </div>
        {showCopied && <p className="copied-message">Link copied!</p>}
        <div className="recipe-details-header-buttons">
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
            <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="heart" />
          </button>
        </div>
      </div>
      <h2 data-testid="recipe-category">{details.strCategory}</h2>
    </div>
  );
}

FoodHeaderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
    url: PropTypes.string,
  }).isRequired,
  details: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strArea: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
};

export default FoodHeaderDetails;
