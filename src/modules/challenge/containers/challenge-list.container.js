import React from 'react';
import { connect } from 'react-redux';
import TableComp from '../../../components/table.component';
import Search from  '../../../components/search.component';
import ChallengeDetailsContainer from './challenge-details.container';
import { updateChallenge, deleteChallenge } from '../actions/actions';


class ChallengeListContainer extends React.Component{

    state = {
        details: false,
        context:{},
        data:[]
    }

    columns = [
    {
        title: 'Palavra',
        dataIndex: 'word',
        key: 'word',
        editable: true,
        required: true
    },
    {
        title: 'Imagem',
        dataIndex: 'image',
        key: 'image',
        inputType: 'image',
        editable: true,
        required: true
    },
    {
        title: 'Contexto',
        dataIndex: 'context',
        key: 'context',
        editable: true,
        required: true
    },
    {
        title: 'Áudio',
        dataIndex: 'sound',
        key: 'sound',
        editable: true,
    },
    {
        title: 'Vídeo',
        dataIndex: 'video',
        key: 'video',
        editable: true,
    }
    ]
    

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data){
            this.setState({data:[...this.props.data]})
        }
    }

    clear = ()=>{
        this.setState({data:[...this.props.data]})
    }

    search = (value)=>{
        let result=[];
        for(let i=0; i<this.props.data.length; i++){
            if(this.props.data[i].word.toLowerCase() === value.toLowerCase()){
                result.push(this.props.data[i]);
            }
        }
        this.setState({data:result})
    }

    closeDetails = ()=>{
        this.setState({details:false})
    }

    details = (payload) => {
        this.setState({details:true, context:payload})
    }

    update = (payload) => {

        this.props.dispatch(updateChallenge(payload));
    }

    delete = (payload) => {                
        this.props.dispatch(deleteChallenge(payload));
    }

    render(){
        
        return( 
            <div>
                <Search onSearch ={this.search} onClear={this.clear} />
                <TableComp 
                    data={this.state.data}
                    details={this.details}
                    columns={this.columns}
                    update={this.update}
                    delete={this.delete}
                    loading={this.props.loading}
                    />
                <ChallengeDetailsContainer visible={this.state.details} handleCancel={this.closeDetails} data={this.state.context} />

            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    data: state.challenge.data,
    loading: state.challenge.loading
});

export default connect(mapStateToProps)(ChallengeListContainer);