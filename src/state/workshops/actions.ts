import * as action from './constants/actionTypes';
import * as status from './constants/status';
import * as api from '~/api/fetchWorkshops';
import type { Speaker, Topic, RefLegiFrance, KeyWord, File, Link, Workshop, SearchFilter, OrderBy } from './model';
import type { AppDispatchType } from '../store';

export const fetchWorkshops: (dispatch: AppDispatchType) => void = (dispatch) => {
    const workshops = api.fetchWorkshops();
    return dispatch({
        type: action.FETCH_WORKSHOPS,
        workshops,
    });
};

export const newWorkshop: (newWorkshop: {
    title: string;
    startingdate: date;
    endingdate: date;
    speakers: Speaker[];
    topics: Topic[];
    refsLegifrance: RefLegiFrance[];
    description: string;
    keywords: KeyWord[];
    files: File[];
    links: Link[];
}) => void =
    ({ title, startingdate, endingdate, speakers, topics, refsLegifrance, description, keywords, files, links }) =>
    (dispatch) => {
        const newWorkshop = api.postNewWorkshop({
            status: status.INCOMING,
            title,
            startingdate,
            endingdate,
            speakers,
            topics,
            refsLegifrance,
            description,
            keywords,
            files,
            links,
        });
        dispatch({
            type: action.CREATE_WORKSHOP,
            workshop: newWorkshop,
        });
    };

export const updateWorkshop: (workshop: Workshop) => void = (workshop) => (dispatch) => {
    api.updateWorkshop(workshop);
    dispatch({
        type: action.UPDATE_WORKSHOP,
        workshop,
    });
};

export const setWorkshopSearchFilter = (
    search_filter: SearchFilter,
): { type: typeof action.SET_WORKSHOP_SEARCH_FILTER; search_filter: SearchFilter } => ({
    type: action.SET_WORKSHOP_SEARCH_FILTER,
    search_filter,
});

export const setOrderBy = (orderBy: OrderBy): { type: typeof action.SET_ORDER_BY; orderBy: OrderBy } => ({
    type: action.SET_ORDER_BY,
    orderBy,
});

export const cancelWorkshop =
    (id: Workshop.id): void =>
    (dispatch) => {
        api.deleteWorkshop(id);
        dispatch({
            type: action.CANCEL_WORKSHOP,
            id,
        });
    };

export const deleteWorkshop =
    (id: Workshop.id): void =>
    (dispatch) => {
        api.deleteWorkshop(id);
        dispatch({
            type: action.DELETE_WORKSHOP,
            id,
        });
    };

// TODOFSA Update status on API
export const archiveWorkshop = (id: Workshop.id): { type: typeof action.ARCHIVE_WORKSHOP; id: Workshop.id } => ({
    type: action.ARCHIVE_WORKSHOP,
    id,
});
export const restoreWorkshop = (id: Workshop.id): { type: typeof action.RESTORE_WORKSHOP; id: Workshop.id } => ({
    type: action.RESTORE_WORKSHOP,
    id,
});

export const goLive = (id: Workshop.id): { type: typeof action.GO_LIVE_WORKSHOP; id: Workshop.id } => ({
    type: action.GO_LIVE_WORKSHOP,
    id,
});

export const endLive = (id: Workshop.id): { type: typeof action.END_LIVE_WORKSHOP; id: Workshop.id } => ({
    type: action.END_LIVE_WORKSHOP,
    id,
});
