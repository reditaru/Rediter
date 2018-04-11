export default {
    getAuth() {
        return localStorage.getItem('token');
    },
    setAuth(token, type='Bearer') {
        localStorage.setItem('token', `${type} ${token}`);
    },
    clearAuth() {
        localStorage.clear()
    }
}