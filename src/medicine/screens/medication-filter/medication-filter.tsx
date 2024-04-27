import { type ReactElement } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const MedicationFilter = ({
  searchTerm,
  setSearchTerm,
}: Props): ReactElement => {
  return (
    <div>
      <FormInput
        id="search"
        label=""
        type="search"
        placeholder="Digite o nome do morador"
        value={searchTerm}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setSearchTerm(target.value);
        }}
        style={{ padding: '20px' }}
      />
    </div>
  );
};
