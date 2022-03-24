export const SUCCESS = 'SUCCESS' as const;
export const FAILURE = 'FAILURE' as const;

export type AlertsType = typeof SUCCESS | typeof FAILURE;
