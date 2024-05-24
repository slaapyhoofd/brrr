import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
