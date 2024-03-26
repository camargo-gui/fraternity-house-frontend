/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import { type ResidentDTO } from '../dto/resident-dto';
import { FaPen, FaTrash } from 'react-icons/fa';
import { ActionButton, Div, DivCardIcons } from './card-list-item.styles';

interface Props {
  residents?: ResidentDTO[];
  onEdit: (cpf: string) => void;
  onDelete: (cpf: string) => Promise<void>;
  isLoading: boolean;
}

export const CardListItem = ({
  residents,
  onEdit,
  onDelete,
  isLoading,
}: Props): ReactElement => {
  if (residents == null) return <div>Carregando...</div>;
  return (
    <Div>
      {residents.map((resident) => (
        <Card
          key={resident.cpf}
          style={{
            width: '18%',
            minWidth: '200px',
            marginBottom: '20px',
            marginRight: '10px',
            marginLeft: '10px',
          }}
        >
          <Card.Img
            variant="top"
            src={require('../../assets/images/116609218.jpg')}
          />
          <Card.Body
            style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Card.Title>{resident.name}</Card.Title>
              <Card.Text>CPF: {resident.cpf}</Card.Text>
            </div>
            <DivCardIcons>
              <ActionButton
                onClick={async () => {
                  await onDelete(resident.cpf);
                }}
                leadingIcon={<FaTrash color="red" />}
              />
              <ActionButton
                onClick={() => {
                  onEdit(resident.cpf);
                }}
                leadingIcon={<FaPen color="#2a1aa5" />}
              />
            </DivCardIcons>
          </Card.Body>
        </Card>
      ))}
    </Div>
  );
};
