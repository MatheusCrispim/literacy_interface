import React from 'react';
import PropTypes from 'prop-types';
import { TableComp, IconComp, FormComp, InputComp, TagComp, PopconfirmComp, SelectComp } from './components';
import Uploader from './upload.component';
import { getBase64, getBase64FromUrl } from '../utils/file.utils';

const FormItem = FormComp.Item;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
);  

const EditableFormRow = FormComp.create()(EditableRow);

class EditableCell extends React.Component {

    setField = (file, form)=>{
        getBase64(file, (base64)=>{
            form.setFieldsValue({'image': base64})
        })
    }

    getInput = (input, form, value) => {
        let inputType = input !== undefined? input.type : "";
    
        switch(inputType){
            case "image": 
            
                let fileList = [{
                    uid: '-1',
                    name: value,
                    status: 'done',
                    url: value
                }]

                return <Uploader 
                            fileList={fileList}
                            callback={()=> getBase64FromUrl(value, (base64)=>{
                                form.setFieldsValue({'image': base64})
                            })}
                            numberOfFiles={1}
                            uploadertype="picture-card"
                            fileTypeAllowed={['image/jpeg', 'image/png']}
                            errorMessage="O arquivo deve ser uma imagem"
                            data={(data)=>this.setField(data, form)} />

            case "options":
                return <SelectComp 
                            style={{minWidth:'100%'}}
                            showSearch={true}
                            tokenSeparators={[',']}>
                            {input.data}
                        </SelectComp>

            default:
                return <InputComp />;
        }
    };

    render() {
        const {
            editing,
            dataIndex, 
            title,
            inputType,
            record,
            index,
            required,
            ...restProps
        } = this.props;
        
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: required,
                                            message: ` Por favor, insira o campo ${title}`,
                                        }],
                                         
                                        initialValue: inputType !== undefined? []: record[dataIndex]
                                    })(this.getInput(inputType, form, record[dataIndex]))}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}


class TableComponent extends React.Component {
    columns;
    constructor(props){
        
        super(props);

        this.state = {
            editingId: '', 
        }

        const actionsColumn = {
            title: 'Ações',
            dataIndex: 'actions', 
            id: 'actions',
            render: (text, record) => {
                var editable = this.isEditing(record);
                return (
                    <div>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <PopconfirmComp title="Deseja realmente salvar as modificações deste registro?" onConfirm={() => this.update(form, record.id)}>
                                        <TagComp color="cyan">
                                            Salvar
                                        </TagComp>
                                        </PopconfirmComp>
                                    )}
                                </EditableContext.Consumer>
                                <PopconfirmComp
                                    title="Deseja realmente cancelar a edição?"
                                    onConfirm={() => this.cancel(record.id)}>
                                     <TagComp color="cyan">Cancelar</TagComp>
                                </PopconfirmComp>
                            </span>
                        ) : (
                            <span>
                                <TagComp color="cyan" onClick={() => this.details(record)}>Detalhes</TagComp>
                                <TagComp color="cyan" onClick={() => this.edit(record.id)}>Editar</TagComp>
                                <PopconfirmComp title="Deseja realmente apagar este registro?" onConfirm={() => this.delete(record.id)}>
                                    <TagComp><IconComp type="delete" color="cyan" theme="twoTone"/></TagComp>
                                </PopconfirmComp>
                            </span>
                        )}
                    </div>
                );
            }
        }

        this.columns = [...this.props.columns];
        this.columns.push(actionsColumn);
    }
    
    
    details = (record) => {
        this.props.details(record);
    }


    edit = (id) => {
        this.setState({ editingId: id });
    }


    cancel = () => {
        this.setState({editingId: '' });
    };


    isEditing = record => record.id === this.state.editingId;


    update = (form, id) => {
        form.validateFields((error, data) => {
            if (!error) {
                let payload = {id, data};
                this.props.update(payload);
                this.setState({ editingId: '' });
            }
          });
    }


    delete = (id) => {
        this.props.delete(id);
    }


    render(){
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            }
        };
      
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    required: col.required,
                    editing: this.isEditing(record),
                }),
            };
        });      

        return (
            <div>
                <TableComp
                    {...this.props.extraProp}
                    onChange={this.props.onChangePage}
                    rowKey="id"
                    loading={this.props.loading}
                    dataSource={this.props.data}
                    pagination={true}
                    columns={columns} 
                    components={components}
                    size="large"
                    locale={{emptyText:'Nada encontrado'}}
                />
            </div>
        );  
    }
}

TableComponent.propTypes = {
    loading : PropTypes.bool.isRequired,
    data : PropTypes.array.isRequired,
    columns : PropTypes.array.isRequired,
    details : PropTypes.func.isRequired,
    update : PropTypes.func.isRequired,
    delete : PropTypes.func.isRequired,
    onChangePage : PropTypes.func,
    extraProp: PropTypes.object
}

export default TableComponent;