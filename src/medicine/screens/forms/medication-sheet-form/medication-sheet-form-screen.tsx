import { useEffect, useState, type ReactElement } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ConfirmationModal } from '../../../../common/components/confirmation-modal/confirmation-modal';
import { FormInput } from '../../../../common/components/form-input/form-input';
import { type ResidentDTO } from '../../../../resident/dto/resident-dto';
import type { Medicine } from '../../../entities/medicine';
import { Button, ButtonGroup, WrapperSheet } from '../../medicine.styles';
import { Row } from './medication-sheet-form-screen.styles';
import {
  EMPTY_RECORD,
  MedicationSheetTable,
  type MedicationRecord,
} from './medication-sheet-table/medication-sheet-table';

interface Props {
  changeScreen: () => void;
  goToMedicineList: () => void;
  medicines: Medicine[];
  residents: ResidentDTO[];
  handleSubmit: () => Promise<void>;
  submitting: boolean;
  medicationRecords: MedicationRecord[];
  setMedicationRecords: (records: MedicationRecord[]) => void;
  medicationRecord: MedicationRecord;
  setMedicationRecord: (record: MedicationRecord) => void;
  resident: ResidentDTO | null;
  setResident: (resident: ResidentDTO | null) => void;
  description: string;
  setDescription: (description: string) => void;
  selectedResidentId: number | null;
}

export const MedicationSheetFormScreen = ({
  changeScreen,
  goToMedicineList,
  medicines,
  residents,
  handleSubmit,
  submitting,
  medicationRecords,
  setMedicationRecords,
  medicationRecord,
  setMedicationRecord,
  resident,
  setResident,
  description,
  setDescription,
  selectedResidentId,
}: Props): ReactElement => {
  const [showModal, setShowModal] = useState(false);
  const [pendingResidentId, setPendingResidentId] = useState<string | null>(
    null,
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedResidentId) {
      const foundResident = residents.find(
        (r) => Number(r.id) === selectedResidentId,
      );
      if (foundResident) {
        setResident(foundResident);
      }
    } else {
      setResident(null);
    }
  }, [residents, selectedResidentId, setResident]);

  const handleResidentChange = (newResidentId: string): void => {
    if (medicationRecords.length > 0 && newResidentId !== resident?.id) {
      setShowModal(true);
      setPendingResidentId(newResidentId);
    } else {
      updateResident(newResidentId);
    }
  };

  const updateResident = (residentId: string): void => {
    const newResident = residents.find((r) => r.id?.toString() === residentId);
    setResident(newResident ?? null);
    setShowModal(false);
    setPendingResidentId(null);
  };

  const handleConfirmChangeResident = (): void => {
    if (pendingResidentId != null) {
      updateResident(pendingResidentId);
      setMedicationRecords([]);
      setMedicationRecord(EMPTY_RECORD);
      setDescription('');
    }
  };

  const isFormValid = (record: MedicationRecord): boolean => {
    return (
      resident !== null &&
      record.medicine !== '' &&
      record.dosage !== '' &&
      record.firstHour !== '' &&
      record.frequency !== '' &&
      record.startDate !== '' &&
      record.endDate !== ''
    );
  };

  const handleEdit = (index: number): void => {
    const record = medicationRecords.find((med) => med.id === index);
    if (record != null) {
      setMedicationRecord({
        ...record,
        medicineId: record.medicineId,
      });
    }

    setEditingIndex(index);
  };

  const handleAddOrUpdateRecord = (): void => {
    if (isFormValid(medicationRecord)) {
      const formattedMedicineName = medicationRecord.medicine.includes('(')
        ? medicationRecord.medicine
        : `${medicationRecord.medicine} (${medicationRecord.dosage})`;
      const newRecord = {
        ...medicationRecord,
        id: Math.floor(Math.random() * 1000),
        resident: resident?.name ?? '',
        medicine: formattedMedicineName,
      };

      if (editingIndex !== null) {
        const updatedRecords = medicationRecords.map((record) => {
          if (record.id === editingIndex) {
            return newRecord;
          }
          return record;
        });
        setMedicationRecords(updatedRecords);
        setEditingIndex(null);
      } else {
        setMedicationRecords([...medicationRecords, newRecord]);
      }

      setMedicationRecord(EMPTY_RECORD);
    } else {
      alert('Por favor preencha todos os campos');
    }
  };

  const handleDelete = (index: number): void => {
    const updatedRecords = medicationRecords.filter(
      (record) => record.id !== index,
    );
    setMedicationRecords(updatedRecords);
  };

  const handleMedicineChange = (selectedMedicineId: string): void => {
    const selectedMedicine: Medicine | undefined = medicines.find(
      (medicine) => medicine.id.toString() === selectedMedicineId,
    );
    if (selectedMedicine != null) {
      setMedicationRecord({
        ...medicationRecord,
        medicine: selectedMedicine.name,
        medicineId: selectedMedicine.id,
        pharmaceuticalForm: selectedMedicine.PharmacologicalForm.name,
        pharmacologicalName: selectedMedicine.PharmacologicalName.name,
      });
    }
  };

  function renderAddRegisterButton(): ReactElement {
    return (
      <ButtonGroup
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '50px',
        }}
      >
        <div>
          <Button
            text={editingIndex !== null ? 'Atualizar' : 'Adicionar'}
            onClick={handleAddOrUpdateRecord}
            backgroundColor="#91CDA2"
            hoverBackgroundColor="#8ac39a"
            color="#000"
            leadingIcon={
              editingIndex !== null ? <></> : <FaPlus width={12} height={12} />
            }
            width="auto"
          />
        </div>
      </ButtonGroup>
    );
  }

  function renderSubmitButtonGroup(): ReactElement {
    return (
      <ButtonGroup>
        <div>
          <Button
            text={selectedResidentId ? 'Atualizar Ficha' : 'Cadastrar Ficha'}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              await handleSubmit();
            }}
            width="auto"
            isLoading={submitting}
            isDisabled={submitting || medicationRecords.length === 0}
          />
          <Button
            text="Listar Fichas"
            onClick={changeScreen}
            backgroundColor="#6c757d"
            hoverBackgroundColor="#595f64"
            width="auto"
          />
        </div>
        <div className="ms-auto">
          <Button
            text="Gerenciar Medicamento"
            onClick={goToMedicineList}
            backgroundColor="#413dca"
            hoverBackgroundColor="#3a37b3"
            width="auto"
          />
        </div>
      </ButtonGroup>
    );
  }

  return (
    <WrapperSheet>
      <div>
        <FormInput
          id="resident"
          label="Morador"
          placeholder={'Selecione o morador'}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            handleResidentChange(target.value);
          }}
          type="select"
          options={residents?.map((resident) => ({
            label: resident.name ?? '',
            value: resident.id ?? '',
          }))}
          value={resident?.id ?? ''}
          style={{
            margin: '0 0 20px 0',
          }}
          disabled={selectedResidentId !== null}
          required
        />
        <Row>
          <div style={{ margin: '0 20px 0 0' }}>
            <FormInput
              id="medicine"
              label="Medicamento"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                handleMedicineChange(target.value);
              }}
              type="select"
              options={medicines.map((medicine) => ({
                label: medicine.name,
                value: medicine.id,
              }))}
              value={medicationRecord.medicineId ?? ''}
              required
            />
          </div>

          <div style={{ margin: '0 20px 0 0' }}>
            <FormInput
              id="pharmaceutical-form"
              label="Forma farmacêutica"
              placeholder="Forma farmacêutica"
              value={medicationRecord.pharmaceuticalForm}
              disabled={true}
              type="text"
              onChange={() => {}}
            />
          </div>
          <div style={{ margin: '0 20px 0 0' }}>
            <FormInput
              id="pharmacological-name"
              label="Nome farmacológico"
              placeholder="Nome farmacológico"
              value={medicationRecord.pharmacologicalName}
              disabled={true}
              type="text"
              onChange={() => {}}
            />
          </div>

          <FormInput
            id="dosage"
            label="Dosagem (mg, ml, etc)"
            placeholder="Dosagem (mg, ml, etc)"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setMedicationRecord({
                ...medicationRecord,
                dosage: target.value,
              });
            }}
            type="text"
            value={medicationRecord.dosage}
            required
          />
        </Row>

        <Row>
          <div style={{ margin: '0 20px 0 0' }}>
            <FormInput
              id="first-hour"
              label="Primeiro horário"
              type="time"
              placeholder="Primeiro horário"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setMedicationRecord({
                  ...medicationRecord,
                  firstHour: target.value,
                });
              }}
              value={medicationRecord.firstHour}
              required
            />
          </div>
          <div style={{ margin: '0 20px 0 0' }}>
            <FormInput
              id="frequency"
              label="Frequência (8/8h, 12/12h, 24/24h)"
              placeholder="Frequência (8/8h, 12/12h, 24/24h)"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setMedicationRecord({
                  ...medicationRecord,
                  frequency: target.value,
                });
              }}
              type="number"
              value={medicationRecord.frequency}
              required
            />
          </div>
          <div style={{ margin: '0 20px 0 0' }}>
            <FormInput
              id="start-date"
              label="Data de início"
              type="date"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setMedicationRecord({
                  ...medicationRecord,
                  startDate: target.value,
                });
              }}
              value={medicationRecord.startDate}
              required
            />
          </div>
          <FormInput
            id="end-date"
            label="Data de término"
            type="date"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setMedicationRecord({
                ...medicationRecord,
                endDate: target.value,
              });
            }}
            value={medicationRecord.endDate}
            required
          />
        </Row>

        {renderAddRegisterButton()}

        <MedicationSheetTable
          records={medicationRecords}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        {selectedResidentId === null && (
          <FormInput
            id="medical-prescription"
            label="Informações adicionais para ficha (opcional)"
            placeholder="Informações adicionais para ficha (opcional)"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setDescription(target.value);
            }}
            value={description}
            type="textarea"
            height="50px"
          />
        )}
      </div>

      {renderSubmitButtonGroup()}

      <ConfirmationModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        onConfirm={handleConfirmChangeResident}
        title="Confirmar Mudança de Morador"
        body="Você tem alterações não salvas para o morador atual. Deseja descartá-las e mudar o morador?"
      />
    </WrapperSheet>
  );
};
