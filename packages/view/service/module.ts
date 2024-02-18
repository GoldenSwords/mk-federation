import { HttpResponse, http } from 'msw';

import { IRoute, IRouteDataModel, IRoutes } from '../src/model';

const base: IRoutes = {
  component: {
    label: '组件库',
    url: 'http://localhost:4001',
    modules: { './Test': [], './Button': [], './Context': [] },
  },
};

const routes: IRoute[] = [
  {
    id: '1',
    path: 'home',
    scope: 'component',
    url: 'http://',
    module: './Home',
    subModule: 'Home',
    parent: '',
  },
  {
    id: '2',
    path: 'home',
    scope: 'component',
    url: 'http://',
    module: './Path',
    subModule: 'Path',
    parent: '1',
  },
];

export default [
  http.get('/module', async () => {
    console.log('/module');
    return HttpResponse.json({ code: 200, message: 'ok', payload: base });
  }),

  http.post<{ id: string }, IRoutes>('/module/register', async ({ request }) => {
    const body = await request.json();
    console.log('/module/register', body);

    Object.keys(body).forEach((acc) => {
      base[acc] = body[acc];
    });

    return HttpResponse.json({ code: 200, message: 'ok' });
  }),

  http.patch<{ id: string }, IRouteDataModel>('/module/:id', async ({ params: { id }, request }) => {
    const body = await request.json();
    console.log('/module/update', id, body);
    base[id] = body;
    return HttpResponse.json({ code: 200, message: 'ok' });
  }),

  http.get('/route', async () => {
    return HttpResponse.json({ code: 200, message: 'ok', payload: routes });
  }),
  http.post<{ id: string }, IRoute>('/route/add', async ({ params: { id }, request }) => {
    const body = await request.json();
    console.log('/route/add', id, body);
    routes.push(body);
    return HttpResponse.json({ code: 200, message: 'ok' });
  }),
];
