import { useContext, useEffect, useState, type ReactElement } from 'react';
import { ApplicationContext } from '../../../application-context';
import { type Resident } from '../../entities/resident';
import { useResident } from '../../hooks/use-resident';
import { ObjectionResidentService } from '../../services/objection/objection-resident-service';
import { ResidentScreenForm } from './forms/resident-screen-form';
import { ResidentList } from './lists/resident-list-screen';
import LoadingSpinner from '../../../common/components/loading-spinner/loading-spinner';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ConfirmationModal } from '../../../common/components/confirmation-modal/confirmation-modal';
import { noop } from 'lodash';
import { ChecklistReportScreen } from '../../components/checklist-report/checklist-report-screen';
import { ViewModal } from '../../../common/components/view-modal/view-modal';
import { type DataToSend } from '../../entities/data-to-send';

enum Screen {
  Register = 'Register',
  List = 'List',
  Screening = 'Screening',
}

export const ResidentContainer = (): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showReportModal, setShowReportModal] = useState<string>();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [screen, setScreen] = useState<Screen>(Screen.List);
  const { residents, refetch, isLoading } = useResident({ httpClient });
  const residentService = new ObjectionResidentService();

  const [showUndeleteModal, setShowUndeleteModal] = useState<boolean>(false);
  const [residentToUndelete, setResidentToUndelete] =
    useState<Resident | null>();

  async function handleSubmit(resident: Resident): Promise<void> {
    setIsSubmitting(true);
    if (isEditing && editingResident !== null) {
      await residentService.updateResident(httpClient, resident, selectedFile);
      void refetch();
    } else {
      try {
        await residentService.postResident(httpClient, resident, selectedFile);
        void refetch();
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 409) {
          setResidentToUndelete(
            error.response.data.resident as Resident | null,
          );
          setShowUndeleteModal(true);
        }
      }
    }
    setIsSubmitting(false);
  }

  async function onUndelete(): Promise<void> {
    if (residentToUndelete) {
      await residentService.undeleteResident(
        httpClient,
        residentToUndelete.cpf,
      );
      void refetch();
      setShowUndeleteModal(false);
      setScreen(Screen.List);
    }
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
      await residentService.deleteResident(httpClient, selectedResident.cpf);
      void refetch();
    }
  }

  async function handleReport(options: DataToSend): Promise<void> {
    try {
      setIsSubmitting(true);
      await residentService.sendReport(options, httpClient);
      setIsSubmitting(false);
      setShowReportModal(undefined);
    } catch (e) {
      console.log(e);
    }
  }

  const onScreening = (id: string): void => {
    navigate(`/fichas/triagem/${id}`);
  };

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const changeScreen = (): void => {
    setScreen(screen === Screen.Register ? Screen.List : Screen.Register);
    setIsEditing(false);
    setEditingResident(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return screen === Screen.Register ? (
    <>
      <ResidentScreenForm
        changeScreen={changeScreen}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        editingResident={editingResident}
        isEditing={isEditing}
        setSelectedFile={setSelectedFile}
        setEditingResident={setEditingResident}
      />
      <ConfirmationModal
        title="Morador já cadastrado"
        body={`Morador: ${residentToUndelete?.name} CPF: ${residentToUndelete?.cpf} já cadastrado no sistema.\n  Deseja reativá-lo?`}
        show={showUndeleteModal}
        isLoading={isSubmitting}
        isConfirmation={true}
        onConfirm={() => {
          onUndelete().catch(noop);
        }}
        onHide={() => {
          setShowUndeleteModal(false);
        }}
      />
    </>
  ) : (
    <>
      <ResidentList
        changeScreen={changeScreen}
        residents={residents}
        onEdit={onEdit}
        onDelete={onDelete}
        onScreening={onScreening}
        handleReport={(id: string) => {
          setShowReportModal(id);
        }}
      />
      <ViewModal
        show={showReportModal !== undefined}
        children={
          <ChecklistReportScreen
            resident={residents?.find((r) => showReportModal === String(r.id))}
            onSubmit={handleReport}
            isLoading={isSubmitting}
          />
        }
        onHide={() => {
          setShowReportModal(undefined);
        }}
        size="xl"
        title="Selecione os campos para o relatório"
      />
    </>
  );
};
