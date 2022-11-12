import React, { useRef } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authServices'



import bgImg from "../../assets/images/gloom.jpg"
import './Auth.css'
const ForgetPassword = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const password = useRef({});
    password.current = watch("password", "")
    const onSubmit = async (userData) => {
        try {
            const email = localStorage.getItem("email")
            userData.email = email
            const data = await AuthService.changePassword(userData)
            localStorage.removeItem("email")
            if (data.status == true) {
                navigate('/login')
            } else {
                console.log("ghhhhhh");
            }

        } catch (err) {
            console.log(err);
        }

    }
    return (
        <section className="App">
            <div className="register">
                <div className="col-1">
                    <h2 className="forget2" style={{ color: 'green' }}>Forget Password</h2>
                    <form
                        id="form"
                        className='flex flex-col f2'

                        onSubmit={handleSubmit(onSubmit)}>
                        <input type='password' placeholder='password'{...register('password',
                            {
                                required: "Password is required",
                                minLength: { value: 5, message: "Password should be 5 characters long" },
                            })} />
                        {errors.password && <p className='error'>{errors.password.message}</p>}
                        <input type="text" placeholder='confirm password' {...register("confirm", {
                            required: "Password is required",
                            validate: (value) =>
                                value === password.current || "Password do not match"
                        })} />
                        {errors.password && <p className='error'>{errors.password.message}</p>}
                        <button className='btn'>Submit</button>
                    </form>
                </div>
                <div className='col-2'>
                    <img src={bgImg} alt='Failed to load the image' />
                </div>

            </div>

        </section>
    )

}
export default ForgetPassword