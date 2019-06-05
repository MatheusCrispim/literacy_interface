import React from 'react';
import { connect } from 'react-redux'; 
import {FormComp, InputComp, ButtonComp} from '../../../components/components';
import { signup } from '../actions/user.actions';
import Uploader from '../../../components/upload.component';
import { getBase64 } from '../../../utils/file.utils';
import { route } from '../../../utils/router.utils';
import '../style/style.css';

const FormItem = FormComp.Item;

class SignupContainer extends React.Component{

    componentDidUpdate(){
    }

    setField = (file)=>{
        getBase64(file, (base64)=>{
            this.props.form.setFieldsValue({'photo': base64})
        })
    }

    handleSignup = (e) => {
        e.preventDefault();
        this.props.form.validateFields((error, payload) => {
            if (!error) {
                this.props.dispatch(signup(payload));
            }
        });
    }

    render(){

        const { getFieldDecorator } = this.props.form;

        return(<FormComp className="form signup" hideRequiredMark>

                    <FormItem>
                        <span className="description">Sisalfa</span>
                    </FormItem>
                    <FormItem className="form upload">
                        {getFieldDecorator('photo', {  
                            rules: [{ required: false, message:  <div className="error">Por favor, insira a imagem!</div> }],
                        })(
                            <Uploader 
                                numberOfFiles={1}
                                uploadertype="picture-card"
                                fileTypeAllowed={['image/jpeg', 'image/png']}
                                errorMessage="O arquivo deve ser uma imagem"
                                data={this.setField} />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('firstName', {
                            rules: [{ required: true, message: <div className="error">Por favor, insira o nome!</div> }],
                        })(
                            <InputComp placeholder="Nome"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('lastName', {
                            rules: [{ required: true, message: <div className="error">Por favor, insira o sobrenome!</div> }],
                        })(
                            <InputComp placeholder="Sobrenome" />
                        )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: <div className="error">Por favor, insira o username!</div> }],
                        })(
                            <InputComp placeholder="Username"/>
                        )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: <div className="error">Por favor, insira o email!</div> }],
                        })(
                            <InputComp placeholder="Email"/>
                        )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message:  <div className="error">Por favor, insira a senha!</div> }],
                        })(
                            <InputComp.Password  placeholder="Senha"/>
                        )}
                    </FormItem>
                    <FormItem >
                        <ButtonComp loading={this.props.loading} className="form btnSignup" type="primary" onClick={this.handleSignup}>
                            Cadastrar-se
                        </ButtonComp>
                    </FormItem>

                    <FormItem>
                        <ul className="list">
                            <li className="li">Já tem uma conta? Conecte-se <a href={route('login').path}>aqui</a></li>
                        </ul>
                        <div className="signupFail">{this.props.signupFeedback}</div>
                    </FormItem>
                </FormComp>)
    }
}

const mapStateToProps = (state) => ({
    signupFeedback: state.user.signupFeedback,
    loading: state.user.loading
});

export default connect(mapStateToProps)(FormComp.create()(SignupContainer));