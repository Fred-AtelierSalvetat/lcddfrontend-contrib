import { createSelector } from '@reduxjs/toolkit';
import type { WorkshopsState, Workshop, SearchFilter, OrderBy } from './model';
import { sortFct } from './constants/orderBy';

const allWorkshopsSelector = (state: WorkshopsState): Workshop[] => state.workshops;
export const searchFilterSelector = (state: WorkshopsState): SearchFilter => state.searchFilter;
export const getWorkshopById = (state: WorkshopsState, id: Workshop.id): Workshop =>
    state.workshops.filter((workshop) => workshop.id === id)[0];
export const isWorkshopStoreInialized = (state: WorkshopsState): boolean => !!state.workshops.length;
export const getOrderBy = (state: WorkshopsState): OrderBy => state.orderBy;

export const getWorkshops = createSelector(
    allWorkshopsSelector,
    searchFilterSelector,
    getOrderBy,
    (workshops, search_filter, orderBy) =>
        workshops
            .filter(
                (workshop) =>
                    workshop.title.toLowerCase().includes(search_filter.toLowerCase()) ||
                    workshop.keywords.join().toLowerCase().includes(search_filter.toLowerCase()),
            )
            .sort(sortFct[orderBy]),
);
