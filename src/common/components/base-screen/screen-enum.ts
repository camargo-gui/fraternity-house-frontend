import * as Icon from '../../../assets/icons-mapping';

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
    icon: Icon.files_icon,
    route: '/fichas',
  },
  {
    title: 'Estoque',
    icon: Icon.stock_icon,
    route: '/estoques',
  },
  {
    title: 'Funcionários',
    icon: Icon.employees_icon,
    route: '/funcionarios',
  },
  {
    title: 'Medicamentos',
    icon: Icon.medicines_icon,
    route: '/medicamentos',
  },
  {
    title: 'Psicólogo',
    icon: Icon.psychologist_icon,
    route: '/psicologico',
  },
  {
    title: 'Nutricionista',
    icon: Icon.nutritionist_icon,
  },
  {
    title: 'Avaliação Física',
    icon: Icon.physical_icon,
  },
];
