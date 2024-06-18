import {
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactElement,
} from 'react';
import { Button, Wrapper } from '../../../medicine/screens/medicine.styles';
import { noop } from 'lodash';
import { FormInput } from '../../../common/components/form-input/form-input';
import { type Resident } from '../../../resident/entities/resident';
import { ObjectionResidentService } from '../../../resident/services/objection/objection-resident-service';
import { ApplicationContext } from '../../../application-context';
import { ObjectionAccompanimentService } from '../../services/objection/objection-accompaniment-service';
import { AlignButtons } from './accompaniment-screen-form.styles';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../common/components/loading-spinner/loading-spinner';
import { AccompanimentStatusModal } from '../accompaniment-status-modal/accompaniment-status-modal';
import { AccompanimentStatusEnum } from '../../entities/accompaniment-status';

export const AccompanimentScreenForm = (): ReactElement => {
  const navigate = useNavigate();
  const { httpClient } = useContext(ApplicationContext);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedResident, setSelectedResident] = useState<
    Resident | undefined
  >(undefined);
  const link = window.location.href.split('/');
  const residentId = link.pop() ?? '';
  const type: 'NUTRITIONIST' | 'PSYCHOLOGIST' | 'PHYSIOTHERAPIST' =
    (link[link.length - 2] as
      | 'NUTRITIONIST'
      | 'PSYCHOLOGIST'
      | 'PHYSIOTHERAPIST') ?? '';
  const getAccompanimentTranslation = (typeOriginal: string): string => {
    if (typeOriginal === 'PSYCHOLOGIST') return 'Psicológico';
    else if (typeOriginal === 'PHYSIOTHERAPIST') return 'Físico';
    else return 'Nutricional';
  };
  const translatedType = getAccompanimentTranslation(type);
  const [accompanimentStatus, setAccompanimentStatus] = useState(
    AccompanimentStatusEnum.Undefined,
  );
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    setShowStatusModal(true);
  };

  const getAllResidents = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response: Resident[] | undefined =
        await new ObjectionResidentService().getAllResidents(httpClient);
      if (response !== undefined) {
        setResidents(response);
      }
    } catch (error) {
      console.error('Erro ao obter os moradores:', error);
    } finally {
      setIsLoading(false);
    }
  }, [httpClient]);

  const createAccompaniment = useCallback(
    async (status: AccompanimentStatusEnum): Promise<void> => {
      try {
        setSelectedResident(undefined);
        setIsLoading(true);
        setDescription('');
        await new ObjectionAccompanimentService().createAccompaniment(
          httpClient,
          {
            description,
            residentId: selectedResident?.id ?? 0,
            type,
          },
          status,
        );
      } catch (error) {
        console.error('Erro ao criar o acompanhamento no form:', error);
      } finally {
        setIsLoading(false);
        setAccompanimentStatus(AccompanimentStatusEnum.Undefined);
      }
    },
    [httpClient, description, selectedResident, type, accompanimentStatus],
  );

  useEffect(() => {
    getAllResidents().catch(noop);
  }, []);

  useEffect(() => {
    if (residentId === 'novo') return;
    const foundResident = residents.find(
      (resident) => resident.id === Number(residentId),
    );
    setSelectedResident(foundResident);
  }, [residents, residentId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleStatusSelection = async (
    status: AccompanimentStatusEnum,
  ): Promise<void> => {
    await createAccompaniment(status);
    setShowStatusModal(false);
    navigate(`/${type}`);
  };

  return (
    <>
      <Wrapper>
        <FormInput
          id="name"
          label="Nome"
          placeholder="Nome"
          value={localStorage.getItem('name') ?? ''}
          disabled={true}
          onChange={noop}
          type="text"
        />
        <FormInput
          id="resident"
          label="Selecione o morador"
          type="select"
          disabled={residentId !== 'novo'}
          value={selectedResident?.id?.toString() ?? ''}
          options={residents.map((resident) => ({
            value: String(resident.id),
            label: resident.name,
          }))}
          onChange={(e) => {
            const target = e.target as HTMLSelectElement;
            const selectedId = Number(target.value);
            const foundResident = residents.find(
              (resident) => resident.id === selectedId,
            );
            setSelectedResident(foundResident);
          }}
        />

        <FormInput
          id="type"
          label="Tipo de Acompanhamento"
          type="text"
          value={translatedType}
          disabled={true}
          onChange={noop}
        />
        <FormInput
          id="description"
          label="Digite aqui a descrição do acompanhamento"
          type="textarea"
          value={description}
          placeholder="Descrição"
          onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setDescription(target.value);
          }}
        />
        <AlignButtons>
          <Button
            text="Cadastrar Acompanhamento"
            onClick={() => {
              handleSubmit().catch(noop);
            }}
            width="300px"
          />
          <Button
            text="Voltar"
            onClick={() => {
              navigate(`/${type}`);
            }}
            backgroundColor="#6c757d"
          />
        </AlignButtons>
      </Wrapper>
      {showStatusModal && (
        <AccompanimentStatusModal
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          setAccompanimentStatus={handleStatusSelection}
        />
      )}
    </>
  );
};
