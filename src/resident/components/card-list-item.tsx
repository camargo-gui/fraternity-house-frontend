import { type ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import { type ResidentDTO } from '../dto/resident-dto';
import { FaPen, FaTrash } from 'react-icons/fa';
import { ActionButton, Div } from './card-list-item.styles';

interface Props {
  residents?: ResidentDTO[];
}

export const CardListItem = ({ residents }: Props): ReactElement => {
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
          <Card.Body>
            <Card.Title>Nome: {resident.name}</Card.Title>
            <Card.Text>CPF: {resident.cpf}</Card.Text>
            <ActionButton
              onClick={() => {
                console.log('delete');
              }}
              leadingIcon={<FaTrash color="red" />}
            />
            <ActionButton
              onClick={() => {
                console.log('edit');
              }}
              leadingIcon={<FaPen color="#2a1aa5" />}
            />
          </Card.Body>
        </Card>
      ))}
    </Div>
  );
};
