import React, { useState, type ReactElement } from 'react';
import { ResidentScreen } from './resident-screen';
import { ResidentList } from './resident-list-screen';

enum Screen {
  Register = 'Register',
  List = 'List',
}

export const ResidentContainer = (): ReactElement => {
  const [screen, setScreen] = useState<Screen>(Screen.List);

  const changeScreen = (): void => {
    setScreen(screen === Screen.Register ? Screen.List : Screen.Register);
  };

  return screen === Screen.Register ? (
    <ResidentScreen changeScreen={changeScreen} />
  ) : (
    <ResidentList changeScreen={changeScreen} />
  );
};
