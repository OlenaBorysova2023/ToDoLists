import React from "react";

export default function PagesList(props) {
    const allPagesData = getAllChildrenPages(props.data);
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

    function getAllChildrenPages(data) {
        const flatPagesData = []
            
        if (data?.children.length) {
            let childrenPages = data.children 

            do {
                let nextGeneration = []

                childrenPages.forEach(item => {
                    if(item?.id && item?.name) flatPagesData.push(item)  
                    
                    if (item.children?.length) {
                        nextGeneration.push([...item.children])   
                    }
                })
                childrenPages = [...nextGeneration]
    
            } while (childrenPages?.length)
        }

        return flatPagesData
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