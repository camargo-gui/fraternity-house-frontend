import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactElement,
} from 'react';
import { Button } from '../../../medicine/screens/medicine.styles';
import { type Accompaniment } from '../../entities/accompaniment';
import { ObjectionAccompanimentService } from '../../services/objection/objection-accompaniment-service';
import { ApplicationContext } from '../../../application-context';
import { Wrapper } from '../../../resident/screens/resident/resident.styles';
import { noop } from 'lodash';
import { AccompanimentTableContainer } from '../../components/accompaniment-table/accompaniment-table.container';
import { setLoading } from '../../../redux/slices/loadingSlice';
import { useDispatch } from 'react-redux';

interface Props {
  setScreen: (screen: boolean) => void;
}

export const ListPhysicologicalAccompaniments = ({
  setScreen,
}: Props): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);
  const [accompaniments, setAccompaniments] = useState<Accompaniment[]>([]);
  const dispatch = useDispatch();

  const getDetailedAccompaniment = useCallback(async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      const response: Accompaniment[] =
        await new ObjectionAccompanimentService().getAllResidentsHasAccompaniments(
          httpClient,
          'PSYCHOLOGIST',
        );
      setAccompaniments(response);
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Erro ao obter os acompanhamentos:', error);
    }
  }, []);

  useEffect(() => {
    getDetailedAccompaniment().catch(noop);
  }, []);

  return (
    <Wrapper>
      <AccompanimentTableContainer
        accompaniments={accompaniments}
        type="PSYCHOLOGIST"
        setScreen={setScreen}
      />
      <Button
        onClick={() => {
          setScreen(false);
        }}
        text="Novo Acompanhamento"
        width="250px"
      />
    </Wrapper>
  );
};
