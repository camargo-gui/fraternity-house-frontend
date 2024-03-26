import { useContext, useEffect, useState, type ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationContext } from '../../application-context';
import { type RootState } from '../../redux/store/store';
import { type ResidentDTO } from '../dto/resident-dto';
import { useResident } from '../hooks/use-resident';
import { ObjectionResidentService } from '../services/objection/objection-resident-service';
import { ResidentScreenForm } from './forms/resident-screen-form';
import { ResidentList } from './lists/resident-list-screen';

enum Screen {
  Register = 'Register',
  List = 'List',
}

export const ResidentContainer = (): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editingResident, setEditingResident] = useState<ResidentDTO | null>(
    null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [screen, setScreen] = useState<Screen>(Screen.List);
  const { residents, refetch } = useResident({ httpClient });
  const residentService = new ObjectionResidentService();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  async function handleSubmit(resident: ResidentDTO): Promise<void> {
    setIsSubmitting(true);

    if (isEditing && editingResident !== null) {
      await residentService.updateResident(httpClient, resident);
      void refetch();
    } else {
      await residentService.postResident(httpClient, resident, selectedFile);
      void refetch();
    }

    setIsSubmitting(false);
  }

  function onEdit(cpf: string): void {
    const selectedResident = residents?.find(
      (resident) => resident.cpf === cpf,
    );

    if (selectedResident !== undefined) {
      setEditingResident(selectedResident);
      setScreen(Screen.Register);
      setIsEditing(true);
    }
  }

  async function onDelete(cpf: string): Promise<void> {
    const selectedResident = residents?.find(
      (resident) => resident.cpf === cpf,
    );

    if (selectedResident !== undefined) {
      // await residentService.deleteResident(httpClient, selectedResident.cpf);
      void refetch();
    }
  }

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const changeScreen = (): void => {
    setScreen(screen === Screen.Register ? Screen.List : Screen.Register);
    setIsEditing(false);
    setEditingResident(null);
  };

  return screen === Screen.Register ? (
    <ResidentScreenForm
      changeScreen={changeScreen}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      editingResident={editingResident}
      isEditing={isEditing}
      setSelectedFile={setSelectedFile}
    />
  ) : (
    <ResidentList
      changeScreen={changeScreen}
      residents={residents}
      onEdit={onEdit}
      onDelete={onDelete}
      isLoading={isLoading}
    />
  );
};
