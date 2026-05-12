import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </StrictMode>,
);
