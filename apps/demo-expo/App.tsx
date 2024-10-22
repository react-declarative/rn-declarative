import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { OneSlotFactory } from 'rn-declarative-eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import * as eva from '@eva-design/eva';

import MainPage from './pages/MainPage';

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
