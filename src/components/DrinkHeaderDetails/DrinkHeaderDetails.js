import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/unliked.svg';
import blackHeartIcon from '../../images/liked.svg';
import share from '../../images/share.svg';
import Context from '../../Context/Context';

function DrinkHeaderDetails({ details, match }) {
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
      setIsFavorite(favoriteArray.includes(details.idDrink));
    }
  }, []);

  const objShape = {
    alcoholicOrNot: details.strAlcoholic,
    category: details.strCategory,
    id: details.idDrink,
    image: details.strDrinkThumb,
    name: details.strDrink,
    nationality: '',
    type: 'drink',
  };

  return (
    <div className="recipe-details-header">
      <img
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
        data-testid="recipe-photo"
      />
      <div className="recipe-details-header-title">
        <div>
          <h1 data-testid="recipe-title">{details.strDrink}</h1>
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
      <h2 data-testid="recipe-category">
        {details.strCategory}
        {' - '}
        {details.strAlcoholic}
      </h2>
    </div>
  );
}

DrinkHeaderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
    url: PropTypes.string,
  }).isRequired,
  details: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    idDrink: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkHeaderDetails;
