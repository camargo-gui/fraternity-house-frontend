import React, { type ReactElement } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

type InputType =
  | 'text'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'search'
  | 'textarea';

interface Option {
  label: string;
  value: string;
}

interface FormInputProps {
  id: string;
  label: string;
  type: InputType;
  options?: Option[];
  placeholder?: string;
  value?: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<unknown>) => void;
}

export const FormInput = ({
  id,
  label,
  type,
  options,
  placeholder,
  value,
  checked,
  onChange,
}: FormInputProps): ReactElement => {
  const renderTextarea = (): ReactElement => (
    <Form.Control
      as="textarea"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type="textarea"
      style={{ height: '100px' }}
    />
  );

  const renderTextInput = (): ReactElement => (
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );

  const renderSelect = (): ReactElement => (
    <Form.Select value={value} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );

  const renderCheckbox = (): ReactElement => (
    <Form.Check
      type="checkbox"
      label={label}
      checked={checked}
      onChange={onChange}
    />
  );

  const renderInput = (): ReactElement => {
    switch (type) {
      case 'select':
        return renderSelect();
      case 'checkbox':
        return renderCheckbox();
      case 'textarea':
        return renderTextarea();
      case 'text':
      default:
        return renderTextInput();
    }
  };

  return (
    <FloatingLabel controlId={id} label={label} className="mb-3">
      {renderInput()}
    </FloatingLabel>
  );
};
