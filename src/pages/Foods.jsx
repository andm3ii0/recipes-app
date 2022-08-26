import React, { useContext } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Context from '../Context/Context';
import Recipes from '../components/Recipes/Recipes';

export default function Foods() {
  const indexLimit = 12;
  const { searchResult } = useContext(Context);
  return (
    <div className="bg-image">
      <div className="bg-blur">
        <div>
          <Header pageTitle="Foods" />

          { searchResult.length > 0 ? searchResult
            .map(({ idMeal, strMeal, strMealThumb }, index) => index < indexLimit && (
              <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <h3 data-testid={ `${index}-card-name` }>{ strMeal }</h3>
              </div>
            )) : <Recipes /> }
        </div>
      </div>
      <Footer />
    </div>
  );
}
