import { useContext, useState, type ReactElement } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ApplicationContext } from '../../../../application-context';
import { FormInput } from '../../../../common/components/form-input/form-input';
import { type ResidentDTO } from '../../../../resident/dto/resident-dto';
import { MedicationSheet } from '../../../entities/medication-sheet';
import type { Medicine } from '../../../entities/medicine';
import { Prescription } from '../../../entities/prescription';
import { ObjectionMedicationSheetService } from '../../../services/objection/objection-medication-sheet-service';
import { Button, ButtonGroup, WrapperSheet } from '../../medicine.styles';
import {
  EMPTY_RECORD,
  MedicationSheetTable,
  type MedicationRecord,
} from '../medication-sheet-table/medication-sheet-table';
import { Row } from './medication-sheet-form-screen.styles';
import { ConfirmationModal } from '../../../../common/components/confirmation-modal/confirmation-modal';

interface Props {
  changeScreen: () => void;
  goToMedicineList: () => void;
  medicines: Medicine[];
  residents: ResidentDTO[];
}

export const MedicationSheetFormScreen = ({
  changeScreen,
  goToMedicineList,
  medicines,
  residents,
}: Props): ReactElement => {
  const [medicationRecord, setMedicationRecord] =
    useState<MedicationRecord>(EMPTY_RECORD);
  const [resident, setResident] = useState<ResidentDTO | null>(null);
  const [medicationRecords, setMedicationRecords] = useState<
    MedicationRecord[]
  >([]);

  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingResidentId, setPendingResidentId] = useState<string | null>(
    null,
  );

  const medicationService = new ObjectionMedicationSheetService();
  const { httpClient } = useContext(ApplicationContext);

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

  const handleAddRecord = (): void => {
    if (isFormValid(medicationRecord)) {
      const formattedMedicineName = `${medicationRecord.medicine} (${medicationRecord.dosage})`;
      const newRecord = {
        ...medicationRecord,
        resident: resident?.name ?? '',
        medicine: formattedMedicineName,
      };
      setMedicationRecords((prevRecords) => [...prevRecords, newRecord]);
      setMedicationRecord(EMPTY_RECORD);
    } else {
      alert('Por favor preencha todos os campos');
    }
  };

  async function handleSubmit(): Promise<void> {
    setSubmitting(true);
    const prescriptions = medicationRecords.map((record) => {
      return new Prescription(
        record.medicineId ?? '',
        record.dosage,
        record.frequency,
        record.startDate,
        record.endDate,
        record.firstHour,
      );
    });
    await medicationService
      .createMedicationSheet(
        httpClient,
        new MedicationSheet(resident?.id ?? '', description, prescriptions),
      )
      .finally(() => {
        setSubmitting(false);
        setMedicationRecords([]);
        setMedicationRecord(EMPTY_RECORD);
        setDescription('');
        setResident(null);
      });
  }

  const handleMedicineChange = (selectedMedicineId: string): void => {
    const selectedMedicine: Medicine | undefined = medicines.find(
      (medicine) => medicine.id.toString() === selectedMedicineId,
    );
    if (selectedMedicine != null) {
      setMedicationRecord((prevRecord) => ({
        ...prevRecord,
        medicine: selectedMedicine.name,
        medicineId: selectedMedicine.id,
        pharmaceuticalForm: selectedMedicine.PharmacologicalForm.name,
        pharmacologicalName: selectedMedicine.PharmacologicalName.name,
      }));
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
            text="Adicionar"
            onClick={handleAddRecord}
            backgroundColor="#91CDA2"
            hoverBackgroundColor="#8ac39a"
            color="#000"
            leadingIcon={<FaPlus width={12} height={12} />}
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
            text="Cadastrar Ficha"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              await handleSubmit();
            }}
            width="auto"
            isLoading={submitting}
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
          required
        />
        <Row>
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
          <FormInput
            id="pharmaceutical-form"
            label="Forma farmacêutica"
            placeholder="Forma farmacêutica"
            value={medicationRecord.pharmaceuticalForm}
            disabled={true}
            type="text"
            onChange={() => {}}
          />
          <FormInput
            id="pharmacological-name"
            label="Nome farmacológico"
            placeholder="Nome farmacológico"
            value={medicationRecord.pharmacologicalName}
            disabled={true}
            type="text"
            onChange={() => {}}
          />
          <FormInput
            id="dosage"
            label="Dosagem"
            placeholder="Dosagem"
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
            type="text"
            value={medicationRecord.frequency}
            required
          />
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

        <MedicationSheetTable records={medicationRecords} />

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
