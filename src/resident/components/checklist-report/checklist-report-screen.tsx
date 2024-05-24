import { noop } from 'lodash';
import { Button } from '../../../common/components/button/button';
import {
  AlignCheckBox,
  CheckBoxSelectAll,
  CheckBoxWrapper,
} from './checklist-report-screen.styles';
import { FormInput } from '../../../common/components/form-input/form-input';
import { type ReactElement, useState } from 'react';
import { type DataToSend } from '../../entities/data-to-send';

interface Props {
  onSubmit: (options: DataToSend) => Promise<void>;
  isLoading?: boolean;
}

export const ChecklistReportScreen = ({
  onSubmit,
  isLoading,
}: Props): ReactElement => {
  const [options, setOptions] = useState<DataToSend>({
    religion: false,
    smoking: false,
    entry_date: false,
    father_name: false,
    mother_name: false,
    source_of_income: false,
    income: false,
    health_insurance: false,
    funeral_insurance: false,
    number_of_sibling: false,
    number_of_children: false,
    number_of_grandchildren: false,
    Responsible: false,
    Illnesses: false,
    SpecialNeeds: false,
  });

  const [allSelected, setAllSelected] = useState(false);

  const toggleAllOptions = (): void => {
    const newStatus = !allSelected;
    setOptions({
      religion: newStatus,
      smoking: newStatus,
      entry_date: newStatus,
      father_name: newStatus,
      mother_name: newStatus,
      source_of_income: newStatus,
      income: newStatus,
      health_insurance: newStatus,
      funeral_insurance: newStatus,
      number_of_sibling: newStatus,
      number_of_children: newStatus,
      number_of_grandchildren: newStatus,
      Responsible: newStatus,
      Illnesses: newStatus,
      SpecialNeeds: newStatus,
    });
    setAllSelected(newStatus);
  };

  return (
    <>
      <CheckBoxSelectAll>
        <FormInput
          id="select-all"
          type="checkbox"
          label={'Selecionar todos'}
          checked={allSelected}
          onChange={() => {
            toggleAllOptions();
          }}
        />
      </CheckBoxSelectAll>
      <AlignCheckBox>
        <CheckBoxWrapper>
          <FormInput
            id="religiao"
            type="checkbox"
            label={'Religião'}
            checked={options.religion}
            onChange={() => {
              setOptions({ ...options, religion: !options.religion });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="fumante"
            type="checkbox"
            label={'Fumante'}
            checked={options.smoking}
            onChange={() => {
              setOptions({ ...options, smoking: !options.smoking });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="nome-pai"
            type="checkbox"
            label={'Nome do pai'}
            checked={options.father_name}
            onChange={() => {
              setOptions({ ...options, father_name: !options.father_name });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="nome-mae"
            type="checkbox"
            label={'Nome da mãe'}
            checked={options.mother_name}
            onChange={() => {
              setOptions({ ...options, mother_name: !options.mother_name });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="data-entrada"
            type="checkbox"
            label={'Data de entrada'}
            checked={options.entry_date}
            onChange={() => {
              setOptions({ ...options, entry_date: !options.entry_date });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="fonte-renda"
            type="checkbox"
            label={'Fonte de renda'}
            checked={options.source_of_income}
            onChange={() => {
              setOptions({
                ...options,
                source_of_income: !options.source_of_income,
              });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="renda"
            type="checkbox"
            label={'Renda'}
            checked={options.income}
            onChange={() => {
              setOptions({ ...options, income: !options.income });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="plano-saude"
            type="checkbox"
            label={'Plano de saúde'}
            checked={options.health_insurance}
            onChange={() => {
              setOptions({
                ...options,
                health_insurance: !options.health_insurance,
              });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="seguro-funeral"
            type="checkbox"
            label={'Seguro funeral'}
            checked={options.funeral_insurance}
            onChange={() => {
              setOptions({
                ...options,
                funeral_insurance: !options.funeral_insurance,
              });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="numero-irmaos"
            type="checkbox"
            label={'Número de irmãos'}
            checked={options.number_of_sibling}
            onChange={() => {
              setOptions({
                ...options,
                number_of_sibling: !options.number_of_sibling,
              });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="numero-filhos"
            type="checkbox"
            label={'Número de filhos'}
            checked={options.number_of_children}
            onChange={() => {
              setOptions({
                ...options,
                number_of_children: !options.number_of_children,
              });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="numero-netos"
            type="checkbox"
            label={'Número de netos'}
            checked={options.number_of_grandchildren}
            onChange={() => {
              setOptions({
                ...options,
                number_of_grandchildren: !options.number_of_grandchildren,
              });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="responsavel"
            type="checkbox"
            label={'Responsável'}
            checked={options.Responsible}
            onChange={() => {
              setOptions({ ...options, Responsible: !options.Responsible });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="doencas"
            type="checkbox"
            label={'Doenças'}
            checked={options.Illnesses}
            onChange={() => {
              setOptions({ ...options, Illnesses: !options.Illnesses });
            }}
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormInput
            id="necessidades-especiais"
            type="checkbox"
            label={'Necessidades especiais'}
            checked={options.SpecialNeeds}
            onChange={() => {
              setOptions({ ...options, SpecialNeeds: !options.SpecialNeeds });
            }}
          />
        </CheckBoxWrapper>
        <Button
          onClick={() => {
            onSubmit(options).catch(noop);
          }}
          isLoading={isLoading}
          text="Gerar relatório"
        />
      </AlignCheckBox>
    </>
  );
};
