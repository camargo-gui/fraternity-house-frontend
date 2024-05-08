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
// import { FormInput } from '../../../../common/components/form-input/form-input';
import FilterableSelect, {
  type Option,
} from '../../../components/filterable-select/filterable-select';
// import TableComponent from '../../../../common/components/table/table';
import { type Screening } from '../../../entities/screening';
import { IlnessesTable } from '../../../components/illnesses-table/illnesses-table';
import { HalfRow, SimpleButton } from '../resident-screening-form.styles';
import { Button } from '../../../../common/components/button/button';
import { Illnesses } from '../../../entities/illnesses';
// import { type Illnesses } from '../../../entities/illnesses';

interface Props {
  screening: Screening;
  setScreening: (screening: Screening) => void;
}

export const IllnessesTab = ({
  screening,
  setScreening,
}: Props): ReactElement => {
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
      screening.Illnesses.filter(
        (illness) => illness.id === Number(selectedIllness?.value),
      ).length > 0
    ) {
      return;
    }

    setScreening({
      ...screening,
      Illnesses: [
        ...screening.Illnesses,
        new Illnesses(
          selectedIllness?.label ?? '',
          Number(selectedIllness?.value),
        ),
      ],
    });
  };

  return (
    <>
      {showSelect ? (
        <HalfRow>
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
        </HalfRow>
      ) : (
        <SimpleButton
          onClick={() => {
            setShowSelect(true);
          }}
        >
          + Registrar nova enfermidade
        </SimpleButton>
      )}

      {screening.Illnesses.length !== 0 && (
        <div style={{ width: '50%' }}>
          <IlnessesTable screening={screening} setScreening={setScreening} />
        </div>
      )}
    </>
  );
};
