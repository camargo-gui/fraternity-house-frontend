import { useState, type ReactElement } from 'react';
import { ListPhysiotherapistAccompaniments } from './list-physiotherapist-accompaniments';
import { AccompanimentScreenForm } from '../accompaniment-screen-form/accompaniment-screen-form';

export const PhysiotherapistContainer = (): ReactElement => {
  const [screen, setScreen] = useState(true);
  return (
    <>
      {screen ? (
        <ListPhysiotherapistAccompaniments setScreen={setScreen} />
      ) : (
        <AccompanimentScreenForm setScreen={setScreen} type="PHYSIOTHERAPIST" />
      )}
    </>
  );
};
