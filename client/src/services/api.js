import axios from "axios";

export default axios.create({
    baseURL:"https://www.gloomchat.ml",
    headers:{
        'Accept': 'application/json'
    }
})