import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
import { useNavigate } from 'react-router-dom';

export const ListPhysicologicalAccompaniments = (): ReactElement => {
  const navigate = useNavigate();
  const { httpClient } = useContext(ApplicationContext);
  const [accompaniments, setAccompaniments] = useState<Accompaniment[]>([]);
  const dispatch = useDispatch();

  const handleNavigate = useCallback((id: string) => {
    const route = `/PSYCHOLOGIST/formulario/${id}`;
    navigate(route);
  }, []);

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

  const role = useMemo(() => {
    return localStorage.getItem('role');
  }, []);

  const canCreatePhysicologicalAccompaniment = useMemo(() => {
    return role === 'Psicologo';
  }, [role]);

  return (
    <Wrapper>
      <AccompanimentTableContainer
        accompaniments={accompaniments}
        type="PSYCHOLOGIST"
        navigate={handleNavigate}
      />
      {canCreatePhysicologicalAccompaniment && (
        <Button
          onClick={() => {
            handleNavigate('novo');
          }}
          text="Novo Acompanhamento"
          width="250px"
        />
      )}
    </Wrapper>
  );
};
