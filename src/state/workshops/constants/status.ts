export const INCOMING = 'A venir' as const;
export const LIVE = 'EN DIRECT' as const;
export const UNPUBLISHED = 'Inédit' as const;
export const PUBLISHED = 'Publié' as const;
export const ARCHIVED = 'Archivé' as const;

export const statusOrder = [INCOMING, LIVE, UNPUBLISHED, PUBLISHED, ARCHIVED];
export type WorkshopStatusType = typeof INCOMING | typeof LIVE | typeof PUBLISHED | typeof ARCHIVED;
