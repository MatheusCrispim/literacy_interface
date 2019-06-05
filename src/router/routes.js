const routes = 
[
    {
        name: 'root',
        component: 'pages/login.page',
        path: '/',
        auth: false,
        exact: true
    },    
    {
        name: 'dashboard',
        component: 'pages/dashboard.page',
        path: '/dashboard',
        auth: true,
        children: [
            {
                name: 'homeDash',
                component: 'pages/context.page',
                path: '/dashboard',
                exact: true,
                auth: true,
            },
            {
                name: 'context',
                component: 'pages/context.page',
                path: '/dashboard/context',
                auth: true,
            },
            {
                name: 'challenge',
                component: 'pages/challenge.page',
                path: '/dashboard/challenge',
                auth: true,
            }
        ]
    },
    {
        name: 'signup',
        component: 'pages/signup.page',
        path: '/signup',
        auth: false,
    },
    {
        name: 'login',
        component: 'pages/login.page',
        path: '/login',
        auth: false,
    },

]

export default routes;