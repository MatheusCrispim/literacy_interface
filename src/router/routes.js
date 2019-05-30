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
        name: 'dashboard',
        component: 'pages/dashboard.page',
        path: '/dashboard',
        auth: true,
        children: [
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
        auth: true,
    },
    {
        name: 'login',
        component: 'pages/login.page',
        path: '/login',
        auth: true,
    },

]

export default routes;