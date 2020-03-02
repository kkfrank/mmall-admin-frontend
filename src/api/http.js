import axios from 'axios'
import { createHashHistory } from 'history';
const history = createHashHistory();

const request = (method = 'GET', url, params = {}, data = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: method,
            params: params,
            data: data,
            // headers,
        }).then(res => {
            if(res.data.status === 10){
               window.localStorage.removeItem('current_user')
               // window.location.href = `${BASE_URL}login`
               history.push('login');
            }else if(res.data.status === 0){
                resolve(res.data)
            }else{
                //alert(res.data.msg)
                reject({
                    message: res.data.msg
                })
            }
        })
        .catch(error => {
          //  alert(error.message)
            reject(error);
        });
    });
};

let isProd = false;
if(typeof process !== 'undefined'){
    isProd = process.env.NODE_ENV === 'production'
}

const corsUrl = 'https://cors-anywhere.herokuapp.com/'
// const corsUrl = 'https://crossorigin.me/'
const apiUrl = 'http://admintest.happymmall.com'


const connection = {
    post(url, data, params){
        if(isProd){
            url = corsUrl + apiUrl + url
            // url = apiUrl + url
        }
        return request('POST', url, params, data)
    },
    get(url, params = {}){
        if(isProd){
            url = corsUrl + apiUrl + url
            // url = apiUrl + url
        }
        return request('GET', url, params)
    }
}

export default connection

