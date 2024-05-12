import { useState, type ReactElement } from 'react';
import { ListNutritionistAccompaniments } from './list-nutritionist-accompaniments';
import { AccompanimentScreenForm } from '../accompaniment-screen-form/accompaniment-screen-form';

export const NutritionistContainer = (): ReactElement => {
  const [screen, setScreen] = useState(true);
  return (
    <>
      {screen ? (
        <ListNutritionistAccompaniments setScreen={setScreen} />
      ) : (
        <AccompanimentScreenForm setScreen={setScreen} type="NUTRITIONIST" />
      )}
    </>
  );
};
