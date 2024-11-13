import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Index from '../src/assets/Index'; // Path updated to reference the src folder
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Index />
  </StrictMode>
);
