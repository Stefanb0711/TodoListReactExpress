import React, {useState} from "react";
//import from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function RegisterField(){

    const navigate = useNavigate();

    //const navigate = useNavigate();

    const [passWordChooseColor, setPasswordChoose] = useState("")

    const [passwordField, setPasswordField] = useState("");

    const [inputFields, setInputFields] = useState({
        username : "",
        email : "",
    });


    function handlePasswordChoose(event){
        const {value} = event.target;

        setPasswordField(value);

        if (passwordField.length === -1){
            setPasswordChoose("");
        } else if (passwordField.length <= 4 && passwordField.length >= 0){
            setPasswordChoose("#FFCCCB");

        } else if (passwordField.length <= 8 && passwordField.length > 4){
            setPasswordChoose("#FFFFE0");

        } else if (passwordField.length > 8){
            setPasswordChoose("#90EE90");
        } 
    }

    function handleChange(event){

        const {name, value} = event.target;

        setInputFields((prevValues) => {
            return {
                ...prevValues,
                [name] : value
            };
        });
    }

    /*
    async function handleSubmit(event){

        event.preventDefault();

        try{
            const response = await fetch("http://localhost:5173/register/submit", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputFields)
            });
            if (response.ok){
                const data = await response.json();
                console.log("Form successfully submitted", data);
            } else {
                console.error("Error submitting form:", response.statusText);
            }
        } catch (err){
            console.error("Error submitting form:", err);
        }
    };*/

    async function handleSubmit(event){

        event.preventDefault();
        try{
            await fetch("http://localhost:5000/register/submit", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...inputFields,
                password : passwordField
                })
            }).then(() => {
                navigate("/");
        });
        } catch (err){
            navigate("/");
        }

    }


    return ( 
        <main className="form-signin m-auto" style={{ width: "300px", justifyContent : "center", alignItems: "center"}}>
            <form  onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Registrieren</h1>

                <div className="form-floating">
                    <input onChange={handleChange} name="username" type="text" className="form-control" id="floatingUsername" placeholder="Password" value = {inputFields.username} required/>
                    <label >Benutzername</label>
                </div>

                <div className="form-floating">
                    <input onChange={handleChange} name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value= {inputFields.email} required/>
                    <label >Email Adresse</label>
                </div>

                <div className="form-floating">
                    <input onChange={handlePasswordChoose} value= {passwordField} style={{backgroundColor : passWordChooseColor}} name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" required  />
                    <label >Password</label>
                </div>
               
                <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                <label className="form-check-label" >
                    Remember me
                </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
            </form>
        </main>
    )
}

export default RegisterField;