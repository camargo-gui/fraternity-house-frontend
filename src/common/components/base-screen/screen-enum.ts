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
import { ResidentScreeniing } from '../../../resident/screens/screening/screening';
import { ListNutritionistAccompaniments } from '../../../accompaniment/screens/nutritionist/list-nutritionist-accompaniments';
import { AccompanimentScreenForm } from '../../../accompaniment/screens/accompaniment-screen-form/accompaniment-screen-form';
import { ListPhysicologicalAccompaniments } from '../../../accompaniment/screens/physicological/list-physicological-accompaniments';
import { ListPhysiotherapistAccompaniments } from '../../../accompaniment/screens/physiotherapist/list-physiotherapist-accompaniments';

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
    allowedRoles: [RoleEnum.Administrador, RoleEnum.Funcionario],
  },
  {
    title: 'Nova Saída',
    icon: Icon.stock_icon,
    route: '/estoque/saida',
    element: StockExit,
    notShouldRender: true,
    allowedRoles: [RoleEnum.Administrador, RoleEnum.Funcionario],
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
    route: '/PSYCHOLOGIST',
    element: ListPhysicologicalAccompaniments,
    allowedRoles: [RoleEnum.Psicologo],
  },
  {
    title: 'Nutricionista',
    icon: Icon.nutritionist_icon,
    route: '/NUTRITIONIST',
    element: ListNutritionistAccompaniments,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
  },
  {
    title: 'Novo acompanhamento',
    icon: Icon.nutritionist_icon,
    route: '/:type/formulario/:id',
    element: AccompanimentScreenForm,
    allowedRoles: [
      RoleEnum.Administrador,
      RoleEnum.Funcionario,
      RoleEnum.Nutricionista,
      RoleEnum.Psicologo,
      RoleEnum.EducadorFisico,
    ],
    notShouldRender: true,
  },
  {
    title: 'Avaliação Física',
    icon: Icon.physical_icon,
    route: '/PHYSIOTHERAPIST',
    element: ListPhysiotherapistAccompaniments,
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
