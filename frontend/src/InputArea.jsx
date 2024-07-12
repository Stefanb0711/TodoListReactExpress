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

        <div>
            <input onChange={handleChange} type="text" value={input} name="list_name" id="list_name"/>
            <button onClick={handleClick} type="button" class="btn">Hinzufügen</button>
        </div>        
    );
};

export default InputArea;