import React from 'react';
import { connect } from 'react-redux';
import TableComp from '../../../components/table.component';
import Search from  '../../../components/search.component';
import ChallengeDetailsContainer from './challenge-details.container';
import { updateChallenge, deleteChallenge } from '../actions/actions';
import { AvatarComp, VideoThumbComp, IconComp, TagComp, SelectComp, NotificationComp } from '../../../components/components';
import { ChallengeTypes } from '../actions/types';

const { UPDATE_CHALLENGE, DELETE_CHALLENGE } = ChallengeTypes;

const { Option } = SelectComp;

class ChallengeListContainer extends React.Component{

    state = {
        lastSearch: "",
        details: false,
        challenge:{},
        contexts:[],
        data:[]
    }

    contexts;

    notify = (type, title, description)=>{
        NotificationComp[type]({
            message: title,
            description: description
        });
    }

    componentWillMount(){
        this.setState({data:[...this.props.data]});
        this.contexts = this.props.contexts.map((context)=>{
            return <Option key={context.name}>{context.name}</Option>;
        });
    }

    componentDidUpdate(prevProps, prevState){        
        if(prevProps.data !== this.props.data){
            this.setState({data:[...this.props.data]});
            if(this.state.lastSearch !== ""){
                this.search(this.state.lastSearch);
            }
        }

        if(prevProps.requested !== this.props.requested){
            if(this.props.requested){
                if(this.props.action === UPDATE_CHALLENGE){
                    if(this.props.success){
                        this.notify('success', 'Desafio atualizado', 'Seu desafio foi atualizado com sucesso!')
                    }else{
                        this.notify('error', 'Erro ao atualizar', 'Provavelmente um desafio com esse nome já existe!')
                    }           
                }

                if(this.props.action === DELETE_CHALLENGE){
                    if(this.props.success){
                        this.notify('success', 'Desafio removido', 'Seu desafio foi removido com sucesso!')
                    }else{
                        this.notify('error', 'Erro ao remover', 'Esse desafio não pode ser removido')
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
            if(this.props.data[i].word.toLowerCase().indexOf(value.toLowerCase())!==-1){
                result.push(this.props.data[i]);
            }
        }
        this.setState({data:result, lastSearch: value});
    }

    closeDetails = ()=>{
        this.setState({details:false})
    }

    details = (payload) => {
        this.setState({details:true, challenge:payload});
    }

    update = (payload) => {
        let context = this.props.contexts.find(item => item.name === payload.data.context);
        payload.data.context = context.id;
        this.props.dispatch(updateChallenge(payload));
    }

    delete = (payload) => {                
        this.props.dispatch(deleteChallenge(payload));
    }

    render(){
        
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Palavra',
                dataIndex: 'word',
                key: 'word',
                editable: true,
                required: true,
                sorter: (a, b) => a.word.length - b.word.length,
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
                title: 'Contexto',
                dataIndex: 'context',
                key: 'context',
                inputType: {type:'options', data:this.contexts},
                editable: true,
                required: true,
                sorter: (a, b) => a.context.name.length - b.context.name.length,
                render: context => (
                        context.name
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
        
        return( 
            <div className="list">
                <Search extraProp={{'className':'search', 'placeholder':'Pesquise por desafios'}} onSearch={this.search} onClear={this.clear} />
                <TableComp 
                    extraProp={{'className':'table'}} 
                    data={this.state.data}
                    details={this.details}
                    columns={columns}
                    update={this.update}
                    delete={this.delete}
                    loading={this.props.loading}
                    />
                <ChallengeDetailsContainer visible={this.state.details} 
                    handleCancel={this.closeDetails} data={this.state.challenge} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    requested: state.challenge.requested,
    success: state.challenge.success,
    action: state.challenge.action,
    data: state.challenge.data,
    contexts: state.context.data,
    loading: state.challenge.loading
});

export default connect(mapStateToProps)(ChallengeListContainer);