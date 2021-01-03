export const routes = {
    toHome: '/home',
    toLogin: '/login',
    toUserPage: (userId: number) => `/user/${userId}`,
    toWaitingPage: '/waiting',
}
