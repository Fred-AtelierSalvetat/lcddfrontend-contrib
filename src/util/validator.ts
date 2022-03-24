const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+(?:(\s|\.|-|\.\s)[A-Za-zÀ-ÖØ-öø-ÿ\s]+)*$/;
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
// const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
// const PASSWORD_PATTERN_ONE_NUMBER = /^(?=.*[0-9])$/;
const PHONE_NUMBER_PATTERN = /^\d{9}$/;

const validator = {
    firstName: {
        required: 'Le prénom est requis',
        minLength: {
            value: 2,
            message: 'Le prénom doit contenir au moins 2 caractères',
        },
        maxLength: {
            value: 30,
            message: 'Le prénom ne doit pas dépasser 30 caractères',
        },
        pattern: {
            value: NAME_PATTERN,
            message: 'Le prénom ne doit pas contenir des numéros et des caractères spéciaux',
        },
    },
    lastName: {
        required: {
            value: true,
            message: 'Le nom est requis',
        },
        pattern: {
            value: NAME_PATTERN,
            message: 'Le nom ne doit pas contenir des numéros et des caractères spéciaux',
        },
        minLength: {
            value: 2,
            message: 'Le nom doit contenir au moins 2 caractères',
        },
        maxLength: {
            value: 30,
            message: 'Le nom ne doit pas dépasser 30 caractères',
        },
    },
    email: {
        required: {
            value: true,
            message: "L'adresse e-mail est requise",
        },
        pattern: {
            value: EMAIL_PATTERN,
            message: 'Entrer une addresse e-mail valide (Ex: exemple@xxx.xx)',
        },
    },
    password: {
        required: {
            value: true,
            message: 'Le mot de passe est requis',
        },
        validate: {
            required: (value: string): boolean => /./.test(value),
            oneLowerCase: (value: string): boolean => /[a-z]/.test(value), // || "one lowercase",
            oneUpperCase: (value: string): boolean => /[A-Z]/.test(value), // || "one uppercase",
            oneDigit: (value: string): boolean => /\d/.test(value), // || "one digit",
            oneSpecial: (value: string): boolean => /[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value), // || "one special",
            minLength: (value: string): boolean => /.{8,}/.test(value), // || "At least 8 characters"
        },
        // minLength: {
        //     value: 8,
        //     message: "Au moins 8 caractères"
        // },
        // pattern:
        // {
        //     value: PASSWORD_PATTERN,
        //     message: "Le mot de passe doit contenir au minimum 8 caractères, à savoir : " +
        //         "au moins 1 lettre minuscule et 1 lettre majuscule, 1 caractère spécial et 1 chiffre"
        // },
    },
    phone_number: {
        required: {
            value: true,
            message: 'Entrer le numéro de téléphone',
        },
        pattern: {
            value: PHONE_NUMBER_PATTERN,
            message: 'Le numéro de téléphone doit contenir des nombres',
        },
    },
    contactSubject: {
        required: {
            value: true,
            message: 'Le sujet est requis',
        },
        minLength: {
            value: 2,
            message: 'Le sujet doit contenir au moins 2 caractères',
        },
        maxLength: {
            value: 100,
            message: 'Le sujet ne doit pas dépasser 100 caractères',
        },
    },
    contactMessage: {
        required: {
            value: true,
            message: 'Le message est requis',
        },
        minLength: {
            value: 2,
            message: 'Le message doit contenir au moins 2 caractères',
        },
        maxLength: {
            value: 300,
            message: 'Le message ne doit pas dépasser 300 caractères',
        },
    },
    loginPassword: {
        required: {
            value: true,
            message: 'Le mot de passe est requis',
        },
    },
    city: {
        required: {
            value: true,
            message: 'Ville est requis',
        },
    },
    metiers: {
        required: {
            value: true,
            message: 'Le metier est requis',
        },
    },
    bio: {
        required: {
            value: true,
            message: 'La biographie est requis',
        },
        maxLength: {
            value: 200,
            message: 'Le message ne doit pas dépasser 200 caractères',
        },
    },
    workshopTitle: {
        required: 'Champ obligatoire',
        maxLength: {
            value: 255,
            message: 'Le titre ne doit pas dépasser 255 caractères.',
        },
    },
    workshopTimestamp: {
        required: 'Champ obligatoire',
    },
    workshopSpeakers: {
        validate: (list: { value: string; label: string }[]): boolean | string =>
            (list && !!list.length) || 'Champ obligatoire',
    },
    workshopTopics: {
        validate: (list: { value: string; label: string }[]): boolean | string =>
            (list && !!list.length) || 'Champ obligatoire',
    },
    workshopRefsLegifrance: {
        validate: (): boolean => true,
    },
    workshopDescription: {
        required: 'Champ obligatoire',
    },
    workshopKeywords: {
        validate: (): boolean => true,
    },
    workshopUploads: {
        validate: (): boolean => true,
    },
    workshopLinks: {
        validate: (): boolean => true,
    },
};

export default validator;
