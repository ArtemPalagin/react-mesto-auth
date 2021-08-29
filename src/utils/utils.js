export const handleStatus = resp => {
    if (resp.ok) {
        return resp.json()
    }
    return Promise.reject(resp)
}
export const findToken = () => {
    if(localStorage.getItem('token')){
        return localStorage.getItem('token');
    }
    return null;
}