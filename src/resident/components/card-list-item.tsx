import { type ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import { type ResidentDTO } from '../dto/resident-dto';

interface Props {
  residents: ResidentDTO[];
}

export const CardListItem = ({ residents }: Props): ReactElement => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={require('../../assets/images/116609218.jpg')}
      />
      <Card.Body>
        {residents.map((resident) => (
          <div key={resident.cpf}>
            <Card.Title>Nome: {resident.name}</Card.Title>
            <Card.Text>CPF: {resident.cpf} anos</Card.Text>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};
