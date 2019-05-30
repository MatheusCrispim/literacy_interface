import React from 'react';
import { connect } from 'react-redux';
import { registerChallenge } from '../actions/actions';
import { FormComp, ButtonComp, InputComp, SelectComp } from '../../../components/components';
import Uploader from '../../../components/upload.component';
import { getBase64 } from '../../../utils/file.utils';

const FormItem = FormComp.Item;
const { Option } = SelectComp;


class ChallengeRegisterContainer extends  React.Component{ 

    contexts = this.props.contexts.map((context)=>{
            return <Option key={context.name}>{context.name}</Option>;
    });
    

    setField = (file)=>{
        getBase64(file, (base64)=>{
            this.props.form.setFieldsValue({'image': base64})
        })
    }

    register = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((error, payload) => {
            if (!error) {
                let context = this.props.contexts.find(item => item.name = payload.context);
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
                            showSearch 
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
                    <ButtonComp loading={this.props.loading} onClick={this.register}>Cadastrar Desafio</ButtonComp>
                </FormItem>
            </FormComp>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.challenge.loading,
    contexts: state.context.data
});

export default connect(mapStateToProps)(FormComp.create()(ChallengeRegisterContainer));