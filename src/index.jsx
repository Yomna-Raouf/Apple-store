import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import App from '@/app/App';
import { StateProvider } from '@/app/providers/StateProvider';
import reducer, { initialState } from '@/store/reducer';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </StrictMode>,
);
