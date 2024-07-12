import React, {useState} from "react";

function InputArea(props){

    const [input, setInput] = useState("");

    function handleChange(event){

        const {name, value} = event.target;

        setInput(value);
    }

    function handleClick(){

        props.add(input);

        setInput("");
    }



    return (

        <div className="d-flex align-items-center mt-3" >
            <input onChange={handleChange} type="text" value={input} name="list_name" id="list_name"/>
            <button onClick={handleClick} type="button" class="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg>
            </button>
        </div>
    );
};

export default InputArea;