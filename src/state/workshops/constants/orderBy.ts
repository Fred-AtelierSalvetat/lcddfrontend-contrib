import { statusOrder } from './status';

export const SORT_DEFAULT_VALUE = 'status';

export const sortFct = {
    title: (a, b): number => a.title.localeCompare(b.title),
    status: (a, b): number => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
};

export const sortOptions = Object.keys(sortFct);
