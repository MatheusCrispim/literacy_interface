import React from 'react';
import PropTypes from 'prop-types';
import { ModalComp, ParagraphComp, AvatarComp } from '../../../components/components';

class ContextDetaisContainer extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        const { id, name, image, sound, video } = this.props.data;

        return(
            <div>
                <ModalComp visible={this.props.visible} footer={null}  onCancel={this.props.handleCancel}>
                    <AvatarComp src={ image } size={64} icon="user" />
                    <ParagraphComp>{ name }</ParagraphComp>
                    {  
                        video!==""?
                            <video width="400" controls>
                                <source src={ video } type="video/mp4" />
                                <source src={ video } type="video/ogg" />
                                Seu navegador não suporta video em HTML 5
                            </video>
                        :
                        "Não tem vídeo"
                    }
                </ModalComp>
            </div>
        );
    }
}

ContextDetaisContainer.propTypes = {
    data: PropTypes.object.isRequired,
    visible: PropTypes.bool, 
    handleCancel:PropTypes.func.isRequired
}

export default ContextDetaisContainer;
