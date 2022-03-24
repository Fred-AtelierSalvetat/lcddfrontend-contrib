import * as action from './constants/actionTypes';
import * as api from '~/api/fetchTopics';
import type { Topic } from './model';
// import type { AppDispatchType } from '../store';

export const fetchWorkshops: (dispatch: AppDispatchType) => void = (dispatch) => {
  const workshops = api.fetchWorkshops();
  return dispatch({
    type: action.FETCH_WORKSHOPS,
    workshops,
  });
};
