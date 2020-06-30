import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import NavigationService from './NavigationService';


// const BASE_URL = 'https://d9212ae3e9af.ngrok.io';

const BASE_URL = 'https://planr-api-dev.herokuapp.com';

const axios_instance = axios.create({
    baseURL: BASE_URL,
});

axios_instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response.status === 401) {
        AsyncStorage.removeItem('userToken')
            .then(() => {
                NavigationService.navigate('Auth')
            })
        Toast.show({
            text: "Please login again ",
            duration: 5000,
            type: 'danger',
            buttonText: 'okay'
        })
    } else {
        Toast.show({
            text: error.response.data.message || "Something went wrong: " + error.response.status,
            duration: 5000,
            type: 'danger',
            buttonText: 'okay'
        })
    }
    return Promise.reject(error);
});

export const axiosPost = async (url, data = null, sendToken = true) => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    if (sendToken) options['headers']['Authentication'] = await AsyncStorage.getItem('userToken');

    return axios_instance.post(url, data, options);
}


export const axiosGet = async (url, params = null, sendToken = true) => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    if (params) options['params'] = params;
    if (sendToken) options['headers']['Authentication'] = await AsyncStorage.getItem('userToken');

    return axios_instance.get(url, options);
}