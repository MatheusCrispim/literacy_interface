import React from 'react';
import { connect } from 'react-redux'; 
import {FormComp, InputComp, ButtonComp} from '../../../components/components';
import { signup } from '../actions/user.actions';
import Uploader from '../../../components/upload.component';
import { getBase64 } from '../../../utils/file.utils';

const FormItem = FormComp.Item;

class SignupContainer extends React.Component{

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

        return(<FormComp hideRequiredMark>
                    <FormItem>
                        {getFieldDecorator('photo', {  
                            rules: [{ required: false, message: 'Por favor, insira a imagem!' }],
                        })(
                            <Uploader 
                                numberOfFiles={1}
                                uploadertype="picture-card"
                                fileTypeAllowed={['image/jpeg', 'image/png']}
                                errorMessage="O arquivo deve ser uma imagem"
                                data={this.setField} />
                        )}
                    </FormItem>
                    <FormItem label="Nome">
                        {getFieldDecorator('firstName', {
                            rules: [{ required: true, message: 'Por favor, insira o nome!' }],
                        })(
                            <InputComp />
                        )}
                    </FormItem>
                    <FormItem label="Sobrenome">
                        {getFieldDecorator('lastName', {
                            rules: [{ required: true, message: 'Por favor, insira o nome!' }],
                        })(
                            <InputComp />
                        )}
                    </FormItem>
                    <FormItem label="Username">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Por favor, insira o username!' }],
                        })(
                            <InputComp />
                        )}
                    </FormItem>
                    <FormItem label="Email">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Por favor, insira o email!' }],
                        })(
                            <InputComp />
                        )}
                    </FormItem>
                    <FormItem label="Senha">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message:  'Por favor, insira a senha!' }],
                        })(
                            <InputComp.Password />
                        )}
                    </FormItem>
                    <FormItem>
                        <ButtonComp type="primary" onClick={this.handleSignup}>
                            Login
                        </ButtonComp>
                    </FormItem>
                    <div>{this.props.signupFeedback}</div>
                </FormComp>)
    }
}

const mapStateToProps = (state) => ({
    signupFeedback: state.user.signupFeedback
});

export default connect(mapStateToProps)(FormComp.create()(SignupContainer));