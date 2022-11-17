import axios from "axios";
import API from "./api"
const UserService = {

    friendsCount: async (userId) => {
        try {
            const { data } = await API.get("/totalfriends/" + userId)
            return data
        } catch (er) {
            console.log(er);
        }
    },

    findUserProfile: async (userId) => {
        try {
            const { data } = await API.get("/userprofile/" + userId)
            return data
        } catch (er) {
            console.log(er);
        }
    },

    friendBlock: async (userId, friendId) => {
        try {
            const { data } = await API.post("/block", { userId: userId, friendId: friendId })
            return data
        } catch (er) {
            throw er;
        }
    },
    findBlock: async (userId, friendId) => {
        try {
            const { data } = await API.post('/findblock', { userId: userId, friendId: friendId })
            return data
        } catch (e) {
            throw e;
        }
    },

    uploadImg: async (upload) => {
        try {
            const config = {
                headers: {
                    "Content-Type": 'multipart/form-data',
                },
            };
            const { data } = await axios.post('http://localhost:4500/uploadimg', upload, config)
            return data
        } catch (er) {
            throw er
        }
    }
    ,

    userImage: async (userId) => {
        try {
            const { data } = await API.get('/image/' + userId)
            return data
        } catch (er) {
            throw er
        }
    }
}
export default UserService;