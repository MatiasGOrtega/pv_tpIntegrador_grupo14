import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Theme } from '@radix-ui/themes';
import './index.css';
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Theme>
        <App />
      </Theme>
    </BrowserRouter>
  </StrictMode>,
)
