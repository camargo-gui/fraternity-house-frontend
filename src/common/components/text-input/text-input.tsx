import React, { type ReactElement } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

interface Props {
  label: string;
  placeholder: string;
  controlType?: string;
}

export const TextInput = ({
  label,
  placeholder,
  controlType,
}: Props): ReactElement => {
  return (
    <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
      <Form.Control type={controlType} placeholder={placeholder} />
    </FloatingLabel>
  );
};
