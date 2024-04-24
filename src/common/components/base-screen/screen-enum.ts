import {
  type ComponentType,
  type FunctionComponent,
  type SVGProps,
} from 'react';
import * as Icon from '../../../assets/icons-mapping';
import { ResidentContainer } from './../../../resident/screens/resident.container';
import { MedicineContainer } from '../../../medicine/screens/medicine.container';
import { EmployeeContainer } from '../../../employee/screens/employee.container';
import { StockScreenContainer } from '../../../stock/screens/stock-screen/stock-screen.container';
import { StockEntryScreen } from '../../../stock/screens/stock-entry-screen/stock-entry-screen';

export enum Screens {
  Files = 'Files',
  Stock = 'Stock',
  Emloyee = 'Emloyee',
  Medicines = 'Medicines',
  Psychologist = 'Psychologist',
  Nutritionist = 'Nutritionist',
  Physical = 'Physical',
}

export interface ScreenComponentProps {
  setSecondaryTitle?: (value: string) => void;
}

export interface ScreenListItemProps {
  title: string;
  icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  element: ComponentType<ScreenComponentProps>;
  route?: string;
  notShouldRender?: boolean;
}

export const screenList: ScreenListItemProps[] = [
  {
    title: 'Fichas',
    icon: Icon.files_icon,
    route: '/fichas',
    element: ResidentContainer,
  },
  {
    title: 'Estoque',
    icon: Icon.stock_icon,
    route: '/estoques',
    element: StockScreenContainer,
  },
  {
    title: 'Nova Entrada',
    icon: Icon.stock_icon,
    route: '/estoque/entrada',
    element: StockEntryScreen,
    notShouldRender: true,
  },
  {
    title: 'Funcionários',
    icon: Icon.employees_icon,
    route: '/funcionarios',
    element: EmployeeContainer,
  },
  {
    title: 'Medicamentos',
    icon: Icon.medicines_icon,
    route: '/medicamentos',
    element: MedicineContainer,
  },
  {
    title: 'Psicólogo',
    icon: Icon.psychologist_icon,
    route: '/psicologico',
    element: ResidentContainer,
  },
  {
    title: 'Nutricionista',
    icon: Icon.nutritionist_icon,
    route: '/nutricionista',
    element: ResidentContainer,
  },
  {
    title: 'Avaliação Física',
    icon: Icon.physical_icon,
    route: '/avaliacao-fisica',
    element: ResidentContainer,
  },
];
