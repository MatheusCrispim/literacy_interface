import React from 'react';
import { connect } from 'react-redux';
import { registerChallenge } from '../actions/actions';
import { FormComp, ButtonComp, InputComp, SelectComp, NotificationComp } from '../../../components/components';
import Uploader from '../../../components/upload.component';
import { getBase64 } from '../../../utils/file.utils';
import { ChallengeTypes } from '../actions/types';

const { REGISTER_CHALLENGE } = ChallengeTypes;

const FormItem = FormComp.Item;
const { Option } = SelectComp;

class ChallengeRegisterContainer extends  React.Component{ 

    contexts = this.props.contexts.map((context)=>{
        return <Option key={context.name}>{context.name}</Option>;
    });


    notify = (type, title, description)=>{
        NotificationComp[type]({
            message: title,
            description: description
        });
    }
    
    componentDidUpdate(prevProps, prevState){

        if(this.props.action === REGISTER_CHALLENGE){
            if(prevProps.requested !== this.props.requested){
                if(this.props.requested){
                    if(this.props.success){
                        this.notify('success', 'Desafio cadastrado', 'Seu desafio foi cadastrado!')
                        this.props.form.resetFields();
                    }else{
                        this.notify('error', 'Erro ao cadastrar', 'Erro ao cadastrar desafio!')
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
                let context = this.props.contexts.find(item => item.name === payload.context);
                payload.context = context.id;
                this.props.dispatch(registerChallenge(payload));
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        
        return(
            <FormComp>
                <FormItem>
                    {getFieldDecorator('word', {
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
                    {getFieldDecorator('context', {  
                        rules: [{ required: true, message: 'Por favor, insira o contexto!' }],
                    })(
                        <SelectComp 
                            showSearch={true}
                            placeholder="Selecione um contexto"
                            tokenSeparators={[',']}>
                            {this.contexts}
                        </SelectComp>
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
                    <ButtonComp type="primary" loading={this.props.loading} onClick={this.register}>Cadastrar Desafio</ButtonComp>
                </FormItem>
            </FormComp>
        );
    }
}

const mapStateToProps = (state) => ({
    action: state.challenge.action,
    loading: state.challenge.loading,
    requested: state.challenge.requested,
    success: state.challenge.success,
    contexts: state.context.data,
});

export default connect(mapStateToProps)(FormComp.create()(ChallengeRegisterContainer));