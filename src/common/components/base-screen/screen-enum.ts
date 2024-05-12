import {
  type ComponentType,
  type FunctionComponent,
  type SVGProps,
} from 'react';
import * as Icon from '../../../assets/icons-mapping';
import { ResidentContainer } from '../../../resident/screens/resident/resident.container';
import { MedicineContainer } from '../../../medicine/screens/medicine.container';
import { EmployeeContainer } from '../../../employee/screens/employee.container';
import { StockScreenContainer } from '../../../stock/screens/stock-screen/stock-screen.container';
import { StockEntryScreen } from '../../../stock/screens/stock-entry-screen/stock-entry-screen';
import { StockExit } from '../../../stock/screens/stock-exit/stock-exit';
import { HistoricScreen } from '../../../stock/screens/historic/historic';
import { RoleEnum } from '../../../login/services/interfaces/role';
import { ResidentScreeniing } from '../../../resident/screens/resident-screening/resident-screening';
import { PhysicologicalContainer } from '../../../accompaniment/screens/physicological/physicological-container';
import { NutritionistContainer } from '../../../accompaniment/screens/nutritionist/nutritionist-container';
import { PhysiotherapistContainer } from '../../../accompaniment/screens/physiotherapist/physiotherapist-container';

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
  allowedRoles?: RoleEnum[];
}

export const screenList: ScreenListItemProps[] = [
  {
    title: 'Fichas',
    icon: Icon.files_icon,
    route: '/fichas',
    element: ResidentContainer,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
  },
  {
    title: 'Triagem',
    icon: Icon.files_icon,
    route: '/fichas/triagem/:id',
    element: ResidentScreeniing,
    notShouldRender: true,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
  },
  {
    title: 'Estoque',
    icon: Icon.stock_icon,
    route: '/estoques',
    element: StockScreenContainer,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
  },
  {
    title: 'Nova Entrada',
    icon: Icon.stock_icon,
    route: '/estoque/entrada',
    element: StockEntryScreen,
    notShouldRender: true,
  },
  {
    title: 'Nova Saída',
    icon: Icon.stock_icon,
    route: '/estoque/saida',
    element: StockExit,
    notShouldRender: true,
  },
  {
    title: 'Histórico',
    icon: Icon.stock_icon,
    route: '/estoque/historico',
    element: HistoricScreen,
    notShouldRender: true,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
  },
  {
    title: 'Funcionários',
    icon: Icon.employees_icon,
    route: '/funcionarios',
    element: EmployeeContainer,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
  },
  {
    title: 'Medicamentos',
    icon: Icon.medicines_icon,
    route: '/medicamentos',
    element: MedicineContainer,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
  },
  {
    title: 'Psicólogo',
    icon: Icon.psychologist_icon,
    route: '/psicologico',
    element: PhysicologicalContainer,
    allowedRoles: [RoleEnum.Psicologo],
  },
  {
    title: 'Nutricionista',
    icon: Icon.nutritionist_icon,
    route: '/nutricionista',
    element: NutritionistContainer,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
  },
  {
    title: 'Avaliação Física',
    icon: Icon.physical_icon,
    route: '/avaliacao-fisica',
    element: PhysiotherapistContainer,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
  },
  {
    title: 'Sair',
    icon: Icon.logout_icon,
    route: '/logout',
    element: () => null,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
  },
];
