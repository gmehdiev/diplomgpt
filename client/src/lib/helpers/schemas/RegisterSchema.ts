import * as yup from "yup"

export const registerSchema = yup.object({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    passwordRepeat: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required("Required"),})