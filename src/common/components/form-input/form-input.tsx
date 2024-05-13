import { useState, type ReactElement } from 'react';
import { InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa';
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
  | 'password'
  | 'file'
  | 'number'
  | 'money';

interface Option {
  label: string;
  value: string;
}

interface FormInputProps {
  id: string;
  label?: string;
  type: InputType;
  options?: Option[];
  placeholder?: string;
  value?: string;
  checked?: boolean;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: any;
  mask?: string;
  onChange: (e: React.ChangeEvent<unknown>) => void;
  height?: string;
  style?: {
    backgroundColor?: string;
    marginLeft?: string;
    height?: string;
    border?: string;
    width?: string;
    padding?: string;
    margin?: string;
    marginBottom?: string;
  };
  minDate?: string;
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
  disabled,
  height,
  as,
  mask,
  style,
  minDate,
}: FormInputProps): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const renderTextarea = (): ReactElement => (
    <Form.Control
      as="textarea"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      type="textarea"
      style={{ height: height ?? '100px' }}
      required={required}
    />
  );

  const renderTextInput = (): ReactElement => {
    if (type === 'password') {
      return (
        <InputGroup className="mb-2">
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            as={as}
            mask={mask}
            min={minDate}
            style={{ height: '55px', ...style }}
          />
          <InputGroup.Text onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
      );
    } else {
      return (
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          as={as}
          mask={mask}
          min={minDate ?? 0}
          style={style}
        />
      );
    }
  };

  const renderSearchInput = (): ReactElement => (
    <InputGroup
      style={{
        height: '50px',
        marginBottom: style?.marginBottom ?? '30px',
        width: style?.width,
      }}
    >
      <Form.Control
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
    </InputGroup>
  );

  const renderSelect = (): ReactElement => (
    <Form.Select
      value={value}
      onChange={onChange}
      required={required}
      style={style}
      disabled={disabled}
    >
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

  const renderFileInput = (): ReactElement => (
    <Form.Control type="file" onChange={onChange} required={required} />
  );

  const renderMoneyInput = (): ReactElement => {
    const format = (value: number): string => {
      console.log(value);
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    };
    return (
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={format(Number(value) ?? '')}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          const value = target.value.replace(/\D/g, '');
          onChange({
            target: { value: Number(value) / 100 },
          } as unknown as React.ChangeEvent<unknown>);
        }}
        required={required}
        disabled={disabled}
        as={as}
        min={minDate ?? 0}
        style={style}
      />
    );
  };

  const renderInput = (): ReactElement => {
    switch (type) {
      case 'select':
        return renderSelect();
      case 'checkbox':
        return renderCheckbox();
      case 'file':
        return renderFileInput();
      case 'textarea':
        return renderTextarea();
      case 'search':
        return renderSearchInput();
      case 'money':
        return renderMoneyInput();
      case 'text':
      default:
        return renderTextInput();
    }
  };
  if (!label) {
    return (
      <div>
        {renderInput()}
        {errorMessage && errorMessage !== '' && (
          <div className="text-danger mb-3">{errorMessage}</div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <FloatingLabel
        controlId={id}
        label={label}
        className="mb-3 custom-floating-label"
      >
        {renderInput()}
      </FloatingLabel>
      {errorMessage && errorMessage !== '' && (
        <div className="text-danger mb-3">{errorMessage}</div>
      )}
    </div>
  );
};
