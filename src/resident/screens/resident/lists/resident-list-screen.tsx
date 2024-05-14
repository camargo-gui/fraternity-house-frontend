import { type ReactElement } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { CardListItem } from '../../../components/card-list-item/card-list-item';
import { type Resident } from '../../../entities/resident';
import { AlignButtons, Button, Wrapper } from '../resident.styles';

interface Props {
  changeScreen: () => void;
  residents?: Resident[];
  onEdit: (cpf: string) => void;
  onScreening: (id: string) => void;
  onDelete: (cpf: string) => Promise<void>;
  handleReport: () => Promise<void>;
  isSubmitting: boolean;
}

export const ResidentList = ({
  changeScreen,
  residents,
  onEdit,
  onDelete,
  onScreening,
  handleReport,
  isSubmitting,
}: Props): ReactElement => {
  return (
    <>
      <Wrapper>
        <CardListItem
          residents={residents}
          onEdit={onEdit}
          onScreening={onScreening}
          onDelete={onDelete}
        />
      </Wrapper>
      <AlignButtons>
        <Button
          text="Novo Morador"
          onClick={changeScreen}
          backgroundColor="#6c757d"
          hoverBackgroundColor="#595f64"
          width="auto"
        />
        <Button
          backgroundColor="#002b5e"
          onClick={() => {
            void handleReport();
          }}
          leadingIcon={<FaEnvelope color="#FFF" />}
          isLoading={isSubmitting}
          hoverBackgroundColor="#034da8"
        />
      </AlignButtons>
    </>
  );
};
