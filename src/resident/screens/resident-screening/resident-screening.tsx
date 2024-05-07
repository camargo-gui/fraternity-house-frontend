import {
  type ReactElement,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { ResidentScreeningTabs } from './enum/resident-screening-tabs';
import { PersonalDataTab } from './tabs/personal-data-tab';
import { TabText, TabsRow } from './resident-screening-form.styles';
import { Screening } from '../../entities/screening';
import { initialScreeningState } from './tabs/types';
import { ResponsibleTab } from './tabs/responsible-tab';
import { ObjectionScreeningService } from '../../services/objection/objection-screening-service';
import { ApplicationContext } from '../../../application-context';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/slices/loadingSlice';
import { IllnessesTab } from './tabs/illnesses-tab';

export const ResidentScreeniing = (): ReactElement => {
  const context = useContext(ApplicationContext);
  const dispatch = useDispatch();

  const [tabs, setTabs] = useState<ResidentScreeningTabs>(
    ResidentScreeningTabs.PersonalData,
  );

  const [currentScreening, setCurrentScreening] = useState<Screening>(
    initialScreeningState,
  );

  const fetchScreening = useCallback(async (): Promise<void> => {
    const id = window.location.href.split('/').pop() ?? '';
    dispatch(setLoading(true));
    const data = await new ObjectionScreeningService().getScreening(
      context.httpClient,
      id,
    );
    setCurrentScreening(Screening.fromDTO(data));
    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    void fetchScreening();
  }, []);

  const renderTabs = (): ReactElement => {
    return (
      <TabsRow>
        <TabText
          active={tabs === ResidentScreeningTabs.PersonalData}
          onClick={() => {
            setTabs(ResidentScreeningTabs.PersonalData);
          }}
        >
          Dados pessoais
        </TabText>
        <TabText
          active={tabs === ResidentScreeningTabs.Responsible}
          onClick={() => {
            setTabs(ResidentScreeningTabs.Responsible);
          }}
        >
          Responsável
        </TabText>
        <TabText
          active={tabs === ResidentScreeningTabs.Illnesses}
          onClick={() => {
            setTabs(ResidentScreeningTabs.Illnesses);
          }}
        >
          Enfermidades
        </TabText>
        <TabText
          active={tabs === ResidentScreeningTabs.SpecialNeeds}
          onClick={() => {
            setTabs(ResidentScreeningTabs.SpecialNeeds);
          }}
        >
          Necessidades especiais
        </TabText>
      </TabsRow>
    );
  };

  return (
    <>
      {renderTabs()}
      {tabs === ResidentScreeningTabs.PersonalData && (
        <PersonalDataTab
          currentScreening={currentScreening}
          setCurrentScreening={setCurrentScreening}
          onNext={() => {
            setTabs(ResidentScreeningTabs.Responsible);
          }}
        />
      )}
      {tabs === ResidentScreeningTabs.Responsible && (
        <ResponsibleTab
          currentScreening={currentScreening}
          setCurrentScreening={setCurrentScreening}
          onNext={() => {
            setTabs(ResidentScreeningTabs.Illnesses);
          }}
          onPrevious={() => {
            setTabs(ResidentScreeningTabs.PersonalData);
          }}
        />
      )}
      {tabs === ResidentScreeningTabs.Illnesses && <IllnessesTab />}
    </>
  );
};
