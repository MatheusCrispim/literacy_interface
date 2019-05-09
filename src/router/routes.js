const routes = 
[
    {
        name: 'root',
        component: 'pages/context.page',
        path: '/',
        auth: true,
        exact: true
    },
    {
        name: 'challenge',
        component: 'pages/challenge.page',
        path: '/challenge',
        auth: true,
        exact: true
    },
    {
        name: 'signup',
        component: 'pages/signup.page',
        path: '/signup',
        auth: true,
        exact: true
    },
    {
        name: 'login',
        component: 'pages/login.page',
        path: '/login',
        auth: true,
        exact: true
    },

]

export default routes;