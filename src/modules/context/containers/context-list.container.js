import React from 'react';
import { connect } from 'react-redux';
import TableComp from '../../../components/table.component';
import { deleteContext, updateContext } from '../actions/actions';
import ContextDetaisContainer from './context-details.container';
import Search from  '../../../components/search.component';
import { AvatarComp, VideoThumbComp } from '../../../components/components';

class ContextLisContainer extends React.Component{

    state = {
        details: false,
        context:{},
        data:[]
    }

    columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            required: true
        },
        {
            title: 'Imagem',
            dataIndex: 'image',
            key: 'image',
            inputType: 'image',
            editable: true,
            required: true,
            render: image => (
                <AvatarComp size={64} shape="square" src={image} />
            )
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
            render: video => (
                <VideoThumbComp 
                    videoUrl={video}
                    width={10}
                    height={10} />
            )
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
            if(this.props.data[i].name.toLowerCase() === value.toLowerCase()){
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
        this.props.dispatch(updateContext(payload));
    }

    delete = (payload) => {                
        this.props.dispatch(deleteContext(payload));
    }

    render(){
        
        return( 
            <div>
                <Search onSearch ={this.search} onClear={this.clear} />
                <TableComp 
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
    data: state.context.data,
    loading: state.context.loading
});

export default connect(mapStateToProps)(ContextLisContainer);