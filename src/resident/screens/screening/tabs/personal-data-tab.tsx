import { FormInput } from '../../../../common/components/form-input/form-input';
import { Wrapper } from '../../resident/resident.styles';
import { HalfColum, MinorColumn, Row } from '../screening.styles';
import { type ReactElement } from 'react';
import { type ScreeningProps } from './types';

export const PersonalDataTab = ({
  currentScreening,
  setCurrentScreening,
  enableEdit,
}: ScreeningProps): ReactElement => {
  return (
    <Wrapper>
      <Row>
        <HalfColum>
          <FormInput
            label="Nome do Pai"
            value={currentScreening.father_name}
            id="father_name"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                father_name: target.value,
              });
            }}
            type="text"
            disabled={!enableEdit}
          />
        </HalfColum>
        <HalfColum>
          <FormInput
            label="Nome da Mãe"
            id="mother_name"
            value={currentScreening.mother_name}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                mother_name: target.value,
              });
            }}
            type="text"
            disabled={!enableEdit}
          />
        </HalfColum>
      </Row>
      <Row>
        <MinorColumn>
          <FormInput
            label="Religião"
            id="religion"
            value={currentScreening.religion}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                religion: target.value,
              });
            }}
            type="text"
            disabled={!enableEdit}
          />
        </MinorColumn>

        <MinorColumn>
          <FormInput
            label="É fumante?"
            id="religion"
            value={currentScreening.smoking ? 'true' : 'false'}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                smoking: target.value === 'true',
              });
            }}
            options={[
              {
                label: 'Sim',
                value: 'true',
              },
              {
                label: 'Não',
                value: 'false',
              },
            ]}
            type="select"
            disabled={!enableEdit}
          />
        </MinorColumn>
        <MinorColumn>
          <FormInput
            label="Data de entrada"
            id="data"
            value={currentScreening.entry_date.toISOString().split('T')[0]}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                entry_date: new Date(target.value),
              });
            }}
            type="date"
            disabled={!enableEdit}
          />
        </MinorColumn>
      </Row>
      <Row>
        <HalfColum>
          <FormInput
            label="Plano de saúde"
            id="health_insurance"
            value={currentScreening.health_insurance}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                health_insurance: target.value,
              });
            }}
            type="text"
            disabled={!enableEdit}
          />
        </HalfColum>
        <HalfColum>
          <FormInput
            label="Plano funerário"
            id="funeral_insurance"
            value={currentScreening.funeral_insurance}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                funeral_insurance: target.value,
              });
            }}
            type="text"
            disabled={!enableEdit}
          />
        </HalfColum>
      </Row>
      <Row>
        <MinorColumn>
          <FormInput
            label="Quantidade de parentes"
            id="number_of_sibling"
            value={currentScreening.number_of_sibling.toString()}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                number_of_sibling: parseInt(target.value),
              });
            }}
            type="number"
            disabled={!enableEdit}
          />
        </MinorColumn>
        <MinorColumn>
          <FormInput
            label="Quantidade de filhos"
            id="number_of_children"
            value={currentScreening.number_of_children.toString()}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                number_of_children: parseInt(target.value),
              });
            }}
            type="number"
            disabled={!enableEdit}
          />
        </MinorColumn>
        <MinorColumn>
          <FormInput
            label="Quantidade de netos"
            id="number_of_grandchildren"
            value={currentScreening.number_of_grandchildren.toString()}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                number_of_grandchildren: parseInt(target.value),
              });
            }}
            type="number"
            disabled={!enableEdit}
          />
        </MinorColumn>
      </Row>
      <Row>
        <HalfColum>
          <FormInput
            label="Fonte de renda"
            id="source_of_income"
            value={currentScreening.source_of_income}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                source_of_income: target.value,
              });
            }}
            type="text"
            disabled={!enableEdit}
          />
        </HalfColum>
        <HalfColum>
          <FormInput
            label="Renda"
            id="income"
            value={currentScreening.income.toString()}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurrentScreening({
                ...currentScreening,
                income: parseFloat(target.value),
              });
            }}
            type="money"
            disabled={!enableEdit}
          />
        </HalfColum>
      </Row>
    </Wrapper>
  );
};
