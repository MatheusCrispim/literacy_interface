import React from 'react';
import ContextTable from '../containers/context-list.container';
import ContextRegister from '../containers/context-register.container';


class ContextLayout extends  React.Component{

    render(){

        return(
            <div>
                <ContextRegister />
                <ContextTable />
            </div>
        );
    }
}

export default ContextLayout;