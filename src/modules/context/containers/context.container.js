import React from 'react';
import ContextTable from './context-list.container';
import ContextRegister from './context-register.container';
import { DrawerComp, ButtonComp, IconComp } from '../../../components/components';
import '../style/style.css';

class ContextContainer extends React.Component{

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
                    <IconComp type="plus" /> Novo contexto
                </ButtonComp>
                <DrawerComp
                       title="Criar novo contexto"
                       width={480}
                       onClose={this.onClose}
                       visible={this.state.visible}>
                    <ContextRegister />
                </DrawerComp>
                <ContextTable />
            </div>
        );
    }
}

export default ContextContainer;