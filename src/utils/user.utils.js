import { Service } from "../services/service";
const { get } = new Service();

export async function isAuthenticated(){
    let response = await get('/users/profile');
    if(response.status === 200){
        return true;
    }
    return false;
}

export function unsetToken(){
    window.localStorage.removeItem('token');
}


export function setToken(token){
    window.localStorage.setItem('token', token);
}


export function getToken(){
    return window.localStorage.getItem('token');    
}