import React, { type ReactElement } from 'react';
import Card from 'react-bootstrap/Card';

export const CardListItem = (): ReactElement => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={require('../../assets/images/116609218.jpg')}
      />
      <Card.Body>
        <Card.Title>Pedro Felitto</Card.Title>
        <Card.Text>Idade: 20 anos</Card.Text>
      </Card.Body>
    </Card>
  );
};
