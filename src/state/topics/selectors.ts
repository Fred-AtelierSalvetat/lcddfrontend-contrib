import type { TopicsState, Topic } from './model';
import type { TopicActionType } from './constants/actionTypes';

export const allTopicsSelector = (state: TopicsState): Topic[] => state.topics;

export const isRequestInProgress = (state: TopicsState, request_type: TopicActionType): boolean => state.inProgressRequests.includes(request_type);
