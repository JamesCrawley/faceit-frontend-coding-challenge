import React from 'react';
import App from './App';
import useAppState from './useAppState';

const AppWrapper = () => {
  const state = useAppState();

  return <App {...state} />;
};

export default AppWrapper;
