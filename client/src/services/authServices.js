import API from "./api"

const AuthService = {
    login: async (userData) => {
        try {
            const { data } = await API.post("/login", userData);
            API.defaults.headers['Authorization'] = `Bearer ${data.token}`
            return data;
        } catch (err) {
            throw err;
        }

    },

    register: async (userData) => {
        try {
            const { data } = await API.post("/register", userData);
            return data;
        } catch (err) {
            throw err;
        }
    },

    otpSend: async (number) => {
        try {
            const { data } = await API.post('/otp', number);
            return data
        } catch (er) {
            throw er;
        }

    },

    otpVerify: async (userData) => {
        try {
            const { data } = await API.post('/otpverify', { number: userData.number, otp: userData.otp });

            return data
        } catch (err) {
            throw err;
        }
    },

    sendEmailOtp: async (userData) => {
        try {
            const { data } = await API.post("/sendemail", { email: userData.email })
            return data
        } catch (er) {
            throw er;
        }
    },

    verifyEmail: async (userData) => {
        try {
            const { data } = await API.post("/emailverify", { email: userData.email, otp: userData.otp })
            return data
        } catch (err) {
            throw err;
        }
    },

    changePassword: async (userData) => {
        try {
            const { data } = await API.post("/changepassword", { email: userData.email, password: userData.password })
            return data
        } catch (er) {
            throw er
        }

    },

    checkError: async (userData) => {
        try {
            const { data } = await API.post('/checkerror', { email: userData.email, password: userData.password })
            return data
        } catch (er) {
            console.log(er);
        }
    }
    ,

    

    logout: () => { }
};

export default AuthService;