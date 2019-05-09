import React from 'react';
import { connect } from 'react-redux'; 
import {FormComp, InputComp, ButtonComp} from '../../../components/components';
import { login } from '../actions/user.actions';


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

        return(<FormComp style={{width:300}}>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Por favor, insira o email!' }],
                        })(
                            <InputComp />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message:  'Por favor, insira a senha!' }],
                        })(
                            <InputComp.Password />
                        )}
                    </FormItem>
                    <FormItem>
                        <ButtonComp type="primary" onClick={this.handleLogin} loading={this.props.loading}>
                            Login
                        </ButtonComp>
                    </FormItem>
                    <div>{this.props.loginFeedback}</div>
                </FormComp>)
    }
}

const mapStateToProps = (state) => ({
    loginFeedback: state.user.loginFeedback,
    loading: state.user.loading
});
 

export default connect(mapStateToProps)(FormComp.create()(LoginContainer));