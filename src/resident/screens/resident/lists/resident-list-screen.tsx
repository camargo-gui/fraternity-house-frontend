import { useEffect, useState, type ReactElement } from 'react';
import { CardListItem } from '../../../components/card-list-item/card-list-item';
import { type Resident } from '../../../entities/resident';
import { AlignButtons, Button, SearchRow, Wrapper } from '../resident.styles';
import { FormInput } from '../../../../common/components/form-input/form-input';

interface Props {
  changeScreen: () => void;
  residents?: Resident[];
  onEdit: (cpf: string) => void;
  onScreening: (id: string) => void;
  onDelete: (cpf: string) => Promise<void>;
  handleReport: (id: string) => void;
}

export const ResidentList = ({
  changeScreen,
  residents,
  onEdit,
  onDelete,
  onScreening,
  handleReport,
}: Props): ReactElement => {
  const [filterText, setFilterText] = useState<string>('');
  const [filteredResidents, setFilteredResidents] = useState<Resident[]>(
    residents ?? [],
  );

  useEffect(() => {
    if (filterText === '') {
      setFilteredResidents(residents ?? []);
      return;
    }
    const filtered = residents?.filter((resident) => {
      return resident.name.toLowerCase().includes(filterText.toLowerCase());
    });
    setFilteredResidents(filtered ?? []);
  });

  return (
    <>
      <Wrapper>
        <AlignButtons>
          <SearchRow>
            <Button
              text="Novo Morador"
              onClick={changeScreen}
              backgroundColor="#6c757d"
              hoverBackgroundColor="#595f64"
              width="auto"
            />
            <FormInput
              style={{ marginBottom: '0px', marginLeft: '16px', width: '150%' }}
              id="search-resident"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setFilterText(target.value);
              }}
              placeholder="Digite o nome do morador"
              type="search"
            />
          </SearchRow>
        </AlignButtons>
        <CardListItem
          residents={filteredResidents}
          onEdit={onEdit}
          onScreening={onScreening}
          onDelete={onDelete}
          onSendEmail={handleReport}
        />
      </Wrapper>
    </>
  );
};
