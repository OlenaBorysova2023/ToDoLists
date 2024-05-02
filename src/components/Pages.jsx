import React from "react";

export default function PagesList(props) {
    const allPagesData = getAllPagesData(props.data, []);
    const initFormState = setInitState(); 

    const [formState, setFormState] = React.useState(initFormState)

    const formElements =  allPagesData.map(element => 
        <li key={element.id}>
            <label htmlFor={element.id}>
                <input 
                    type="checkbox" 
                    name={element.id} 
                    id={element.id}
                    checked={formState[element.id].checked}
                    onChange={handleFormChange} />
                {element.name}
            </label>
        </li>
    );

    function getAllPagesData(root, nodes) {
        if(root.type = "PAGE" && root.id && root.name) {
            nodes.push({id: root.id, name: root.name});
        }    
        (root.children || []).forEach(node => {
            getAllPagesData(node, nodes);
        });    
        return nodes;
    }
       
    function setInitState() {
        const initValue = {}

        allPagesData.forEach(element => initValue[element.id] = false)

        return initValue;
    }

    function handleFormChange(event) {
        const id = event.target.id

        setFormState(prevItem => {
            const newItem = {...prevItem}

            newItem[id] = !newItem[id]

            return newItem
        })
    }

    function sendFormData(event) {
        event.preventDefault()

        const allCheckedPages = allPagesData.filter(element => formState[element.id])
        
        props.onFormSubmit(allCheckedPages)
    }

    return (
        <>
            {formElements.length ?  
                <form onSubmit={sendFormData}>
                    <ul>{formElements}</ul> 
                    <button type="submit">Create List</button>
                </form>                  
                :
                <p className="error">Pages list is empty</p>}
        </>
    )
}