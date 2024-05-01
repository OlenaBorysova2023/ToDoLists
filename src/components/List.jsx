import React from "react"

export default function List(props) {
    const listItems = props.items.map(element => 
        <li key={element.id}>
            <label htmlFor={element.id}>
                <input 
                    type="checkbox" 
                    name={element.id} 
                    id={element.id} />
                {element.name}
            </label>
        </li>
    )

    return (
        <form className="list" id={props.id}>
            <h2>{props.title}</h2>
            <ul>
                {listItems}
            </ul>
        </form>
    )
}

