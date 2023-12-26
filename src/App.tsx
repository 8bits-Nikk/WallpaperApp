import React from 'react';
import {PaperProvider} from 'react-native-paper';
import MainNavigator from './navigators/MainNavigator';

function App() {
  return (
    <PaperProvider>
      <MainNavigator />
    </PaperProvider>
  );
}

export default App;
