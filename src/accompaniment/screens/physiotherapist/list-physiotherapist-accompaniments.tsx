import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactElement,
} from 'react';
import { Button } from '../../../medicine/screens/medicine.styles';
import { ApplicationContext } from '../../../application-context';
import { type Accompaniment } from '../../entities/accompaniment';
import { ObjectionAccompanimentService } from '../../services/objection/objection-accompaniment-service';
import { noop } from 'lodash';
import { Wrapper } from '../../../resident/screens/resident/resident.styles';
import { AccompanimentTableContainer } from '../../components/accompaniment-table/accompaniment-table.container';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/slices/loadingSlice';

interface Props {
  setScreen: (screen: boolean) => void;
}

export const ListPhysiotherapistAccompaniments = ({
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
          'PHYSIOTHERAPIST',
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
        type="PHYSIOTHERAPIST"
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
