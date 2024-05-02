import React from "react";

export default function CloseButton({handleClick}) {
    return (
        <button type="button" onClick={handleClick} className="btn-close">Cancel</button>
        )
}