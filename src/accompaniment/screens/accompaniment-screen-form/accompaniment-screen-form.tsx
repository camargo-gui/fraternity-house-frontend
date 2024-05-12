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

interface Props {
  setScreen: (screen: boolean) => void;
  type: 'PSYCHOLOGIST' | 'PHYSIOTHERAPIST' | 'NUTRITIONIST';
}

export const AccompanimentScreenForm = ({
  setScreen,
  type,
}: Props): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [description, setDescription] = useState<string>('');
  const [selectedResident, setSelectedResident] = useState<
    Resident | undefined
  >(undefined);
  const getAccompanimentTranslation = (typeOriginal: string): string => {
    if (typeOriginal === 'PSYCHOLOGIST') return 'Psicológico';
    else if (typeOriginal === 'PHYSIOTHERAPIST') return 'Físico';
    else return 'Nutricional';
  };
  const translatedType = getAccompanimentTranslation(type);

  const getAllResidents = useCallback(async (): Promise<void> => {
    try {
      const response: Resident[] | undefined =
        await new ObjectionResidentService().getAllResidents(httpClient);
      if (response !== undefined) {
        setResidents(response);
      }
    } catch (error) {
      console.error('Erro ao obter os moradores:', error);
    }
  }, [httpClient]);

  const createAccompaniment = useCallback(async (): Promise<void> => {
    try {
      setSelectedResident(undefined);
      setDescription('');
      await new ObjectionAccompanimentService().createAccompaniment(
        httpClient,
        {
          description,
          residentId: selectedResident?.id ?? 0,
          type,
        },
      );
    } catch (error) {
      console.error('Erro ao criar o acompanhamento no form:', error);
    }
  }, [httpClient, description, selectedResident, type]);

  useEffect(() => {
    getAllResidents().catch(noop);
  }, []);

  return (
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
        placeholder="RG"
        onChange={(e) => {
          const target = e.target as HTMLTextAreaElement;
          setDescription(target.value);
        }}
      />
      <AlignButtons>
        <Button
          text="Cadastrar Acompanhamento"
          onClick={() => {
            createAccompaniment().catch(noop);
          }}
          width="300px"
        />
        <Button
          text="Voltar"
          onClick={() => {
            setScreen(true);
          }}
          backgroundColor="#6c757d"
        />
      </AlignButtons>
    </Wrapper>
  );
};
