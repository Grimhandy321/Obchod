
export const loginForm =  {
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value : string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value: string) => (value ? null : "Can't be empty"),
        },
    }
