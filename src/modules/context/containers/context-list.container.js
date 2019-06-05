import React from 'react';
import { connect } from 'react-redux';
import TableComp from '../../../components/table.component';
import { deleteContext, updateContext } from '../actions/actions';
import ContextDetaisContainer from './context-details.container';
import Search from  '../../../components/search.component';
import { AvatarComp, VideoThumbComp, IconComp, TagComp, NotificationComp } from '../../../components/components';
import { ContextTypes } from '../actions/types';

const { UPDATE_CONTEXT, DELETE_CONTEXT } = ContextTypes;

class ContextLisContainer extends React.Component{

    componentWillMount(){
        this.setState({data:[...this.props.data]});
    }
    
    notify = (type, title, description)=>{
        NotificationComp[type]({
            message: title,
            description: description
        });
    }


    state = {
        lastSearch:"",
        details: false,
        context:{},
        data:[]
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            editable: false,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            required: true,
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Imagem',
            dataIndex: 'image',
            key: 'image',
            inputType: {type:'image'},
            editable: true,
            required: true,
            render: image => (
                <AvatarComp size={80} shape="square" src={image} />
            )
        },
        {
            title: 'Áudio',
            dataIndex: 'sound',
            key: 'sound',
            editable: true,
            render: audio => (
                audio !== "" & audio !== null & audio !== undefined?
                   <TagComp color="cyan">
                        <IconComp style={{fontSize:'10pt'}} type="sound" />
                    </TagComp>
                :
                <TagComp color="#f50">Sem áudio</TagComp>
            )
        },
        {
            title: 'Vídeo',
            dataIndex: 'video',
            key: 'video',
            editable: true,
            render: video => (
                video !== "" & video !== null & video !== undefined?
                    <VideoThumbComp 
                        width="100px"
                        height="auto"
                        url={video} />
                :
                <TagComp color="#f50">Sem vídeo</TagComp>
            )
            
        }
    ]

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data){
            this.setState({data:[...this.props.data]});
            if(this.state.lastSearch !== ""){
                this.search(this.state.lastSearch);
            }
        }

        if(prevProps.requested !== this.props.requested){
            if(this.props.requested){
                if(this.props.action === UPDATE_CONTEXT){
                    if(this.props.success){
                        this.notify('success', 'Contexto atualizado', 'Seu contexto foi atualizado com sucesso!')
                    }else{
                        this.notify('error', 'Erro ao atualizar', 'Provavelmente um contexto com esse nome já existe!')
                    }           
                }

                if(this.props.action === DELETE_CONTEXT){
                    if(this.props.success){
                        this.notify('success', 'Contexto removido', 'Seu contexto foi removido com sucesso!')
                    }else{
                        this.notify('error', 'Erro ao remover', 'Esse contexto não pode ser removido pois existem desafios atrelados a ele!')
                    }           
                }
            }
        }
    }

    clear = ()=>{
        this.setState({data:[...this.props.data]});
        this.setState({lastSearch:""});
    }


    search = (value)=>{
        let result=[];
        for(let i=0; i<this.props.data.length; i++){
            if(this.props.data[i].name.toLowerCase().indexOf(value.toLowerCase())!==-1){
                result.push(this.props.data[i]);
            }
        }
        this.setState({data:result, lastSearch: value});
    }

    closeDetails = ()=>{
        this.setState({details:false});
    }

    details = (payload) => {
        this.setState({details:true, context:payload})
    }
    
    update = (payload) => {
        this.props.dispatch(updateContext(payload));
    }

    delete = (payload) => {                
        this.props.dispatch(deleteContext(payload));
    }

    render(){
        
        return( 
            <div>
                <Search extraProp={{'className':'search', 'placeholder':'Pesquise por contextos'}} onSearch ={this.search} onClear={this.clear} />
                <TableComp 
                    extraProp={{'className':'table'}}
                    data={this.state.data}
                    details={this.details}
                    update={this.update}
                    delete={this.delete}
                    columns={this.columns}
                    loading={this.props.loading}
                    />

                <ContextDetaisContainer visible={this.state.details} handleCancel={this.closeDetails} data={this.state.context} />
            </div>

        );
    }

}

const mapStateToProps = (state) => ({
    requested: state.context.requested,
    success: state.context.success,
    action: state.context.action,
    data: state.context.data,
    loading: state.context.loading
});

export default connect(mapStateToProps)(ContextLisContainer);