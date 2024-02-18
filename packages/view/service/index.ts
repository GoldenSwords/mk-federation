import { setupWorker } from 'msw/browser';

import handler from './module';

const worker = setupWorker(...handler);

export default worker;
