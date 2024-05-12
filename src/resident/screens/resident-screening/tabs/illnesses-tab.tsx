import {
  type ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ObjectionIllnessesService } from '../../../services/objection/objection-illnesses-service';
import { ApplicationContext } from '../../../../application-context';
import { noop } from 'lodash';
import FilterableSelect, {
  type Option,
} from '../../../components/filterable-select/filterable-select';
import { IlnessesTable } from '../../../components/screening-tables/illnesses-table';
import {
  CenterRow,
  SimpleButton,
  TabWrapper,
} from '../resident-screening-form.styles';
import { Button } from '../../../../common/components/button/button';
import { Illnesses } from '../../../entities/illnesses';
import { type ScreeningProps } from './types';

export const IllnessesTab = ({
  currentScreening,
  setCurrentScreening,
  enableEdit,
}: ScreeningProps): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);

  const [showSelect, setShowSelect] = useState(false);

  const [selectedIllness, setSelectedIlness] = useState<Option | undefined>();
  const [illnesses, setIllnesses] = useState<
    Array<{
      value: string;
      label: string;
    }>
  >([]);

  const fetchIllnesses = useCallback(async (): Promise<void> => {
    const response = await new ObjectionIllnessesService().getIllnesses(
      httpClient,
    );
    setIllnesses(
      response?.map((illnesses) => ({
        value: String(illnesses.id),
        label: illnesses.name,
      })) ?? [],
    );
  }, []);

  useEffect(() => {
    fetchIllnesses().catch(noop);
  }, []);

  const handleRegisterIllness = (): void => {
    if (
      selectedIllness !== undefined &&
      currentScreening.Illnesses.filter(
        (illness) => illness.id === Number(selectedIllness?.value),
      ).length > 0
    ) {
      return;
    }

    setCurrentScreening({
      ...currentScreening,
      Illnesses: [
        ...currentScreening.Illnesses,
        new Illnesses(
          selectedIllness?.label ?? '',
          Number(selectedIllness?.value),
        ),
      ],
    });

    setShowSelect(false);
  };

  const renderRegister = (): ReactElement => {
    if (!enableEdit) return <></>;

    if (showSelect) {
      return (
        <CenterRow>
          <FilterableSelect
            options={illnesses}
            placeholder={'Selecione'}
            onChange={(option) => {
              setSelectedIlness(option);
            }}
          />
          {selectedIllness && (
            <Button
              margin="0px 16px"
              onClick={handleRegisterIllness}
              text="Registrar"
            />
          )}
        </CenterRow>
      );
    }

    return (
      <SimpleButton
        onClick={() => {
          setShowSelect(true);
        }}
      >
        + Registrar nova enfermidade
      </SimpleButton>
    );
  };

  return (
    <TabWrapper>
      {renderRegister()}
      {currentScreening.Illnesses.length !== 0 && (
        <div style={{ width: '100%', paddingBottom: '2%' }}>
          <IlnessesTable
            enableEdit={enableEdit}
            currentScreening={currentScreening}
            setCurrentScreening={setCurrentScreening}
          />
        </div>
      )}
    </TabWrapper>
  );
};
