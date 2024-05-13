import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
import { useNavigate } from 'react-router-dom';

export const ListPhysiotherapistAccompaniments = (): ReactElement => {
  const navigate = useNavigate();
  const { httpClient } = useContext(ApplicationContext);
  const [accompaniments, setAccompaniments] = useState<Accompaniment[]>([]);
  const dispatch = useDispatch();

  const handleNavigate = useCallback((id: string) => {
    const route = `/PHYSIOTHERAPIST/formulario/${id}`;
    navigate(route);
  }, []);

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

  const role = useMemo(() => {
    return localStorage.getItem('role');
  }, []);

  const canCreatePhysiotherapistAccompaniment = useMemo(() => {
    return role === 'EducadorFisico';
  }, [role]);

  return (
    <Wrapper>
      <AccompanimentTableContainer
        accompaniments={accompaniments}
        type="PHYSIOTHERAPIST"
        navigate={handleNavigate}
      />
      {canCreatePhysiotherapistAccompaniment && (
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
