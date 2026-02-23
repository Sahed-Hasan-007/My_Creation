import { useForm } from 'vee-validate'
import * as yup from 'yup'

export function useLoginForm() {
    const { defineField, handleSubmit, resetForm, errors, setErrors } = useForm({
        validationSchema: yup.object({
            email: yup
                .string()
                .required('Email is required')
                .email('Please enter a valid email address')
                .label('Email'),
            password: yup
                .string()
                .required('Password is a required field')
                .min(8, 'Password must be at least 8 characters')
                .label('Password'),
        }),
    })

    const [email] = defineField('email')
    const [password] = defineField('password')

    return {
        errors,
        handleSubmit,
        resetForm,
        setErrors,
        email,
        password,
    }
}