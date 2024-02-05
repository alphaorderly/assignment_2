// src/mocks/browser.ts
import { setupServer } from 'msw/node';
import handlers from './handlers';

export default setupServer(...handlers);
