import React from 'react';
import { HttpClient } from './common/http-client/http-client';

export const ApplicationContext = React.createContext({
  httpClient: new HttpClient(),
});
