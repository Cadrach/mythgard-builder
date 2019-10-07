const axios = require('axios');

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_ROOT,
    mode: 'no-cors',
    withCredentials: true,
})

export default instance;