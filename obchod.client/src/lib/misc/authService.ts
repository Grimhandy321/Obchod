export const authService = {
    getToken: () => sessionStorage.getItem("token"),
    setToken: (token: string) => sessionStorage.setItem("token", token),
    clearToken: () => sessionStorage.removeItem("token"),
    isLoggedIn: () => !(sessionStorage.getItem("token") === null),
};
