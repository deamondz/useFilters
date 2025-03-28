import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

const $root = document.getElementById('root');

if (!$root) {
    throw new Error('no root node');
}

createRoot($root).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
