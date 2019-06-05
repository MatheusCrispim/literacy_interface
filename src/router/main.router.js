import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes';
import { dynamicImport, route, routeByPath } from '../utils/router.utils';
import { redirect } from '../utils/url.utils';
import { isAuthenticated } from '../utils/user.utils';

class MainRouter extends Component{

    constructor(props){
        super(props);
        isAuthenticated().then(response=>{
            let currentPath = `/${window.location.pathname.split('/')[1]}`;
            let currentRoute = routeByPath(currentPath);
        
            if(currentRoute !== undefined){
                if(currentRoute.auth){
                    if(!response){  
                        redirect(route('login').path);
                    }
                }else{
                    if(response){
                        if(currentRoute.name === route('login').name | 
                            currentRoute.name === route('signup').name |
                            currentRoute.name === route('root').name ){
                            redirect(route('dashboard').path);
                        }
                    }
                }
            }
            
        })   
    }

    routes = routes.map((route)=>{
        let component = dynamicImport(route.component);
        return <Route exact={ route.exact } key={ route.name } path={ route.path }  component={ component } />
    });
    
    render(){
        return(
            <Router>
                <Switch>
                    {this.routes}
                </Switch>
            </Router>
        );
    }
}

export default MainRouter;