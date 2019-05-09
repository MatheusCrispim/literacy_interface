import React from 'react';
import ChallengeRegister from '../containers/challenge-register.container';
import ChallengeTable from '../containers/challenge-list.container';

class ContextLayout extends  React.Component{

    render(){

        return(
            <div>
                <ChallengeRegister />
                <ChallengeTable />
            </div>
        );
    }
}

export default ContextLayout;