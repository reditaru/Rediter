export default {
    getAuth(){
        return sessionStorage.getItem('token');
    },
    setAuth(token,type='Bearer'){
        sessionStorage.setItem('token',`${type} ${token}`);
    },
    clearAuth(){
        sessionStorage.clear()
    }
}