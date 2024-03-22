import { useState, type ReactElement, useEffect, useContext } from 'react';
import { ResidentScreenForm } from './forms/resident-screen-form';
import { ResidentList } from './lists/resident-list-screen';
import { useResident } from '../hooks/use-resident';
import { ApplicationContext } from '../../application-context';

enum Screen {
  Register = 'Register',
  List = 'List',
}

export const ResidentContainer = (): ReactElement => {
  const { httpClient } = useContext(ApplicationContext);
  const [screen, setScreen] = useState<Screen>(Screen.List);
  const { residents, refetch } = useResident({ httpClient });

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const changeScreen = (): void => {
    setScreen(screen === Screen.Register ? Screen.List : Screen.Register);
  };

  return screen === Screen.Register ? (
    <ResidentScreenForm changeScreen={changeScreen} />
  ) : (
    <ResidentList changeScreen={changeScreen} residents={residents} />
  );
};
