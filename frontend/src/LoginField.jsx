import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./Header.jsx";

function Login(props){

    const navigate = useNavigate();

    const [inputFields, setInputFields] = useState({
        email : "",
        password: ""
    });

    const [error, setError] = useState([]);

    async function handleSubmit(event){
        event.preventDefault();

        try{
            const response = await fetch("http://localhost:5000/login", {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputFields)
        });

        const responseMessage = await response.json();


        if (!response.ok) {
            if(response.status === 404) {
                setError([responseMessage.message]);
            } else if(response.status === 401){
                setError([responseMessage.message]);
            }
            else {
                setError([responseMessage.message]);
            }
            return;
        } else if (response.status === 200){
            props.setLoggedIn(true);
            //props.setCurrentUser(inputFields.email);
            props.setCurrentUserId(responseMessage.id);
            setError([]);
            console.log(responseMessage.message);
            console.log("CurrentUser Name: ", responseMessage.name);
            navigate("/");
        }


    } catch(err){
            console.log(err);
        }
    }

    function handleChange(event){
        const {name, value} = event.target;

        setInputFields((prevValues) => {
            return {
                ...prevValues,
                [name]: value

            };
        })
    }

    return (
        <div>
            {props.loggedIn ? <div style={{color: "red", justifyContent: "center"}}> Sie sind schon eingeloggt </div> :
                <main className="form-signin m-auto"
                      style={{justifyContent: "center", width: "300px", alignItems: "center"}}>


                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <div className="form-floating">
                            <input onChange={handleChange} name="email" value={inputFields.email} type="email"
                                   className="form-control" id="floatingInput" placeholder="name@example.com"/>
                            <label>Email address</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={handleChange} name="password" value={inputFields.password} type="password"
                                   className="form-control" id="floatingPassword" placeholder="Password"/>
                            <label>Password</label>
                        </div>

                        <div className="form-check text-start my-3">
                            <input className="form-check-input" type="checkbox" value="remember-me"
                                   id="flexCheckDefault"/>
                            <label className="form-check-label">
                                Remember me
                            </label>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                        <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
                    </form>
                    {error !== [] ?
                        <p style={{color: "red", alignItems: "center", justifyContent: "center"}}> {error[0]}</p> :
                        <p></p>}

                </main>
            }

        </div>


    );
}


export default Login;