import React from 'react';
import { mount } from 'enzyme';
import { screen, render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import { rootReducer, reducersList } from '~/state/reducers';
import Workshops from './Workshops';
import WorkshopCard from './WorkshopCard';

import { fakeDatabase } from '~/api/fetchWorkshops'; // Temp dependency, shall belong to test when api will be implemented
import { SORT_DEFAULT_VALUE } from '~/state/workshops/constants/orderBy';

jest.mock('./WorkshopCard');

describe('<Workshops /> ', () => {
  let store;
  const globalStates = {};
  const mockStore = configureMockStore([thunk]);
  const cardMockText = 'WORKSHOP_CARD_COMPONENT';

  beforeEach(() => {
    // Prepare store with test workshops data set
    for (const prop of Object.getOwnPropertyNames(reducersList)) {
      globalStates[prop] = undefined;
    }
    globalStates.workshops = {
      workshops: fakeDatabase,
      searchFilter: '',
      orderBy: SORT_DEFAULT_VALUE,
    };
    store = mockStore(rootReducer(globalStates, { type: undefined }));

    // Unit testing -> isolate component
    WorkshopCard.mockImplementation(({ workshop: { title, ..._others } }) => (
            <div title={title}>{cardMockText}</div>
    ));
  });

  it('renders without crashing', () => {
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/workshops']}>
                    <Route path="/workshops">
                        <Workshops />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
  });
  it('shall display workshops cards', () => {
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/workshops']}>
                    <Route path="/workshops">
                        <Workshops />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    const cards = screen.getAllByText(cardMockText, { exact: false });
    expect(cards).to.have.length(fakeDatabase.length);
  });
  it('shall filter workshops according to search filter', () => {
    globalStates.workshops.searchFilter = 'marteau'; // 1 workshop
    store = mockStore(rootReducer(globalStates, { type: undefined }));
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/workshops']}>
                    <Route path="/workshops">
                        <Workshops />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    const cards = screen.getAllByText(cardMockText, { exact: false });
    expect(cards).to.have.length(1);
  });
  it('shall order workshops according to orderBy criteria', () => {
    globalStates.workshops.workshops[0].title = 'E';
    globalStates.workshops.workshops[1].title = 'C';
    globalStates.workshops.workshops[2].title = 'D';
    globalStates.workshops.workshops[3].title = 'A';
    globalStates.workshops.workshops[4].title = 'B';
    globalStates.workshops.orderBy = 'title';
    store = mockStore(rootReducer(globalStates, { type: undefined }));
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/workshops']}>
                    <Route path="/workshops">
                        <Workshops />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    const cards = screen.getAllByText(cardMockText, { exact: false });
    expect(cards[0].title).toContain('A');
    expect(cards[1].title).toContain('B');
    expect(cards[2].title).toContain('C');
    expect(cards[3].title).toContain('D');
    expect(cards[4].title).toContain('E');
  });

  it('shall url query param orderBy in place of local state as ordering criteria if param exists', () => {
    globalStates.workshops.workshops[0].title = 'E';
    globalStates.workshops.workshops[1].title = 'C';
    globalStates.workshops.workshops[2].title = 'D';
    globalStates.workshops.workshops[3].title = 'A';
    globalStates.workshops.workshops[4].title = 'B';
    globalStates.workshops.orderBy = 'status';
    const realStore = createStore(rootReducer, globalStates, applyMiddleware(thunk));
    render(
            <Provider store={realStore}>
                <MemoryRouter initialEntries={['/workshops?orderBy=title']}>
                    <Route path="/workshops">
                        <Workshops />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    const cards = screen.getAllByText(cardMockText, { exact: false });
    expect(cards[0].title).toContain('A');
    expect(cards[1].title).toContain('B');
    expect(cards[2].title).toContain('C');
    expect(cards[3].title).toContain('D');
    expect(cards[4].title).toContain('E');
  });
  it('should match its reference snapshot', () => {
    const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter keyLength={0} initialEntries={['/workshops']}>
                    <Route path="/workshops">
                        <Workshops />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(wrapper).to.matchSnapshot();
  });
});
