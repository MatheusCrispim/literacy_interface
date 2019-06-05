import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { route } from "../utils/router.utils";
import { Switch, Route } from 'react-router-dom'

import { dynamicImport } from '../utils/router.utils';

class ChildrenRouter extends Component{

    childrenRoutes = route(this.props.parent).children;

    routes = this.childrenRoutes.map((route)=>{
        let component = dynamicImport(route.component);
        return <Route exact={ route.exact } key={ route.name } path={ route.path }  component={ component } />

      });
    
    render(){
        return(
            <Switch>
                {this.routes}
            </Switch>
        );
    }
}

ChildrenRouter.propTypes = {
    parent: PropTypes.string.isRequired
}

export default ChildrenRouter;