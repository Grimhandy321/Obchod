
const validatePassword = (value: string) => {
    console.log('asd')
    if (!value) return "Can't be empty";
    if (value.length < 8) return "Must be at least 8 characters long";
    if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
    if (!/[a-z]/.test(value)) return "Must contain at least one lowercase letter";
    if (!/[0-9]/.test(value)) return "Must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Must contain at least one special character";
    return null;
};

export const registrationForm = {
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        passwordHash: '',
    },

    validate: {
        firstName: (value : string) => (value ? null : "Can't be empty"),
        lastName: (value: string) => (value ? null : "Can't be empty"),
        email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        passwordHash: validatePassword,
    },
    }

