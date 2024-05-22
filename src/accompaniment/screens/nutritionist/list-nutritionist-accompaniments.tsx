import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
import { Wrapper } from '../../../resident/screens/resident/resident.styles';
import { ApplicationContext } from '../../../application-context';
import { ObjectionAccompanimentService } from '../../services/objection/objection-accompaniment-service';
import { type Accompaniment } from '../../entities/accompaniment';
import { noop } from 'lodash';
import { Button } from '../../../medicine/screens/medicine.styles';
import { AccompanimentTableContainer } from '../../components/accompaniment-table/accompaniment-table.container';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/slices/loadingSlice';
import { useNavigate } from 'react-router-dom';

export const ListNutritionistAccompaniments = (): ReactElement => {
  const navigate = useNavigate();
  const { httpClient } = useContext(ApplicationContext);
  const [accompaniments, setAccompaniments] = useState<Accompaniment[]>([]);
  const dispatch = useDispatch();

  const handleNavigate = useCallback((id: string) => {
    const route = `/NUTRITIONIST/formulario/${id}`;
    navigate(route);
  }, []);

  const getDetailedAccompaniment = useCallback(async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      const response: Accompaniment[] =
        await new ObjectionAccompanimentService().getAllResidentsHasAccompaniments(
          httpClient,
          'NUTRITIONIST',
        );
      setAccompaniments(response);
    } catch (error) {
      console.error('Erro ao obter os acompanhamentos:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  useEffect(() => {
    getDetailedAccompaniment().catch(noop);
  }, []);

  const role = useMemo(() => {
    return localStorage.getItem('role');
  }, []);

  const canCreateNutritionistAccompaniment = useMemo(() => {
    return role === 'Nutricionista';
  }, [role]);

  return (
    <Wrapper>
      <AccompanimentTableContainer
        accompaniments={accompaniments}
        type="NUTRITIONIST"
        navigate={handleNavigate}
      />
      {canCreateNutritionistAccompaniment && (
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
