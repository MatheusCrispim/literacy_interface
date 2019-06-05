import React from 'react';
import { connect } from 'react-redux';
import ContextTable from './context-list.container';
import ContextRegister from './context-register.container';
import { DrawerComp, ButtonComp, IconComp } from '../../../components/components';
import '../style/style.css';

class ContextContainer extends React.Component{

    state = { visible: false };

    componentDidUpdate(prevProps, prevState){
        if(prevProps.requested !== this.props.requested){
            if(this.props.requested){
                if(this.props.success){
                    this.setState({visible:false});
                }
            }            
        }
    }
    
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
            <div className="container context">
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

const mapStateToProps = (state) => ({
    requested: state.context.requested,
    success: state.context.success,
});

export default connect(mapStateToProps)(ContextContainer)
