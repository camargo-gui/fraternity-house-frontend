import { FaCheck, FaTimes } from 'react-icons/fa';
import {
  IconContainer,
  RequirementsBox,
  InfosWrapper,
} from '../../../../screens/login/login.styles';
import { type ReactElement } from 'react';

interface RequirementType {
  requirements: {
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
    minLength: boolean;
  };
}

interface RequirementParams {
  key: string;
  text: string;
  condition: boolean;
}

function RequirementComponent({
  condition,
  key,
  text,
}: RequirementParams): ReactElement {
  const color = condition ? '#020482' : '#608ff6';

  return (
    <InfosWrapper key={key}>
      <IconContainer>
        {condition ? <FaCheck color={color} /> : <FaTimes color={color} />}
      </IconContainer>
      <p style={{ color, padding: 0, margin: 0 }}>{text}</p>
    </InfosWrapper>
  );
}

export function RequirementBoxContent({
  requirements,
}: RequirementType): React.ReactElement {
  return (
    <RequirementsBox>
      <RequirementComponent
        condition={requirements.uppercase}
        key="uppercase"
        text="Mínimo 1 letra maiúscula"
      />
      <RequirementComponent
        condition={requirements.lowercase}
        key="lowercase"
        text="Mínimo 1 letra minúscula"
      />
      <RequirementComponent
        condition={requirements.number}
        key="number"
        text="Mínimo 1 número"
      />
      <RequirementComponent
        condition={requirements.specialChar}
        key="specialChar"
        text="Mínimo 1 caractere especial"
      />
      <RequirementComponent
        condition={requirements.minLength}
        key="minLength"
        text="Mínimo 8 caracteres"
      />
    </RequirementsBox>
  );
}
