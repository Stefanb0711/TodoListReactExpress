import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios";


function Header(props){

    const navigate = useNavigate();

    
    //const [isLoggedIn, setLogin] = useState(false);

    //const [searchInput, setSearchInput] = useState("");



    function handleChange(event){

      const {value} = event.target;

      props.setSearchInput(value);

      props.search(value);

    }

    function handleRegisterClick(){
        navigate("/register");
    }

    function handleLoginClick(){
        navigate("/login");
    }

    function handleLogout(event){
        event.preventDefault();
        props.setLoggedIn(false);

    }

    return (
        
    <div class="container">
        
        <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 link-secondary">Start</a></li>

        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input value={props.searchInput} onChange={handleChange} type="search" class="form-control" placeholder="Search..." aria-label="Search"/>
        </form>

        {props.loggedIn ?
          <button onClick={handleLogout} type="button" class="btn btn-primary">Ausloggen</button> :

        <div>
          <a href="/login"><button onClick={handleLoginClick} type="button" class="btn btn-primary">Einloggen</button></a>
          <a> <button onClick={handleRegisterClick} class="btn btn-light">  Registrieren  </button></a>
        </div>
      }

        
        


      </div>
    </div>
  </header>

      </div>
    )
}


export default Header;