import React from 'react';
import ChallengeTable from './challenge-list.container';
import ChallengeRegister from './challenge-register.container';
import { DrawerComp, ButtonComp, IconComp } from '../../../components/components';
import '../style/style.css';

class ChallengeContainer extends React.Component{

    state = { visible: false };

    showDrawer = () => {
        this.setState({
        visible: true,
        });
    };

    onClose = () => {
        this.setState({
        visible: false,
        });
    };

    render(){
        return(
            <div className="container"> 
                <ButtonComp className="button drawer-button" type="primary" onClick={this.showDrawer}>
                    <IconComp type="plus" /> Novo desafio
                </ButtonComp>
                <DrawerComp
                       title="Criar novo desafio"
                       width={480}
                       onClose={this.onClose}
                       visible={this.state.visible}>
                    <ChallengeRegister />
                </DrawerComp>
                <ChallengeTable />
            </div>
        );
    }
}

export default ChallengeContainer;