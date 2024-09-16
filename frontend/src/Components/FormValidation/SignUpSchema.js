import *as Yup from 'yup';
export const signUpSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 charachters').required('Password is required'),
    matchingPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
})