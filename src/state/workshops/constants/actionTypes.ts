export const FETCH_WORKSHOPS = 'FETCH_WORKSHOPS' as const;
export const CREATE_WORKSHOP = 'CREATE_WORKSHOP' as const;
export const UPDATE_WORKSHOP = 'UPDATE_WORKSHOP' as const;
export const CANCEL_WORKSHOP = 'CANCEL_WORKSHOP' as const;
export const DELETE_WORKSHOP = 'DELETE_WORKSHOP' as const;
export const ARCHIVE_WORKSHOP = 'ARCHIVE_WORKSHOP' as const;
export const RESTORE_WORKSHOP = 'RESTORE_WORKSHOP' as const;
export const GO_LIVE_WORKSHOP = 'GO_LIVE_WORKSHOP' as const;
export const END_LIVE_WORKSHOP = 'END_LIVE_WORKSHOP' as const;
export const SET_WORKSHOP_SEARCH_FILTER = 'SET_WORKSHOP_SEARCH_FILTER' as const;
export const SET_ORDER_BY = 'SET_ORDER_BY' as const;

export type WorkshopsActionType =
    | typeof FETCH_WORKSHOP
    | typeof CREATE_WORKSHOP
    | typeof UPDATE_WORKSHOP
    | typeof CANCEL_WORKSHOP
    | typeof DELETE_WORKSHOP
    | typeof ARCHIVE_WORKSHOP
    | typeof RESTORE_WORKSHOP
    | typeof GO_LIVE_WORKSHOP
    | typeof END_LIVE_WORKSHOP
    | typeof SET_WORKSHOP_SEARCH_FILTER
    | typeof SET_ORDER_BY;
