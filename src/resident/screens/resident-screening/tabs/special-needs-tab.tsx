import {
  type ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ApplicationContext } from '../../../../application-context';
import { noop } from 'lodash';
import FilterableSelect, {
  type Option,
} from '../../../components/filterable-select/filterable-select';
import {
  CenterRow,
  SimpleButton,
  TabWrapper,
} from '../resident-screening-form.styles';
import { Button } from '../../../../common/components/button/button';
import { ObjectionSpecialNeedsService } from '../../../services/objection/objection-special-needs-servic';
import { SpecialNeeds } from '../../../entities/special-needs';
import { SpecialNeedsTable } from '../../../components/screening-tables/special-needs-table';
import { type ScreeningProps } from './types';

export const SpecialNeedsTab = ({
  enableEdit,
  currentScreening,
  setCurrentScreening,
}: ScreeningProps): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);

  const [showSelect, setShowSelect] = useState(false);

  const [selectedNeed, setSelectedNeed] = useState<Option | undefined>();
  const [specialNeeds, setSpecialNeeds] = useState<
    Array<{
      value: string;
      label: string;
    }>
  >([]);

  const fetchIllnesses = useCallback(async (): Promise<void> => {
    const response = await new ObjectionSpecialNeedsService().getSpecialNeeds(
      httpClient,
    );
    setSpecialNeeds(
      response?.map((needs) => ({
        value: String(needs.id),
        label: needs.name,
      })) ?? [],
    );
  }, []);

  useEffect(() => {
    fetchIllnesses().catch(noop);
  }, []);

  const handleRegisterIllness = (): void => {
    if (
      selectedNeed !== undefined &&
      currentScreening.SpecialNeeds.filter(
        (need) => need.id === Number(selectedNeed?.value),
      ).length > 0
    ) {
      return;
    }

    setCurrentScreening({
      ...currentScreening,
      SpecialNeeds: [
        ...currentScreening.SpecialNeeds,
        new SpecialNeeds(
          selectedNeed?.label ?? '',
          Number(selectedNeed?.value),
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
            options={specialNeeds}
            placeholder={'Selecione'}
            onChange={(option) => {
              setSelectedNeed(option);
            }}
          />
          {selectedNeed && (
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
        + Registrar nova necessidade
      </SimpleButton>
    );
  };

  return (
    <TabWrapper>
      {renderRegister()}
      {currentScreening.SpecialNeeds.length !== 0 && (
        <div style={{ width: '100%', paddingBottom: '2%' }}>
          <SpecialNeedsTable
            enableEdit={enableEdit}
            currentScreening={currentScreening}
            setCurrentScreening={setCurrentScreening}
          />
        </div>
      )}
    </TabWrapper>
  );
};
