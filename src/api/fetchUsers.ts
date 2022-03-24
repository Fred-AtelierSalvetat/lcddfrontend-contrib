import * as userModel from '../state/users/constants/roles';
import * as userStatus from '../state/users/constants/status';
import { User, UserUpdate } from '../state/users/model';

export const fakeDatabase: User[] = [
    {
        user_id: 0,
        firstname: 'François',
        lastname: 'Dupont',
        phone: '0102030405',
        email_pro: '',
        email: 'francois.dupont@free.fr',
        email_verified: false,
        town: 'Paris',
        status: userStatus.INACTIVE,
        role: userModel.ROLE_SPEAKER,
    },
    {
        user_id: 1,
        firstname: 'Michel',
        lastname: 'Petit',
        phone: '0607080910',
        email_pro: '',
        email: 'michel.petit@etu-univ.fr',
        email_verified: false,
        town: 'Grenoble',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_PRO_USER,
    },
    {
        user_id: 2,
        firstname: 'Albert',
        lastname: 'Dupont',
        phone: '111122224444',
        email_pro: 'Albert@avocat.fr',
        email: 'albert.dupont@gmail.com',
        email_verified: false,
        town: 'Marseille',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_STUDENT,
    },
    {
        user_id: 3,
        firstname: 'Camille',
        lastname: 'Martin',
        phone: '987654321',
        email_pro: 'Camille.Martin@pro.com',
        email: '',
        email_verified: false,
        town: 'Marseille',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_CITIZEN,
    },
    {
        user_id: 4,
        firstname: 'Admin',
        lastname: 'ROOT',
        phone: '987654321',
        email_pro: 'admin@root.com',
        email: '',
        email_verified: false,
        town: '@',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_ADMIN,
    },
    {
        user_id: 5,
        firstname: 'Albert',
        lastname: 'Endormi',
        phone: '987654321',
        email_pro: 'albert@lcdd.com',
        email: '',
        email_verified: false,
        town: 'Toulouse',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_SPEAKER_AWAITING_ANSWER,
    },
    {
        user_id: 6,
        firstname: 'Martin',
        lastname: 'Impatient',
        phone: '987654321',
        email_pro: 'martin@lcdd.com',
        email: '',
        email_verified: false,
        town: 'Nantes',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_SPEAKER_AWAITING_VALIDATION,
    },
    {
        user_id: 20,
        firstname: 'François2',
        lastname: 'Dupont',
        phone: '0102030405',
        email_pro: '',
        email: 'francois.dupont@free.fr',
        email_verified: false,
        town: 'Paris',
        status: userStatus.INACTIVE,
        role: userModel.ROLE_SPEAKER,
    },
    {
        user_id: 21,
        firstname: 'Michel2',
        lastname: 'Petit',
        phone: '0607080910',
        email_pro: '',
        email: 'michel.petit@etu-univ.fr',
        email_verified: false,
        town: 'Grenoble',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_PRO_USER,
    },
    {
        user_id: 22,
        firstname: 'Albert2',
        lastname: 'Dupont',
        phone: '111122224444',
        email_pro: 'Albert@avocat.fr',
        email: 'albert.dupont@gmail.com',
        email_verified: false,
        town: 'Marseille',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_STUDENT,
    },
    {
        user_id: 23,
        firstname: 'Camille2',
        lastname: 'Martin',
        phone: '987654321',
        email_pro: 'Camille.Martin@pro.com',
        email: '',
        email_verified: false,
        town: 'Marseille',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_CITIZEN,
    },
    {
        user_id: 24,
        firstname: 'Admin2',
        lastname: 'ROOT',
        phone: '987654321',
        email_pro: 'admin@root.com',
        email: '',
        email_verified: false,
        town: '@',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_ADMIN,
    },
    {
        user_id: 25,
        firstname: 'Albert2',
        lastname: 'Endormi',
        phone: '987654321',
        email_pro: 'albert@lcdd.com',
        email: '',
        email_verified: false,
        town: 'Toulouse',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_SPEAKER_AWAITING_ANSWER,
    },
    {
        user_id: 26,
        firstname: 'Martin2',
        lastname: 'Impatient',
        phone: '987654321',
        email_pro: 'martin@lcdd.com',
        email: '',
        email_verified: false,
        town: 'Nantes',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_SPEAKER_AWAITING_VALIDATION,
    },
    {
        user_id: 30,
        firstname: 'François3',
        lastname: 'Dupont',
        phone: '0102030405',
        email_pro: '',
        email: 'francois.dupont@free.fr',
        email_verified: false,
        town: 'Paris',
        status: userStatus.INACTIVE,
        role: userModel.ROLE_SPEAKER,
    },
    {
        user_id: 31,
        firstname: 'Michel3',
        lastname: 'Petit',
        phone: '0607080910',
        email_pro: '',
        email: 'michel.petit@etu-univ.fr',
        email_verified: false,
        town: 'Grenoble',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_PRO_USER,
    },
    {
        user_id: 32,
        firstname: 'Albert3',
        lastname: 'Dupont',
        phone: '111122224444',
        email_pro: 'Albert@avocat.fr',
        email: 'albert.dupont@gmail.com',
        email_verified: false,
        town: 'Marseille',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_STUDENT,
    },
    {
        user_id: 33,
        firstname: 'Camille3',
        lastname: 'Martin',
        phone: '987654321',
        email_pro: 'Camille.Martin@pro.com',
        email: '',
        email_verified: false,
        town: 'Marseille',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_CITIZEN,
    },
    {
        user_id: 34,
        firstname: 'Admin3',
        lastname: 'ROOT',
        phone: '987654321',
        email_pro: 'admin@root.com',
        email: '',
        email_verified: false,
        town: '@',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_ADMIN,
    },
    {
        user_id: 35,
        firstname: 'Albert3',
        lastname: 'Endormi',
        phone: '987654321',
        email_pro: 'albert@lcdd.com',
        email: '',
        email_verified: false,
        town: 'Toulouse',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_SPEAKER_AWAITING_ANSWER,
    },
    {
        user_id: 36,
        firstname: 'Martin3',
        lastname: 'Impatient',
        phone: '987654321',
        email_pro: 'martin@lcdd.com',
        email: '',
        email_verified: false,
        town: 'Nantes',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_SPEAKER_AWAITING_VALIDATION,
    },
    {
        user_id: 37,
        firstname: 'Irina',
        lastname: 'Seoutkine',
        phone: '987654321',
        email_pro: '',
        email: 'iseoutkina@gmail.com',
        town: 'Antibes',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_SPEAKER_AWAITING_ANSWER,
    },
    {
        user_id: 38,
        firstname: 'MAY',
        lastname: 'MAY',
        phone: '987654321',
        email_pro: '',
        email: 'mthuaung@groupeastek.fr',
        town: 'Antibes',
        status: userStatus.ACTIVE,
        role: userModel.ROLE_SPEAKER_AWAITING_ANSWER,
    },
];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUsers = () => (): Promise<User[]> =>
    delay(100).then(
        () =>
            // if (Math.random() > 0.7) {
            //     throw new Error("Pas de panique, c'est une erreur simulée (taux d'occurence 50%).");
            // }
            fakeDatabase,
    );

export const updateUser = (id: number, userUpdate: UserUpdate) => (): Promise<void | User[]> =>
    delay(100).then(() => {
        // if (Math.random() > 0.5) {
        //     throw new Error("Pas de panique, c'est une erreur simulée (taux d'occurence 50%).");
        // }
        const user = fakeDatabase.find((user) => user.user_id === id);
        if (user === undefined) {
            throw new Error(`UserId ${id} not found. Can't perform status update.`);
        }

        fakeDatabase = fakeDatabase.map((user) => (user.user_id !== id ? user : { ...user, ...userUpdate }));
    });

export const deleteUser = (id: number) => (): Promise<void | User[]> =>
    delay(100).then(() => {
        // if (Math.random() > 0.5) {
        //     throw new Error("Pas de panique, c'est une erreur simulée (taux d'occurence 50%).");
        // }
        const user = fakeDatabase.find((user) => user.user_id === id);
        if (user === undefined) {
            throw new Error(`UserId ${id} not found. Can't perform delete user.`);
        }
        fakeDatabase = fakeDatabase.filter((user) => user.user_id !== id);
    });

export function findUserByEmail(email: User.email): User.role | undefined {
    const user = fakeDatabase.find((user) => user.email === email);
    if (user !== undefined) {
        return user.role;
    }
    return undefined;
}
