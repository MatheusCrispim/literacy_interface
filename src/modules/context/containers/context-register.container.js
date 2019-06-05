import React from 'react';
import { connect } from 'react-redux';
import { registerContext } from '../actions/actions';
import { FormComp, ButtonComp, InputComp, NotificationComp } from '../../../components/components';
import Uploader from '../../../components/upload.component';
import { getBase64 } from '../../../utils/file.utils';
import { ContextTypes } from '../actions/types';

const { REGISTER_CONTEXT } = ContextTypes;
const FormItem = FormComp.Item;

class ContextRegisterContainer extends  React.Component{

    notify = (type, title, description)=>{
        NotificationComp[type]({
            message: title,
            description: description
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.action === REGISTER_CONTEXT){
            if(prevProps.requested !== this.props.requested){
                if(this.props.requested){
                    if(this.props.success){
                        this.notify('success', 'Contexto cadastrado', 'Seu contexto foi cadastrado com sucesso!')
                        this.props.form.resetFields();
                    }else{
                        this.notify('error', 'Erro ao cadastrar', 'Provavelmente um contexto com esse nome já existe!')
                    }
                }            
            }
        }
    }

    setField = (file)=>{
        getBase64(file, (base64)=>{
            this.props.form.setFieldsValue({'image': base64})
        })
    }

    register = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((error, payload) => {
            if (!error) {
                this.props.dispatch(registerContext(payload));
            }
        });
    }

    render(){

        const { getFieldDecorator } = this.props.form;
        return(
            <FormComp>
                <FormItem>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Por favor, insira a palavra!' }],
                    })(
                        <InputComp placeholder="Palavra" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('image', {  
                        rules: [{ required: true, message: 'Por favor, insira a imagem!' }],
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
                    {getFieldDecorator('sound', {
                         rules: [{ required: false, message: 'Por favor, insira a url do som!' }],
                    })(
                        <InputComp placeholder="Url do som" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('video', {
                        rules: [{ required: false, message: 'Por favor, insira a url do vídeo!' }],
                    })(
                        <InputComp placeholder="Url do vídeo" />
                    )}
                </FormItem>
                <FormItem>
                    <ButtonComp type="primary" loading={this.props.loading} onClick={this.register}>Cadastrar Contexto</ButtonComp>
                </FormItem>
            </FormComp>
        );
    }
}

const mapStateToProps = (state) => ({
    requested: state.context.requested,
    success: state.context.success,
    action: state.context.action,
    loading: state.context.loading
});

export default connect(mapStateToProps)(FormComp.create()(ContextRegisterContainer));