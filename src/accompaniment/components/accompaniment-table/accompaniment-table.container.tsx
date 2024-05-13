import {
  type ReactElement,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { ApplicationContext } from '../../../application-context';
import { ObjectionAccompanimentService } from '../../services/objection/objection-accompaniment-service';
import { AccompanimentTable } from './accompaniment-table';
import { type Accompaniment } from '../../entities/accompaniment';
import { noop } from 'lodash';

interface Props {
  type: 'PSYCHOLOGIST' | 'PHYSIOTHERAPIST' | 'NUTRITIONIST';
  accompaniments: Accompaniment[];
  setScreen: (screen: boolean) => void;
}

export const AccompanimentTableContainer = ({
  type,
  accompaniments,
  setScreen,
}: Props): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editDisabled, setEditDisabled] = useState<boolean>(true);
  const [modalState, setModalState] = useState<'TABLE' | 'DETAILED'>('TABLE');
  const [selectedResidentName, setSelectedResidentName] = useState('');
  const { httpClient } = useContext(ApplicationContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccompaniment, setSelectedAccompaniment] =
    useState<Accompaniment | null>(null);
  const [accompanimentsByResident, setAccompanimentsByResident] = useState<
    Accompaniment[] | null
  >(null);

  const handleOpenModal = (accompaniment: Accompaniment): void => {
    setSelectedResidentName(accompaniment.residentName);
    getAccompanimentByResident(accompaniment.id).catch(noop);
  };

  const handleCloseModal = (): void => {
    setSelectedAccompaniment(null);
    setShowModal(false);
    setModalState('TABLE');
    setEditDisabled(true);
  };

  const getAccompanimentByResident = useCallback(
    async (id: number): Promise<void> => {
      setIsLoading(true);
      try {
        const response: Accompaniment[] =
          await new ObjectionAccompanimentService().getAccompanimentByResident(
            httpClient,
            type,
            id,
          );
        setAccompanimentsByResident(response);
      } catch (error) {
        console.error('Erro ao obter os acompanhamentos:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [httpClient, type],
  );

  const updateAccompaniment = useCallback(
    async (id: number, newDescription: string): Promise<void> => {
      try {
        await new ObjectionAccompanimentService().updateAccompaniment(
          httpClient,
          id,
          newDescription,
        );
        setEditDisabled(true);
      } catch (error) {
        console.error('Erro ao atualizar o acompanhamento:', error);
      }
    },
    [httpClient],
  );

  useEffect(() => {
    if (accompanimentsByResident !== null) setShowModal(true);
  }, [accompanimentsByResident]);

  return (
    <AccompanimentTable
      handleOpenModal={handleOpenModal}
      updateAccompaniment={updateAccompaniment}
      selectedResidentName={selectedResidentName}
      setSelectedResidentName={setSelectedResidentName}
      accompanimentsByResident={accompanimentsByResident}
      accompaniments={accompaniments}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      selectedAccompaniment={selectedAccompaniment}
      setSelectedAccompaniment={setSelectedAccompaniment}
      modalState={modalState}
      setModalState={setModalState}
      editDisabled={editDisabled}
      setEditDisabled={setEditDisabled}
      isLoading={isLoading}
      setScreen={setScreen}
      type={type}
    />
  );
};
