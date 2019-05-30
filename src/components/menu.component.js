import React from  'react';
import PropTypes from 'prop-types';
import { MenuComp } from './components';

function Menu(props){
    let key = 0;

    let items = props.items.map((item)=>{
            return <MenuComp.Item  {...item.extraProp} key={key++}>{item.content}</MenuComp.Item>
    })
    
    return (
        <MenuComp 
            theme={props.theme}
            mode={props.mode}
            {...props.extraProp}>
            {items}
        </MenuComp>
    );
}

Menu.propTypes = {
    items: PropTypes.array.isRequired,
    theme: PropTypes.string,
    mode: PropTypes.string,
    extraProp: PropTypes.object,
}

export default Menu;

