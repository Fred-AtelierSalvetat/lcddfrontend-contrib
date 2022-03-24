export type CognitoUser = {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    locale?: string;
    sub: string;
};

export type CurrentUser = {
    userId: UserId;
    email: string;
    emailVerified: string;
    lastName: string;
    firstName: string;
    city: string;
};

export const getUserFromCognitoUser: (cognitoUser: CognitoUser) => CurrentUser = (cognitoUser) => {
    const user = {
        userId: cognitoUser.sub,
        email: cognitoUser.email,
        emailVerified: cognitoUser.email_verified,
        lastName: cognitoUser.family_name,
        firstName: cognitoUser.given_name,
        city: cognitoUser.locale,
    };

    return user;
};
