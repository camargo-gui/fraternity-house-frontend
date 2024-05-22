import React, { useRef, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

export interface Option {
  value: string;
  label: string;
}

interface FilterableSelectProps {
  options: Option[];
  placeholder: string;
  onChange: (option: Option | undefined) => void;
  required?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const FilterableSelect: React.FC<FilterableSelectProps> = ({
  options,
  placeholder,
  onChange,
  required = false,
  style,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setInputValue(event.target.value);
    setShowOptions(true);
    onChange(undefined);
  };

  const handleOptionClick = (option: Option): void => {
    onChange(option);
    setInputValue(options.find((o) => o.value === option.value)?.label ?? '');
    setShowOptions(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative', ...style, width: '80%' }}>
      <Form.Control
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          setShowOptions(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            if (!ref.current?.contains(document.activeElement)) {
              setShowOptions(false);
            }
          }, 200);
        }}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {showOptions && (
        <ListGroup
          style={{ position: 'absolute', width: '100%', zIndex: 1000 }}
        >
          {filteredOptions.map((option, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => {
                handleOptionClick(option);
              }}
            >
              {option.label}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default FilterableSelect;
