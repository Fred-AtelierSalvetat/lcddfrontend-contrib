import '@testing-library/jest-dom';
import {
  screen, render, act, waitFor,
} from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter, Route } from 'react-router-dom';
import { rootReducer, reducersList } from '~/state/reducers';
import { fakeDatabase } from '~/api/fetchWorkshops'; // Temp dependency, shall belong to test when api will be implemented

import EditWorkshop from './EditWorkshop';

describe("<EditWorkshop />' should", () => {
  let store;

  beforeEach(() => {
    const globalStates = {};
    // Prepare store with test workshops data set
    for (const prop of Object.getOwnPropertyNames(reducersList)) {
      globalStates[prop] = undefined;
    }
    globalStates.workshops = {
      workshops: fakeDatabase,
    };
    store = configureMockStore([thunk])(rootReducer(globalStates, { type: undefined }));
  });

  it.todo('renders without crashing');

  // <Provider store={store}>
  //     <MemoryRouter initialEntries={['/editWorkshop/0']}>
  //         <Route path="/editWorkshop/:id">
  //             <EditWorkshop />
  //         </Route>
  //     </MemoryRouter>
  // </Provider>,

  it.todo('should present a form');
  it.todo('shall contain two buttons "Modifier l\'atelier", one "Annuler l\'atelier" and one "Annuler"');
  it.todo('\'s button "Modifier l\'atelier", shall dispatch an UPDATE_WORKSHOP action');
  it.todo("'s button 'Annuler atelier', shall dispatch a CANCEL_WORKSHOP action");
  it.todo("'s button 'Annuler', shall restore all fields initial content");
  it.todo('should match its reference snapshot');
});
