import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import * as eva from '@eva-design/eva';

import MainPage from './pages/MainPage';
import OneSlotFactory from './components/OneSlotFactory';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
          <OneSlotFactory>
            <MainPage />
          </OneSlotFactory>
      </ApplicationProvider>
    </>
  );
}
