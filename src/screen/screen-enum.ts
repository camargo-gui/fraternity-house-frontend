import FilesIcon from '../assets/icons/files-icon.svg';
import StockIcon from '../assets/icons/stock-icon.svg';
import EmployeeIcon from '../assets/icons/employees-icon.svg';
import MedicinesIcon from '../assets/icons/medicines-icon.svg';
import PsychologistIcon from '../assets/icons/psychologist-icon.svg';
import NutritionistIcon from '../assets/icons/nutritionist-icon.svg';
import PhysicalIcon from '../assets/icons/physical-icon.svg';

export enum Screens {
  Files = 'Files',
  Stock = 'Stock',
  Emloyee = 'Emloyee',
  Medicines = 'Medicines',
  Psychologist = 'Psychologist',
  Nutritionist = 'Nutritionist',
  Physical = 'Physical',
}

export const screenList = [
  {
    title: 'Fichas',
    icon: FilesIcon,
  },
  {
    title: 'Estoque',
    icon: StockIcon,
  },
  {
    title: 'Funcionários',
    icon: EmployeeIcon,
  },
  {
    title: 'Medicamentos',
    icon: MedicinesIcon,
  },
  {
    title: 'Psicólogo',
    icon: PsychologistIcon,
  },
  {
    title: 'Nutricionista',
    icon: NutritionistIcon,
  },
  {
    title: 'Avaliação Física',
    icon: PhysicalIcon,
  },
];
