import { type ReactElement } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

type InputType =
  | 'text'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'search'
  | 'textarea'
  | 'password';

interface Option {
  label: string;
  value: string;
}

// type Mask = 'document' | 'phone' | 'cep' | 'date' | 'time' | 'currency';

interface FormInputProps {
  id: string;
  label: string;
  type: InputType;
  options?: Option[];
  placeholder?: string;
  value?: string;
  checked?: boolean;
  required?: boolean;
  errorMessage?: string;
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
  required,
  errorMessage,
}: FormInputProps): ReactElement => {
  const renderTextarea = (): ReactElement => (
    <Form.Control
      as="textarea"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type="textarea"
      style={{ height: '100px' }}
      required={required}
    />
  );

  const renderTextInput = (): ReactElement => (
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );

  const renderSelect = (): ReactElement => (
    <Form.Select value={value} onChange={onChange} required={required}>
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
      required={required}
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

  if (errorMessage !== null && errorMessage !== '') {
    return (
      <>
        <FloatingLabel controlId={id} label={label} className="mb-3">
          {renderInput()}
        </FloatingLabel>
        <div className="text-danger mb-3">{errorMessage}</div>
      </>
    );
  }

  return (
    <FloatingLabel controlId={id} label={label} className="mb-3">
      {renderInput()}
    </FloatingLabel>
  );
};
