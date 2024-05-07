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
import { FormInput } from '../../../../common/components/form-input/form-input';

export const IllnessesTab = (): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);

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

  return (
    <FormInput
      type="select"
      id="illnesses"
      onChange={noop}
      options={illnesses}
    />
  );
};
