import { useState, type ReactElement, useEffect } from 'react';
import { ResidentScreenForm } from './forms/resident-screen-form';
import { ResidentList } from './lists/resident-list-screen';
import { useResident } from '../hooks/use-resident';

enum Screen {
  Register = 'Register',
  List = 'List',
}

export const ResidentContainer = (): ReactElement => {
  const [screen, setScreen] = useState<Screen>(Screen.List);
  const { residents, refetch } = useResident();

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
