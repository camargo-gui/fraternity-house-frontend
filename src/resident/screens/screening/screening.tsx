import {
  type ReactElement,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { ResidentScreeningTabs } from './enum/resident-screening-tabs';
import { PersonalDataTab } from './tabs/personal-data-tab';
import { ButtonRow, CancelButton, TabText, TabsRow } from './screening.styles';
import { Screening } from '../../entities/screening';
import { initialScreeningState } from './tabs/types';
import { ResponsibleTab } from './tabs/responsible-tab';
import { ObjectionScreeningService } from '../../services/objection/objection-screening-service';
import { ApplicationContext } from '../../../application-context';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../redux/slices/loadingSlice';
import { IllnessesTab } from './tabs/illnesses-tab';
import { SpecialNeedsTab } from './tabs/special-needs-tab';
import { Button } from '../../../common/components/button/button';
import { handleScreeningNavigation } from '../../navigation/handle-screening-navigation';
import { noop } from 'lodash';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { type RootState } from '../../../redux/store/store';
import LoadingSpinner from '../../../common/components/loading-spinner/loading-spinner';

export const ResidentScreeniing = (): ReactElement => {
  const dispatch = useDispatch();
  const context = useContext(ApplicationContext);
  const [isFirstScreening, setIsFirstScreening] = useState<boolean>(false);
  const [isEdditing, setIsEditting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const [tabs, setTabs] = useState<ResidentScreeningTabs>(
    ResidentScreeningTabs.PersonalData,
  );

  const [currentScreening, setCurrentScreening] = useState<Screening>(
    initialScreeningState,
  );
  const [backupScreening, setBackupScreening] = useState<Screening>(
    initialScreeningState,
  );

  const { onPrevious, onNext } = handleScreeningNavigation(tabs, setTabs);

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (isFirstScreening) {
        await new ObjectionScreeningService().create(
          context.httpClient,
          currentScreening,
        );
      } else {
        await new ObjectionScreeningService().update(
          context.httpClient,
          currentScreening,
        );
      }
      toast.success('Salvo com sucesso');
      navigate('/fichas');
    } catch (error) {
      noop();
    }
    setIsLoading(false);
  };

  const fetchScreening = useCallback(async (): Promise<void> => {
    const id = window.location.href.split('/').pop() ?? '';
    dispatch(setLoading(true));
    const data = await new ObjectionScreeningService().get(
      context.httpClient,
      id,
    );
    setIsFirstScreening(!data);
    setIsEditting(!data);
    setCurrentScreening(Screening.fromDTO(data, Number(id)));
    setBackupScreening(Screening.fromDTO(data, Number(id)));
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

  const isLoadingg = useSelector((state: RootState) => state.loading.isLoading);

  if (isLoadingg) return <LoadingSpinner />;

  return (
    <>
      {renderTabs()}
      {tabs === ResidentScreeningTabs.PersonalData && (
        <PersonalDataTab
          enableEdit={isEdditing}
          currentScreening={currentScreening}
          setCurrentScreening={setCurrentScreening}
        />
      )}
      {tabs === ResidentScreeningTabs.Responsible && (
        <ResponsibleTab
          enableEdit={isEdditing}
          currentScreening={currentScreening}
          setCurrentScreening={setCurrentScreening}
        />
      )}
      {tabs === ResidentScreeningTabs.Illnesses && (
        <IllnessesTab
          enableEdit={isEdditing}
          currentScreening={currentScreening}
          setCurrentScreening={setCurrentScreening}
        />
      )}
      {tabs === ResidentScreeningTabs.SpecialNeeds && (
        <SpecialNeedsTab
          enableEdit={isEdditing}
          currentScreening={currentScreening}
          setCurrentScreening={setCurrentScreening}
        />
      )}
      <ButtonRow>
        <div>
          {onPrevious !== noop && (
            <Button
              onClick={onPrevious}
              backgroundColor="#a1a1a1"
              hoverBackgroundColor="#a1a1a1"
              text="Anterior"
            />
          )}
          {onNext !== noop && (
            <Button onClick={onNext} backgroundColor="#45a049" text="Próximo" />
          )}
        </div>
        {isFirstScreening ? (
          <Button
            backgroundColor="#002b5e"
            hoverBackgroundColor="#002b5e"
            text={'Cadastrar'}
            isLoading={isLoading}
            onClick={() => {
              handleSubmit().catch(noop);
            }}
          />
        ) : (
          <div>
            {isEdditing && (
              <CancelButton
                onClick={() => {
                  setCurrentScreening(backupScreening);
                  setIsEditting(false);
                }}
              />
            )}
            <Button
              backgroundColor="#002b5e"
              hoverBackgroundColor="#002b5e"
              text={isEdditing ? 'Salvar' : 'Editar'}
              isLoading={isLoading}
              onClick={() => {
                if (!isEdditing) setIsEditting(true);
                else {
                  handleSubmit().catch(noop);
                }
              }}
            />
          </div>
        )}
      </ButtonRow>
    </>
  );
};
