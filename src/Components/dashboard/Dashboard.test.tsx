import React, { Suspense } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { MemoryRouter, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import UserManagement from './usermanagement/UserManagement';

import { rootReducer, reducersList } from '~/state/reducers';

jest.mock('./usermanagement/UserManagement');

describe('<Dashboard />', () => {
  let store;
  beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    const undefinedGlobalState = {};
    for (const prop of Object.getOwnPropertyNames(reducersList)) {
      undefinedGlobalState[prop] = undefined;
    }
    store = mockStore(rootReducer(undefinedGlobalState, { type: undefined }));

    UserManagement.mockImplementation(() => <div id="TEST-TARGET">{testPage}</div>);
  });

  it('contains 3 navigation links', () => {
    const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <Route path="/dashboard" exact>
                        <Dashboard />
                    </Route>
                </MemoryRouter>
                ,
            </Provider>,
    );
    expect(wrapper.find('input')).to.have.length(3);
  });
  it('contains a link to /dashboard/newWorkshop', () => {
    const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <Route path="/dashboard" exact>
                        <Dashboard />
                    </Route>
                </MemoryRouter>
                ,
            </Provider>,
    );
    expect(wrapper.find('input').find({ value: '/dashboard/newWorkshop' })).to.exist;
  });
  it('contains a link to /dashboard/users', () => {
    const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <Route path="/dashboard" exact>
                        <Dashboard />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(wrapper.find('input').find({ value: '/dashboard/users' })).to.exist;
  });
  it('contains a link to /dashboard/newWorkshop', () => {
    const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <Route path="/dashboard" exact>
                        <Dashboard />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(wrapper.find('input').find({ value: '/dashboard/newWorkshop' })).to.exist;
  });
  it('contains a link to /dashboard/workshops', () => {
    const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <Route path="/dashboard" exact>
                        <Dashboard />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(wrapper.find('input').find({ value: '/dashboard/workshops' })).to.exist;
  });

  it("shall use route's location to activate the corresponding 'input' and display contents", () => {
    const testPage = 'UserManagementTESTPAGE';
    const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard/users']}>
                    <Route path="/dashboard/users" exact>
                        <Suspense fallback={<p>"Loading"</p>}>
                            <Dashboard />
                        </Suspense>
                    </Route>
                </MemoryRouter>
                ,
            </Provider>,
    );
    console.log('WRAPPER =', wrapper.debug());
    expect(wrapper.find('input').filter({ value: '/dashboard/users' })).to.have.length(1);
    expect(wrapper.find('input').filter({ value: '/dashboard/users' }).at(0).props().checked).to.equal(true);

    expect(wrapper.find('#TEST-TARGET').childAt(0)).to.contain(testPage);
  });

  it('should match its reference snapshot', () => {
    const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[{ pathname: '/dashboard', key: 'testKey' }]}>
                    <Route path="/dashboard" exact>
                        <Dashboard />
                    </Route>
                </MemoryRouter>
                ,
            </Provider>,
    );
    expect(wrapper).to.matchSnapshot();
  });
});
