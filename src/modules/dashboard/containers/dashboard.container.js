import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ChildrenRouter from '../../../router/children.router';
import { childrenRoute } from '../../../utils/router.utils';
import { LayoutComp, AvatarComp, AffixComp, IconComp } from '../../../components/components';
import Menu from '../../../components/menu.component';
import { getUser, logout } from '../../user/actions/user.actions';
import { getChallenge } from '../../challenge/actions/actions';
import { getContext } from "../../context/actions/actions";
import '../style/style.css';
const { Content, Header, Sider } = LayoutComp;


class DashboardContainer extends React.Component{

    componentWillMount(){
        this.props.dispatch(getUser());
        this.props.dispatch(getContext());
        this.props.dispatch(getChallenge());
    }

    logout = ()=>{
        this.props.dispatch(logout());
    }

    render(){
        const { photo, firstName } = this.props.userData;

        const itemsHeaderMenu=[
            {
                content:<span><AvatarComp size="medium" src={ photo } icon="user" />  {firstName}</span>
            },  
            {
                content: <div onClick={this.logout}>Sair</div>
            }
        ]

        const itemsSiderMenu=[ 
            {
                content:<Link to={childrenRoute('dashboard','context').path}>
                            <IconComp type="book"  />Contextos
                        </Link>            
            }, 
            {
                content:<Link to={childrenRoute('dashboard','challenge').path}>
                           <IconComp type="build"/> Desafios
                        </Link>
            }
        ];

        return(
            <div>
                    <LayoutComp className="dashboard">
                        <AffixComp>
                            <Header className="header">
                                <div className="logo"></div>
                                <Menu extraProp={{'className':'menu', 'selectable':false}} mode="horizontal" theme="dark" items={itemsHeaderMenu} />
                            </Header>
                        </AffixComp>
                        <LayoutComp className="body">
                            <Sider className="sider">
                                <Menu extraProp={{'className':'menu'}} mode="vertical" theme="dark" items={itemsSiderMenu} />
                            </Sider>
                            <Content className="content">
                                <ChildrenRouter parent="dashboard" />
                            </Content>
                        </LayoutComp>
                    </LayoutComp>   
            </div>
        );
    }
}

const mapStateToProps = (state)=>({
    userData: state.user.userData,
});

export default connect(mapStateToProps)(DashboardContainer);