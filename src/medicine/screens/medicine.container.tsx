import { useEffect, useState, type ReactElement } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useMedicines } from '../hooks/use-medicine';
import { MedicationSheetFormScreen } from './forms/medication-sheet-form-screen';
import { MedicineFormScreen } from './forms/medicine-form-screen';
import { MedicationSheet } from './lists/medication-sheet-screen';
import { MedicineList } from './lists/medicine-list-screen';
import { GoBackButton } from './medicine.styles';
import React from 'react';

enum Screen {
  MedicineRegister = 'MedicineRegister',
  MedicineList = 'MedicineList',
  MedicationSheetList = 'MedicationSheetList',
  MedicationSheetRegister = 'MedicationSheetRegister',
}

export const MedicineContainer = (): ReactElement => {
  const [screen, setScreen] = useState<Screen>(Screen.MedicationSheetList);

  const { medicines, pharmacologicalNames, refetch } = useMedicines();

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const renderScreen = (): ReactElement => {
    switch (screen) {
      case Screen.MedicineRegister:
        return (
          <MedicineFormScreen
            changeScreen={() => {
              setScreen(Screen.MedicineList);
            }}
            pharmacologicalNames={pharmacologicalNames}
          />
        );
      case Screen.MedicineList:
        return (
          <MedicineList
            changeScreen={() => {
              setScreen(Screen.MedicineRegister);
            }}
            medicines={medicines}
          />
        );
      case Screen.MedicationSheetList:
        return (
          <MedicationSheet
            changeScreen={() => {
              setScreen(Screen.MedicationSheetRegister);
            }}
            goToMedicineForm={() => {
              setScreen(Screen.MedicineList);
            }}
          />
        );
      case Screen.MedicationSheetRegister:
        return (
          <MedicationSheetFormScreen
            changeScreen={() => {
              setScreen(Screen.MedicationSheetList);
            }}
            goToMedicineList={() => {
              setScreen(Screen.MedicineList);
            }}
            medicines={medicines}
          />
        );
      default:
        return <div>Unknown screen</div>;
    }
  };

  return (
    <div>
      {screen === Screen.MedicineList || screen === Screen.MedicineRegister ? (
        <GoBackButton
          onClick={() => {
            setScreen(Screen.MedicationSheetList);
          }}
          text="Voltar para fichas"
          leadingIcon={<FaArrowLeft />}
        />
      ) : null}
      {renderScreen()}
    </div>
  );
};
