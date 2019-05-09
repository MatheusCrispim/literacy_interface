import ReactDynamicImport from 'react-dynamic-import';

//this function imports module dynamically
export function dynamicImport(component){
    const loader = f => import(`../${f}.js`);
    return ReactDynamicImport({ name: component, loader });
}