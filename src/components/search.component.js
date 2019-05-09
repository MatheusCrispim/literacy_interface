import React from 'react';
import PropTypes from 'prop-types';
import { InputComp } from './components';

function Search(props){


    let change = (e)=>{ 
        let value = document.querySelector("#search").value;
        if(value === ""){
            props.onClear();
        }
    }   


    let onSearch = (value)=>{
        props.onSearch(value);
    }


    return  <InputComp.Search 
                id="search"
                onChange={change}
                allowClear
                onSearch={(value) => onSearch(value)}/>;
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
}

export default Search;
