import React from 'react';
import PropTypes from 'prop-types';
import { UploadComp, IconComp, ModalComp, MessageComp } from './components';
import { findInArray } from '../utils/array.utils';

class Uploader extends React.Component {
    constructor(props){
        super(props);
        
        if(props.callback !== undefined){
            props.callback();
        }

        if(props.fileList !== undefined){
            this.state={
                fileList:[...props.fileList]
            }
        }
    }

    state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };

    isAnAllowedType = (type) =>{
        return findInArray(this.props.fileTypeAllowed, type) !== undefined ? true: false;
    }

    beforeUpload = (file) => {
        const isAllowed = this.isAnAllowedType(file.type);
        if (!isAllowed) {
            MessageComp.error(this.props.errorMessage);
        }
        return isAllowed;
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
  
    customRequest = ({ onSuccess, onError, file })=>{
        setTimeout(()=>{
            onSuccess(null, file);
        })
    }

    handleChange = ({ fileList, file }) => {
        if(file.status === 'uploading' & this.isAnAllowedType(file.type) ){
            this.setState({ fileList })
        }
       
        if(file.status === 'removed'){
            this.setState({ fileList })
        }
    } 
  
    render() {
      
      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
        <div>
          <IconComp type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );

      return (
        <div className="clearfix">
            <UploadComp
                beforeUpload={this.beforeUpload}
                customRequest={this.customRequest}
                data={this.props.data}
                listType={this.props.uploadertype}
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                >
                {fileList.length >= this.props.numberOfFiles ? null : uploadButton}
                </UploadComp>
                <ModalComp visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </ModalComp>
        </div>
      );
    }
}

Uploader.propTypes = {
    fileTypeAllowed: PropTypes.array.isRequired,
    errorMessage: PropTypes.string.isRequired,
    data: PropTypes.func.isRequired,
    numberOfFiles:  PropTypes.number.isRequired,
    uploadertype: PropTypes.string.isRequired,
    fileList: PropTypes.array,
    callback: PropTypes.func
}

export default Uploader;