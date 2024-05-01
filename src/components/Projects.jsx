import React from "react";

export default function ProjectList(props) {
    const [formState, setFormState] = React.useState({})

    const formElements =  props.data.map(element => 
        <li key={element.id}>
            <label htmlFor={element.id}>
                <input 
                    type="radio" 
                    name="projects" 
                    id={element.id}
                    value={element.id}
                    checked={formState.projects === element.id}
                    onChange={handleFormChange} />
                {element.name}
            </label>
        </li>
        );
    
    function handleFormChange(event) {
        const id = event.target.id

        setFormState({projects: event.target.value})
    }

    function sendFormData(event) {
        event.preventDefault()

        const selectedProject = props.data.filter(element => 
            formState.projects === element.id
        )
        
        props.onFormSubmit(selectedProject)
    }

    return (
        <>
            {formElements.length ?                    
            <form onSubmit={sendFormData}>
                <ul>{formElements}</ul> 
                <button type="submit">Next</button>
            </form> 
                :
                <p className="error">Projects list is empty</p>}
        </>
    )
}