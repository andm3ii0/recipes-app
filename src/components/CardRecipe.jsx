import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import whiteHeartIcon from '../images/unliked.svg';
import blackHeartIcon from '../images/liked.svg';
import share from '../images/share.svg';
import './cardRecipe.css';

function CardRecipe({
  src,
  name,
  date,
  index,
  category,
  tags,
  type,
  alcoholicOrNot,
  nationality,
  id,
  typePage,
}) {
  const {
    showCopied,
    shareButtonClick,
    favoriteButtonClick,
    idCopied,
    isFavorite,
    setIsFavorite,
  } = useContext(Context);

  useEffect(() => {
    const favoriteArray = localStorage.getItem('favoriteRecipes');

    if (favoriteArray !== null) {
      setIsFavorite(favoriteArray.includes(id));
    }
  }, []);

  const objShape = {
    alcoholicOrNot,
    category,
    id,
    image: src,
    name,
    nationality,
    type,
  };
  const history = useHistory();
  const redirectToRecipePage = () => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div className="card-recipe">
      <div
        role="button"
        onClick={ redirectToRecipePage }
        onKeyDown={ redirectToRecipePage }
        tabIndex={ 0 }
        data-testid={ `${index}-horizontal-image` }
        src={ src }
      >
        <img className="img" src={ src } alt={ name } />
      </div>
      <div className="card-recipe-info">
        <div>
          {type === 'food' && (
            <h2 data-testid={ `${index}-horizontal-top-text` }>
              {`${nationality} - ${category}`}
            </h2>
          )}
          {type === 'drink' && (
            <h2 data-testid={ `${index}-horizontal-top-text` }>
              {alcoholicOrNot}
            </h2>
          )}
          <div
            role="button"
            onClick={ redirectToRecipePage }
            onKeyDown={ redirectToRecipePage }
            tabIndex={ 0 }
            data-testid={ `${index}-horizontal-name` }
          >
            <h1>{name}</h1>
          </div>
          <p className="data" data-testid={ `${index}-horizontal-done-date` }>
            Done in:
            {' '}
            {date}
          </p>
        </div>
        {showCopied && idCopied === id && (
          <p className="copied-message">Link copied!</p>
        )}
        <div className="tags-buttons">
          <div className="tags">
            {typePage !== 'favorite'
              && tags.map((tagName) => (
                <p
                  className="tag"
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                  key={ `${index}-${tagName}` }
                >
                  {tagName}
                </p>
              ))}
          </div>
          <div className="recipe-details-header-buttons">
            <button
              data-testid="share-btn"
              type="button"
              onClick={ () => shareButtonClick({ url: `/${typePage}/${id}` }) }
            >
              <img src={ share } alt="heart" />
            </button>
            <button
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              data-testid="favorite-btn"
              type="button"
              onClick={ () => favoriteButtonClick(objShape, id) }
            >
              <img src={ blackHeartIcon } alt="heart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CardRecipe.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
  index: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  typePage: PropTypes.string.isRequired,
};

CardRecipe.defaultProps = {
  date: '',
  tags: [],
};

export default CardRecipe;
