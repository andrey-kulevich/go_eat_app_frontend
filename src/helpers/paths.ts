export const routes = {
    toHome: '/home',
    toLogin: '/login',
    userPage: `/user/:userId`,
    toUserPage: (userId: number) => `/user/${userId}`,
    toWaitingPage: '/waiting',
}
