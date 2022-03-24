import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import reducer from './reducer';
import * as action from './constants/actionTypes';
import * as status from './constants/status';

import topics from '~/Components/shared/thematiques';
import { intervenants, refLegifrance } from '~/Components/dashboard/shared/WkspForm';
import { SORT_DEFAULT_VALUE } from './constants/orderBy';

const emptyStore = {
  workshops: [],
  searchFilter: '',
  orderBy: SORT_DEFAULT_VALUE,
};

const testDB = [
  {
    id: '0',
    status: status.INCOMING,
    thumbnail: '',
    video: 'videourl',
    title: 'Le droit et le dev',
    startingdate: new Date(),
    speakers: [intervenants[0].value],
    topics: [topics[0].title, topics[1].title],
    refsLegifrance: [refLegifrance[0].value],
    description: 'Enfin un premier atelier sur le droit et le dev!',
    keywords: ['Droit', 'Dev'],
    files: [],
    links: [],
  },
  {
    id: '1',
    status: status.LIVE,
    thumbnail: '',
    video: 'videourl',
    title: "Le droit aujourd'hui, maintenant tout de suite, live quoi!",
    startingdate: new Date(),
    speakers: [intervenants[1].value],
    topics: [topics[2].title, topics[3].title, topics[4].title],
    refsLegifrance: [refLegifrance[1].value],
    description:
            ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.',
    keywords: [],
    files: [],
    links: [],
  },
  {
    id: '2',
    status: status.PUBLISHED,
    thumbnail: 'https://test-for-front-video-thumbnails-ex.s3.eu-west-3.amazonaws.com/justice-balance.jpg',
    video: 'videourl',
    title: 'Le droit hier, un atelier publié...',
    startingdate: new Date(),
    speakers: [intervenants[0].value, intervenants[1].value],
    topics: [topics[5].title, topics[6].title, topics[7].title],
    refsLegifrance: [refLegifrance[2].value],
    description: 'Heeuu',
    keywords: ['test'],
    files: [],
    links: [],
  },
  {
    id: '3',
    status: status.ARCHIVED,
    thumbnail: 'https://test-for-front-video-thumbnails-ex.s3.eu-west-3.amazonaws.com/archive.jpg',
    video: 'videourl',
    title: 'Le droit et le dev',
    startingdate: new Date(),
    speakers: [],
    topics: [topics[8].title, topics[9].title],
    refsLegifrance: [],
    description: 'Enfin un premier atelier sur le droit et le dev!',
    keywords: ['> /dev/null 2>&1'],
    files: [],
    links: [],
  },
  {
    id: '4',
    status: status.UNPUBLISHED,
    thumbnail: 'https://test-for-front-video-thumbnails-ex.s3.eu-west-3.amazonaws.com/marteau.jpg',
    video: 'videourl',
    title: 'Justice: le marteau ça compte?',
    startingdate: new Date(),
    speakers: [],
    topics: [],
    refsLegifrance: [],
    description: 'Bien choisir son marteau',
    keywords: ['Justice', 'Marteau'],
    files: [],
    links: [],
  },
];

describe("Workshops' reducer ", () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(emptyStore);
  });
  it('should init workshops state upon fetch', () => {
    expect(reducer(deepFreeze(emptyStore), { type: action.FETCH_WORKSHOPS, workshops: testDB })).to.deep.equal({
      ...emptyStore,
      workshops: testDB,
    });
  });
  it('should create new workshop', () => {
    expect(reducer(deepFreeze(emptyStore), { type: action.CREATE_WORKSHOP, workshop: testDB[1] })).to.deep.equal({
      ...emptyStore,
      workshops: [testDB[1]],
    });
  });
  it('should update existing workshop', () => {
    const updateWorkshop = { ...testDB[0], title: 'TEST UPDATE' };
    const targetState = [updateWorkshop, ...testDB.slice(1)];

    const stateAfterFetch = reducer(deepFreeze(emptyStore), { type: action.FETCH_WORKSHOPS, workshops: testDB });
    expect(
      reducer(deepFreeze(stateAfterFetch), { type: action.UPDATE_WORKSHOP, workshop: updateWorkshop }),
    ).to.deep.equal({
      ...emptyStore,
      workshops: targetState,
    });
  });
  it('should cancel workshop', () => {
    const stateAfterFetch = reducer(deepFreeze(emptyStore), { type: action.FETCH_WORKSHOPS, workshops: testDB });
    expect(reducer(deepFreeze(stateAfterFetch), { type: action.CANCEL_WORKSHOP, id: '0' })).to.deep.equal({
      ...emptyStore,
      workshops: testDB.slice(1),
    });
  });
  it('should delete workshop', () => {
    const stateAfterFetch = reducer(deepFreeze(emptyStore), { type: action.FETCH_WORKSHOPS, workshops: testDB });
    const targetState = [...testDB];
    targetState.splice(2, 1);
    expect(reducer(deepFreeze(stateAfterFetch), { type: action.DELETE_WORKSHOP, id: '2' })).to.deep.equal({
      ...emptyStore,
      workshops: targetState,
    });
  });
  it('should manage go live action', () => {
    const stateAfterFetch = reducer(deepFreeze(emptyStore), { type: action.FETCH_WORKSHOPS, workshops: testDB });
    const targetState = [{ ...testDB[0], status: status.LIVE }, ...testDB.slice(1)];
    expect(reducer(deepFreeze(stateAfterFetch), { type: action.GO_LIVE_WORKSHOP, id: '0' })).to.deep.equal({
      ...emptyStore,
      workshops: targetState,
    });
  });
  it('should manage end live action', () => {
    const stateAfterFetch = reducer(deepFreeze(emptyStore), { type: action.FETCH_WORKSHOPS, workshops: testDB });
    const targetState = [testDB[0], { ...testDB[1], status: status.UNPUBLISHED }, ...testDB.slice(2)];
    expect(reducer(deepFreeze(stateAfterFetch), { type: action.END_LIVE_WORKSHOP, id: '1' })).to.deep.equal({
      ...emptyStore,
      workshops: targetState,
    });
  });
  it('should allow to archive a workshop', () => {
    const stateAfterFetch = reducer(deepFreeze(emptyStore), { type: action.FETCH_WORKSHOPS, workshops: testDB });
    const targetState = [testDB[0], testDB[1], testDB[2], { ...testDB[3], status: status.ARCHIVED }, testDB[4]];
    expect(reducer(deepFreeze(stateAfterFetch), { type: action.ARCHIVE_WORKSHOP, id: '3' })).to.deep.equal({
      ...emptyStore,
      workshops: targetState,
    });
  });
  it('should allow to restore a workshop', () => {
    const stateAfterFetch = reducer(deepFreeze(emptyStore), { type: action.FETCH_WORKSHOPS, workshops: testDB });
    const targetState = [...testDB.slice(0, 4), { ...testDB[4], status: status.PUBLISHED }];
    expect(reducer(deepFreeze(stateAfterFetch), { type: action.RESTORE_WORKSHOP, id: '4' })).to.deep.equal({
      ...emptyStore,
      workshops: targetState,
    });
  });
  it('should allow to update the search filter', () => {
    const search_filter = 'TEST SEARCH FILTER';
    expect(
      reducer(deepFreeze(emptyStore), { type: action.SET_WORKSHOP_SEARCH_FILTER, search_filter }),
    ).to.deep.equal({
      ...emptyStore,
      searchFilter: search_filter,
    });
  });

  it('should allow to change the orderBy criteria', () => {
    const orderBy = 'TEST ORDER CRITERIA CHANGE';
    expect(reducer(deepFreeze(emptyStore), { type: action.SET_ORDER_BY, orderBy })).to.deep.equal({
      ...emptyStore,
      orderBy,
    });
  });
});
