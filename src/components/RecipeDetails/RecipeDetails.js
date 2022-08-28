import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FoodHeaderDetails from '../FoodHeaderDetails/FoodHeaderDetails';
import DrinkHeaderDetails from '../DrinkHeaderDetails/DrinkHeaderDetails';
import requestDetails from '../../services/requestDetais';
import videoId from '../../services/youtubeVideoID';
import requestRecomendation from '../../services/requestRecomendation';

import './recipesDetails.css';
import RecipeCard from '../RecipeCard/RecipeCard';

function RecipeDetails({ match }) {
  const [typePage, setTypePage] = useState('');
  const [details, setDeatils] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [recomendation, setRecomendation] = useState([1]);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    requestDetails(setDeatils, setTypePage, setIngredientList, match);
    const doneRecipesArray = localStorage.getItem('doneRecipes');
    const inProgresArray = localStorage.getItem('inProgressRecipes');

    if (doneRecipesArray !== null) {
      setDoneRecipe(doneRecipesArray.includes(match.params.id));
    }
    if (inProgresArray !== null) {
      setInProgress(inProgresArray.includes(match.params.id));
    }

    if (match.url.includes('food')) {
      const endPointDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      requestRecomendation(setRecomendation, endPointDrink, 'drinks');
    }
    if (match.url.includes('drink')) {
      const endPointMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      requestRecomendation(setRecomendation, endPointMeal, 'meals');
    }
  }, [match]);

  const history = useHistory();

  return (
    <main className="recipe-details">
      {typePage === 'food' && <FoodHeaderDetails details={ details } match={ match } />}
      {typePage === 'drink' && <DrinkHeaderDetails details={ details } match={ match } />}
      <div className="recipe-content">
        <div className="ingredients">
          <div>
            <p>Ingredients</p>
            <ul className="ingredinents">
              {ingredientList.map((ingredient, index) => {
                const condicao = ingredient !== 'null - null'
                  && !(ingredient === ' - ' || ingredient === '  - ');
                return (
                  condicao && (
                    <li
                      key={ ingredient }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {ingredient}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
        <div className="instructions">
          <div>
            <p className="title">instructions</p>
            <p data-testid="instructions-p">{details.strInstructions}</p>
          </div>
        </div>
      </div>
      {typePage === 'food' && (
        <div className="video-content">
          <p>Video</p>
          <div className="video">
            <iframe
              data-testid="video"
              title={ details.strMeal }
              src={ `https://www.youtube.com/embed/${videoId(details.strYoutube)}` }
            />
          </div>
        </div>
      )}
      <ul className="recomendationList">
        {recomendation.map(
          (item, index) => index < +'6' && (
            <li
              className="recomendationItemList"
              key={ `${index}-recomendation-card` }
              data-testid={ `${index}-recomendation-card` }
            >
              <RecipeCard
                key={ index }
                recipe={ item }
                index={ index }
                drink={ typePage !== 'drink' }
              />
              {/* {typePage === 'food' && (
                <p data-testid={ `${index}-recomendation-title` }>
                  {item.strDrink}
                </p>
              )}
              {typePage === 'drink' && (
                <p data-testid={ `${index}-recomendation-title` }>
                  {item.strMeal}
                </p>
              )} */}
            </li>
          ),
        )}
      </ul>
      {!doneRecipe && (
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${match.url}/in-progress`) }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
    url: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
