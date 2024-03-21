import { ResidentContainer } from './../../../resident/screens/resident.container';
import {
  type ComponentType,
  type FunctionComponent,
  type SVGProps,
} from 'react';
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

export interface ScreenListItemProps {
  title: string;
  icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  element: ComponentType;
  route?: string;
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
    element: ResidentContainer,
  },
  {
    title: 'Funcionários',
    icon: Icon.employees_icon,
    route: '/funcionarios',
    element: ResidentContainer,
  },
  {
    title: 'Medicamentos',
    icon: Icon.medicines_icon,
    route: '/medicamentos',
    element: ResidentContainer,
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
