import AuthService from "../../services/authServices"

export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'

export const login = (params, navigate) => {
    return async (dispatch) => {
        try {
            const data = await AuthService.login(params)
            dispatch({ type: LOGIN, payload: data })
            if (data.status == true) {
                navigate(`/profile/${data._id}`);
                return data
            } else {
                return data
            }
        } catch (error) {

            console.log(error);
        }

    }
}
export const registers = (params, navigate) => {
    return async (dispatch) => {
        try {
            const data = await AuthService.register(params)
            dispatch({ type: REGISTER, payload: data })
            if (data.status == true) {
                localStorage.setItem('token', data.token)
                navigate('/')
                return data
            } else {
                return data
            }
        } catch (error) {

        }
    }
}
