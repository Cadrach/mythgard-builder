import { notification } from 'antd';
import React from 'react';

const axios = require('axios');

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_ROOT,
    mode: 'no-cors',
    withCredentials: true,
})

/**
 * Intercept axios errors to notify everything
 */
instance.interceptors.response.use(response => response, function (error) {
    //log the error
    console.error("AXIOS RESPONSE ERROR", error.response);

    //Retrieve status
    const status = error.response && error.response.status ? error.response.status:'???';
    let message;

    if(status === 401){
        //Not authenticated
        message = <span>You must be <a href="/auth">logged-in</a> to access this page</span>;
    }
    else if(status>=400 && error.response && error.response.data && error.response.data.message){
        //Other errors
        message = error.response.data.message;
    }

    //If we have a message, notify
    if(message){
        notification.error({
            className: "error-server",
            message,
            duration: 0,
        })
    }
    return Promise.reject(error.response);
});

export default instance;