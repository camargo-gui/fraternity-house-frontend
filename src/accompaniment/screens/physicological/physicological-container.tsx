import { useState, type ReactElement } from 'react';
import { ListPhysicologicalAccompaniments } from './list-physicological-accompaniments';
import { AccompanimentScreenForm } from '../accompaniment-screen-form/accompaniment-screen-form';

export const PhysicologicalContainer = (): ReactElement => {
  const [screen, setScreen] = useState(true);
  return (
    <>
      {screen ? (
        <ListPhysicologicalAccompaniments setScreen={setScreen} />
      ) : (
        <AccompanimentScreenForm setScreen={setScreen} type="PSYCHOLOGIST" />
      )}
    </>
  );
};
