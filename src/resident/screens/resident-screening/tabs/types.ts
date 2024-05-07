import { type Screening } from '../../../entities/screening';

export interface ScreeningProps {
  onNext: () => void;
  onPrevious?: () => void;
  currentScreening: Screening;
  setCurrentScreening: (screening: Screening) => void;
}

export const initialScreeningState: Screening = {
  father_name: '',
  mother_name: '',
  religion: '',
  entry_date: new Date(),
  smoking: false,
  source_of_income: '',
  income: 0,
  health_insurance: '',
  funeral_insurance: '',
  number_of_sibling: 0,
  number_of_children: 0,
  number_of_grandchildren: 0,
  id_resident: 0,
  Responsible: {
    name: '',
    kinship: '',
    phone: '',
    civil_state: '',
    profession: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zip_code: '',
  },
  Illnesses: [],
  SpecialNeeds: [],
};
