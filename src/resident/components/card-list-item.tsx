/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import { FaPen, FaTrash } from 'react-icons/fa';
import { type ResidentDTO } from '../dto/resident-dto';
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
            style={{ objectFit: 'cover' }}
            variant="top"
            src={
              resident.url_image ??
              require('../../assets/images/da7ed7b0-5f66-4f97-a610-51100d3b9fd2.jpg')
            }
            height="225px"
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
