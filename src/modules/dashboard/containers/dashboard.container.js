import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ChildrenRouter from '../../../router/children.router';
import { childrenRoute } from '../../../utils/router.utils';
import { LayoutComp, AvatarComp } from '../../../components/components';
import Menu from '../../../components/menu.component';
import { getUser } from '../../user/actions/user.actions';
import { Affix } from 'antd';
const { Content, Header, Sider } = LayoutComp;

class DashboarContainer extends React.Component{

    constructor(props){
        super(props)
        props.dispatch(getUser());
    }

    render(){
        const { photo, firstName } = this.props.userData;

        const itemsHeaderMenu=[
            {
                content: <span>Sisalfa</span>,
            },
            {
                content:<span><AvatarComp shape="square" size="medium" src={ photo } icon="user" />  {firstName}</span>
            },  

            {
                content: "Sair"
            }
        ]

        const itemsSiderMenu=[  
        {
            content:<Link to={childrenRoute('dashboard','context').path}>
                        Contexto
                    </Link>            
        }, 
        {
            content:<Link to={childrenRoute('dashboard','challenge').path}>
                        Desafio
                    </Link>
        }];

        return(
            <LayoutComp style={{ minHeight: '100vh' }}>
                <Affix>
                    <Header>
                        <Menu extraProp={{'style':{ lineHeight: '64px', float:'left' }, 'selectable':false}} mode="horizontal" theme="dark" items={itemsHeaderMenu} />
                    </Header>
                </Affix>
                <LayoutComp style={{ minHeight: '100vh' }}>
                    <Sider>
                        <Menu mode="vertical" theme="dark" items={itemsSiderMenu} />
                    </Sider>
                    <Content style={{ padding: '50pxx 50px', height: '500px' }}>
                        <ChildrenRouter parent="dashboard" />
                    </Content>
                </LayoutComp>

            </LayoutComp>   
        );
    }
}

const mapStateToProps = (state)=>({
    userData: state.user.userData,
});

export default connect(mapStateToProps)(DashboarContainer);