export const ROLE_ADMIN = 'Admin';
export const ROLE_SPEAKER_AWAITING_ANSWER = 'Intervenant, en attente';
export const ROLE_SPEAKER_AWAITING_VALIDATION = 'Intervenant, à valider';
export const ROLE_SPEAKER = 'Intervenant';
export const ROLE_PRO_USER = 'Pro du droit';
export const ROLE_STUDENT = 'Etudiant';
export const ROLE_CITIZEN = 'Citoyen';

export const ADMIN_ROLE_KEY = 'admin';
export const SPEAKER_ROLE_KEY = 'speaker';
export const USER_ROLE_KEY = 'user';

const ADMIN_TAB_ROLE_FILTER = [ROLE_ADMIN];
const SPEAKER_TAB_ROLE_FILTER = [ROLE_SPEAKER_AWAITING_ANSWER, ROLE_SPEAKER_AWAITING_VALIDATION, ROLE_SPEAKER];
const USERS_TAB_ROLE_FILTER = [
    ROLE_PRO_USER,
    ROLE_STUDENT,
    ROLE_CITIZEN,
    ROLE_SPEAKER_AWAITING_ANSWER,
    ROLE_SPEAKER_AWAITING_VALIDATION,
    ROLE_SPEAKER,
];

export const roleFilterMap = {
    [ADMIN_ROLE_KEY]: ADMIN_TAB_ROLE_FILTER,
    [SPEAKER_ROLE_KEY]: SPEAKER_TAB_ROLE_FILTER,
    [USER_ROLE_KEY]: USERS_TAB_ROLE_FILTER,
};
