import { Service } from "../services/service";

export async function isAuthenticated(){
    
    let response = Service.get('/users/profile');
    if(response.status === 401){
        return false;
    }
    return true;
}


export function setToken(token){
    window.localStorage.setItem('token', token);
}


export function getToken(){
    return window.localStorage.getItem('token');    
}