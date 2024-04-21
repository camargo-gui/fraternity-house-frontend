import { useState, type ReactElement } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import type { Medicine } from '../../entities/medicine';
import { Button, ButtonGroup, WrapperSheet } from '../medicine.styles';
import { Row } from './medication-sheet-form-screen.styles';
import { FaPlus } from 'react-icons/fa';
import {
  type MedicationRecord,
  MedicationSheetTable,
} from './medication-sheet-table';
import { type ResidentDTO } from '../../../resident/dto/resident-dto';

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
  const [medicationRecord, setMedicationRecord] = useState<MedicationRecord>({
    resident: '',
    medicine: '',
    pharmaceuticalForm: '',
    pharmacologicalName: '',
    dosage: '',
    firstHour: '',
    frequency: '',
    startDate: '',
    endDate: '',
    medicalPrescription: '',
  });
  const [medicationRecords, setMedicationRecords] = useState<
    MedicationRecord[]
  >([]);

  const isFormValid = (record: MedicationRecord): boolean => {
    return (
      record.resident !== '' &&
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
        medicine: formattedMedicineName,
      };
      setMedicationRecords((prevRecords) => [...prevRecords, newRecord]);
      setMedicationRecord({
        resident: '',
        medicine: '',
        pharmaceuticalForm: '',
        pharmacologicalName: '',
        dosage: '',
        firstHour: '',
        frequency: '',
        startDate: '',
        endDate: '',
        medicalPrescription: '',
      });
    } else {
      alert('Por favor preencha todos os campos');
    }
  };

  function renderSubmitButtonGroup(): ReactElement {
    return (
      <ButtonGroup>
        <div>
          <Button text="Cadastrar Fichas" onClick={() => {}} width="auto" />
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

  function renderAddRegisterButton(): ReactElement {
    return (
      <ButtonGroup style={{ marginBottom: '15px' }}>
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

  const handleMedicineChange = (selectedMedicineId: string): void => {
    const selectedMedicine: Medicine | undefined = medicines.find(
      (medicine) => medicine.id.toString() === selectedMedicineId,
    );
    if (selectedMedicine != null) {
      setMedicationRecord((prevRecord) => ({
        ...prevRecord,
        medicine: selectedMedicine.name,
        pharmaceuticalForm: selectedMedicine.PharmacologicalForm.name,
        pharmacologicalName: selectedMedicine.PharmacologicalName.name,
      }));
    }
  };

  return (
    <WrapperSheet>
      <div>
        <FormInput
          id="resident"
          label="Morador"
          placeholder={'Selecione o morador'}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            const selectedResident = residents.find(
              (resident) => resident?.id?.toString() === target.value,
            );
            setMedicationRecord({
              ...medicationRecord,
              resident: selectedResident != null ? selectedResident.name : '',
            });
          }}
          type="select"
          options={residents?.map((resident) => ({
            label: resident.name ?? '',
            value: resident.id ?? '',
          }))}
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
            required
          />
          <FormInput
            id="frequency"
            label="Frequência"
            placeholder="Frequência"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setMedicationRecord({
                ...medicationRecord,
                frequency: target.value,
              });
            }}
            type="text"
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
            required
          />
        </Row>

        <FormInput
          id="medical-prescription"
          label="Informações médicas adicionais (opcional)"
          placeholder="Informações médicas adicionais (opcional)"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setMedicationRecord({
              ...medicationRecord,
              medicalPrescription: target.value,
            });
          }}
          type="textarea"
        />

        {renderAddRegisterButton()}

        <MedicationSheetTable records={medicationRecords} />
      </div>

      {renderSubmitButtonGroup()}
    </WrapperSheet>
  );
};
