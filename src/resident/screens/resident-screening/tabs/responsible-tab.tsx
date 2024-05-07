import { FormInput } from '../../../../common/components/form-input/form-input';
import { Wrapper } from '../../resident/resident.styles';
import {
  ButtonRow,
  FullColumn,
  HalfColum,
  MinorColumn,
  Row,
} from '../resident-screening-form.styles';
import { useCallback, useEffect, type ReactElement } from 'react';
import { Button } from '../../../../common/components/button/button';
import { type ScreeningProps } from './types';
import { noop } from 'lodash';
import { getCEP } from '../../../api/get-cep';
import { IMaskInput } from 'react-imask';

export const ResponsibleTab = ({
  onNext,
  onPrevious,
  currentScreening,
  setCurrentScreening,
}: ScreeningProps): ReactElement => {
  const onZipCodeFullfiled = useCallback(
    async (zipCode: string): Promise<void> => {
      const data = await getCEP(zipCode.split('-').join(''));
      setCurrentScreening({
        ...currentScreening,
        Responsible: {
          ...currentScreening.Responsible,
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        },
      });
    },
    [currentScreening],
  );

  useEffect(() => {
    if (currentScreening.Responsible.zip_code.length === 9) {
      onZipCodeFullfiled(currentScreening.Responsible.zip_code).catch(noop);
    }
  }, [currentScreening.Responsible.zip_code]);
  return (
    <Wrapper>
      <Row>
        <FullColumn>
          <FormInput
            label="Nome do responsável"
            value={currentScreening.Responsible.name}
            id="responsible_name"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  name: target.value,
                },
              });
            }}
            type="text"
          />
        </FullColumn>
      </Row>
      <Row>
        <MinorColumn>
          <FormInput
            label="Telefone"
            id="phone"
            mask="(00) 00000-0000"
            as={IMaskInput}
            value={currentScreening.Responsible.phone}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  phone: target.value,
                },
              });
            }}
            type="text"
          />
        </MinorColumn>

        <MinorColumn>
          <FormInput
            label="Estado civil"
            id="civil_state"
            value={currentScreening.Responsible.civil_state}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  civil_state: target.value,
                },
              });
            }}
            options={[
              {
                label: 'Solteiro',
                value: 'solteiro',
              },
              {
                label: 'Casado',
                value: 'casado',
              },
              {
                label: 'Divorciado',
                value: 'divorciado',
              },
              {
                label: 'Viúvo',
                value: 'viuvo',
              },
            ]}
            type="select"
          />
        </MinorColumn>
        <MinorColumn>
          <FormInput
            label="Profissão"
            id="profession"
            value={currentScreening.Responsible.profession}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  profession: target.value,
                },
              });
            }}
            type="text"
          />
        </MinorColumn>
      </Row>
      <Row>
        <HalfColum>
          <FormInput
            label="Parentesco"
            id="kinship"
            value={currentScreening.Responsible.kinship}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  kinship: target.value,
                },
              });
            }}
            type="text"
          />
        </HalfColum>
        <HalfColum>
          <FormInput
            label="CEP"
            id="zip_code"
            mask="00000-000"
            as={IMaskInput}
            value={currentScreening.Responsible.zip_code}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  zip_code: target.value,
                },
              });
            }}
            type="text"
          />
        </HalfColum>
      </Row>
      <Row>
        <HalfColum>
          <FormInput
            label="Endereço"
            id="address"
            value={currentScreening.Responsible.address}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  address: target.value,
                },
              });
            }}
            type="text"
          />
        </HalfColum>
        <HalfColum>
          <FormInput
            label="Número"
            id="number"
            value={currentScreening.Responsible.number}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  number: target.value,
                },
              });
            }}
            type="text"
          />
        </HalfColum>
      </Row>
      <Row>
        <MinorColumn>
          <FormInput
            label="Bairro"
            id="neighborhood"
            value={currentScreening.Responsible.neighborhood}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  neighborhood: target.value,
                },
              });
            }}
            type="text"
          />
        </MinorColumn>
        <MinorColumn>
          <FormInput
            label="Cidade"
            id="city"
            value={currentScreening.Responsible.city}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  city: target.value,
                },
              });
            }}
            type="text"
          />
        </MinorColumn>
        <MinorColumn>
          <FormInput
            label="Estado"
            id="state"
            value={currentScreening.Responsible.state}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                Responsible: {
                  ...currentScreening.Responsible,
                  state: target.value,
                },
              });
            }}
            type="text"
          />
        </MinorColumn>
      </Row>
      <Row></Row>
      <ButtonRow>
        <Button
          onClick={onPrevious ?? noop}
          backgroundColor="#c1c1c1"
          text="Anterior"
        />
        <Button onClick={onNext} backgroundColor="#91CDA2" text="Próximo" />
      </ButtonRow>
    </Wrapper>
  );
};
