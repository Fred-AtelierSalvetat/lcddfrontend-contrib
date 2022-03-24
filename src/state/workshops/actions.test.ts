import { expect } from 'chai';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import * as types from './constants/actionTypes';
import * as status from './constants/status';
import * as api from '~/api/fetchWorkshops'; // Temp dependency, fakeDB should belong top tests after implementation
import topics from '~/Components/shared/thematiques'; // Temp dependency, same as upper
import { intervenants } from '~/Components/dashboard/shared/WkspForm'; // Temp dependency, same as upper
import { refLegifrance } from '~/Components/dashboard/shared/WkspForm'; // Temp dependency, same as upper
import { SORT_DEFAULT_VALUE } from './constants/orderBy';

describe("Workshops' action ", () => {
  const sandbox = sinon.createSandbox();
  beforeEach(() => sandbox.spy(api));
  afterEach(() => sandbox.restore());

  it('fetchWorkshops should fetch workwhops and create an action to init local state', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    store.dispatch(actions.fetchWorkshops);
    expect(api.fetchWorkshops.calledOnce).to.equal(true);
    expect(store.getActions()[0]).to.nested.include({
      type: types.FETCH_WORKSHOPS,
      workshops: api.fakeDatabase,
    });
  });
  it('newWorkshop should create a new workwhop and create an action to add it to local state', () => {
    const newWorkshop = {
      title: 'TEST',
      startingdate: 'STARTING Bad comparison due to conversion of Date to JSON then replace with string',
      endingdate: 'ENDING Bad comparison due to conversion of Date to JSON then replace with string',
      speakers: [intervenants[0].value],
      topics: [topics[0].title, topics[1].title],
      refsLegifrance: [refLegifrance[0].value],
      description: 'Enfin un premier atelier sur le droit et le dev!',
      keywords: ['Droit', 'Dev'],
      files: ['file1', 'Secondfile'],
      links: [
        {
          title: 'url title A',
          url: 'urlA:://',
        },
        {
          title: 'url title B',
          url: 'urlB:://',
        },
      ],
    };
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    store.dispatch(actions.newWorkshop(newWorkshop));
    const action = store.getActions()[0];
    expect(api.postNewWorkshop.calledOnce).to.equal(true);
    expect(action)
      .excludingEvery('id')
      .to.deep.nested.include({
        type: types.CREATE_WORKSHOP,
        workshop: { ...newWorkshop, status: status.INCOMING },
      });
    expect(action.workshop).to.have.property('id');
    expect(action.workshop.id).to.be.a('string');
  });

  it('updateWorkshop should update workshop on backend and create an action to update local state', () => {
    let workshop = {
      id: 'MYID',
      title: 'TEST',
      startingdate: 'STARTING Bad comparison due to conversion of Date to JSON then replace with string',
      endingdate: 'ENDING Bad comparison due to conversion of Date to JSON then replace with string',
      speakers: [intervenants[0].value],
      topics: [topics[0].title, topics[1].title],
      refsLegifrance: [refLegifrance[0].value],
      description: 'Enfin un premier atelier sur le droit et le dev!',
      keywords: ['Droit', 'Dev'],
      files: ['file1', 'Secondfile'],
      links: [
        {
          title: 'url title A',
          url: 'urlA:://',
        },
        {
          title: 'url title B',
          url: 'urlB:://',
        },
      ],
    };
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({ workshops: [workshop] });
    workshop = {
      ...workshop,
      title: 'UPDATED TEST',
      startingdate: 'UPDATED STARTING Bad comparison due to conversion of Date to JSON then replace with string',
      endingdate: 'UPDATED ENDING Bad comparison due to conversion of Date to JSON then replace with string',
      speakers: [intervenants[1].value],
      topics: [topics[2].title, topics[3].title],
      refsLegifrance: [refLegifrance[1].value],
      description: 'UPDATED Enfin un premier atelier sur le droit et le dev!',
      keywords: ['UPDATED Droit', 'UPDATED Dev'],
      files: ['UPDATED file1', 'UPDATED Secondfile'],
      links: [
        {
          title: 'UPDATED url title A',
          url: 'UPDATED urlA:://',
        },
        {
          title: 'UPDATED url title B',
          url: 'UPDATED urlB:://',
        },
      ],
    };
    store.dispatch(actions.updateWorkshop(workshop));
    const action = store.getActions()[0];
    expect(api.updateWorkshop.calledOnce).to.equal(true);
    expect(action).to.deep.nested.include({
      type: types.UPDATE_WORKSHOP,
      workshop,
    });
  });

  it('setWorkshopSearchFilter should update local state search filter relative to workshops', () => {
    const search_filter = 'Something';
    expect(actions.setWorkshopSearchFilter(search_filter)).to.deep.equal({
      type: types.SET_WORKSHOP_SEARCH_FILTER,
      search_filter,
    });
  });

  it('setOrderBy should update local state sort criteria relative to workshops', () => {
    const orderBy = 'NEW SORTING CRITERIA';
    expect(actions.setOrderBy(orderBy)).to.deep.equal({
      type: types.SET_ORDER_BY,
      orderBy,
    });
  });
  it('cancelWorkshop should cancel workwhop and create an action to update local state accordingly', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({ workshops: api.fakeDatabase });
    const { id } = api.fakeDatabase[0];
    store.dispatch(actions.cancelWorkshop(id));
    expect(api.deleteWorkshop.calledOnce).to.equal(true);
    expect(store.getActions()[0]).to.deep.equal({
      type: types.CANCEL_WORKSHOP,
      id,
    });
  });
  it('deleteWorkshop should delete workwhop and create an action to update local state accordingly', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({ workshops: api.fakeDatabase });
    const { id } = api.fakeDatabase[0];
    store.dispatch(actions.deleteWorkshop(id));
    expect(api.deleteWorkshop.calledOnce).to.equal(true);
    expect(store.getActions()[0]).to.deep.equal({
      type: types.DELETE_WORKSHOP,
      id,
    });
  });
  it("archiveWorkshop should change workshop's status to ARCHIVED and create an action to update local state accordingly", () => {
    const id = 'targetID';
    expect(actions.archiveWorkshop(id)).to.deep.equal({
      type: types.ARCHIVE_WORKSHOP,
      id,
    });
  });
  it("restoreWorkshop should change workshop's status to PUBLISHED and create an action to update local state accordingly", () => {
    const id = 'targetID';
    expect(actions.restoreWorkshop(id)).to.deep.equal({
      type: types.RESTORE_WORKSHOP,
      id,
    });
  });
  it("goLive should change workshop's status to LIVE and create an action to update local state accordingly", () => {
    const id = 'targetID';
    expect(actions.goLive(id)).to.deep.equal({
      type: types.GO_LIVE_WORKSHOP,
      id,
    });
  });
  it("endLive should change workshop's status to UNPUBLISHED and create an action to update local state accordingly", () => {
    const id = 'targetID';
    expect(actions.endLive(id)).to.deep.equal({
      type: types.END_LIVE_WORKSHOP,
      id,
    });
  });
});
