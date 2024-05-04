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
  const [errors, setErrors] = useState({
    resident: '',
    medicine: '',
    dosage: '',
    firstTime: '',
    frequency: '',
    startDate: '',
    endDate: '',
  });

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

  useEffect(() => {
    if (medicationRecord.startDate) {
      if (
        new Date(medicationRecord.endDate) <
        new Date(medicationRecord.startDate)
      ) {
        setErrors({
          ...errors,
          endDate: 'Data fim não pode ser menor que a data inicial',
        });
      } else {
        setErrors({
          ...errors,
          endDate: '',
        });
      }
    }
  }, [medicationRecord]);

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

  const isFormValid = (): boolean => {
    const newErrors = {
      resident: '',
      medicine: '',
      dosage: '',
      firstTime: '',
      frequency: '',
      startDate: '',
      endDate: '',
    };

    let isValid = true;
    if (!resident) {
      newErrors.resident = 'Morador é obrigatório';
      isValid = false;
    }
    if (!medicationRecord.medicine) {
      newErrors.medicine = 'Medicamento é obrigatório';
      isValid = false;
    }
    if (!medicationRecord.dosage) {
      newErrors.dosage = 'Dosagem é obrigatória';
      isValid = false;
    }
    if (!medicationRecord.firstHour) {
      newErrors.firstTime = 'Primeiro horário é obrigatório';
      isValid = false;
    }
    if (!medicationRecord.frequency) {
      newErrors.frequency = 'Frequência é obrigatória';
      isValid = false;
    }
    if (!medicationRecord.startDate) {
      newErrors.startDate = 'Data de início é obrigatória';
      isValid = false;
    }
    if (!medicationRecord.endDate) {
      newErrors.endDate = 'Data de término é obrigatória';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
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
    if (isFormValid()) {
      const formattedMedicineName = medicationRecord.medicine.includes('(')
        ? medicationRecord.medicine
        : `${medicationRecord.medicine} (${medicationRecord.dosage})`;

      const newRecord = {
        id: Math.floor(Math.random() * 1000),
        resident: resident?.name ?? '',
        medicine: formattedMedicineName,
        dosage: medicationRecord.dosage,
        firstHour: medicationRecord.firstHour,
        frequency: medicationRecord.frequency,
        startDate: medicationRecord.startDate,
        endDate: medicationRecord.endDate,
        pharmaceuticalForm: medicationRecord.pharmaceuticalForm,
        pharmacologicalName: medicationRecord.pharmacologicalName,
        medicineId: medicationRecord.medicineId,
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
            isDisabled={errors.endDate !== ''}
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
            setErrors({ ...errors, resident: '' });
          }}
          type="select"
          options={residents?.map((resident) => ({
            label: resident.name ?? '',
            value: resident.id ?? '',
          }))}
          value={resident?.id ?? ''}
          disabled={selectedResidentId !== null}
          errorMessage={errors.resident}
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
                setErrors({ ...errors, medicine: '' });
              }}
              type="select"
              options={medicines.map((medicine) => ({
                label: medicine.name,
                value: medicine.id,
              }))}
              value={medicationRecord.medicineId ?? ''}
              required
              errorMessage={errors.medicine}
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
              setErrors({ ...errors, dosage: '' });
            }}
            type="text"
            value={medicationRecord.dosage}
            required
            errorMessage={errors.dosage}
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
                setErrors({ ...errors, firstTime: '' });
              }}
              value={medicationRecord.firstHour}
              required
              errorMessage={errors.firstTime}
            />
          </div>
          <div style={{ margin: '0 20px 0 0' }}>
            <FormInput
              id="frequency"
              label="Frequência (8/8h, 12/12h, 24/24h)"
              placeholder="Frequência (8/8h, 12/12h, 24/24h)"
              onChange={(e) => {
                setErrors({ ...errors, frequency: '' });
                const target = e.target as HTMLInputElement;
                setMedicationRecord({
                  ...medicationRecord,
                  frequency: target.value,
                });
              }}
              type="number"
              value={medicationRecord.frequency}
              required
              errorMessage={errors.frequency}
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
                setErrors({ ...errors, startDate: '' });
              }}
              value={medicationRecord.startDate}
              required
              errorMessage={errors.startDate}
              minDate={new Date().toISOString().split('T')[0]}
            />
          </div>
          <FormInput
            id="end-date"
            label="Data de término"
            type="date"
            onChange={(e) => {
              setErrors({ ...errors, endDate: '' });
              const target = e.target as HTMLInputElement;
              setMedicationRecord({
                ...medicationRecord,
                endDate: target.value,
              });
            }}
            value={medicationRecord.endDate}
            required
            errorMessage={errors.endDate}
            minDate={new Date().toISOString().split('T')[0]}
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
