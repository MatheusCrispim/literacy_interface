import React from 'react';
import { connect } from 'react-redux'; 
import {FormComp, InputComp, ButtonComp} from '../../../components/components';
import { login } from '../actions/user.actions';
import { route } from '../../../utils/router.utils';
import '../style/style.css';

const FormItem = FormComp.Item;

class LoginContainer extends React.Component{

    handleLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields((error, payload) => {
            if (!error) {
                this.props.dispatch(login(payload));
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;

        return(
        
                <FormComp className="form loginForm">
                    <FormItem>
                        <span className="description">Sisalfa</span>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: <div className="error">Por favor, insira o email!</div> }],
                        })(
                            <InputComp placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message:  <div className="error">Por favor, insira a senha!</div> }],
                        })(
                            <InputComp.Password  placeholder="Senha"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <ButtonComp className="loginBtn" type="primary" onClick={this.handleLogin} loading={this.props.loading}>
                            Login
                        </ButtonComp>
                    </FormItem>
                    <FormItem>
                        <ul className="list">
                            <li className="li">Não tem conta? Crie uma <a href={route('signup').path}>aqui</a></li>
                        </ul>
                        <div className="loginFail">{this.props.loginFeedback}</div>
                    </FormItem>
                </FormComp>
            
            )
    }
}

const mapStateToProps = (state) => ({
    loginFeedback: state.user.loginFeedback,
    loading: state.user.loading
});
 

export default connect(mapStateToProps)(FormComp.create()(LoginContainer));