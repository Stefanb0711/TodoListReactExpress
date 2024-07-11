import {useEffect, useState} from "react";
import Home from "./Home.jsx";
import LoginField from "./LoginField.jsx";
import Registerfield from "./Registerfield.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./Header.jsx";

function App(){

    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState("");

    const [searchInput, setSearchInput] = useState("");

    const [todoGroups, setTodoGroups] = useState([]);
    const [filteredItems, setFilteredItems] = useState(todoGroups);

    async function getTodoGroups() {
            const response = await fetch("http://localhost:5000/get-todo-groups", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({currentUserId: currentUserId})
        });

        if (!response.ok){
            console.log("Fehler beim zugreifen auf API");
            return;
        }
        const responseData = await response.json();

        console.log("ResponseData: ", responseData);

        setTodoGroups(responseData.todoGroup);
        setFilteredItems(responseData.todoGroup);

        //console.log("Responsedata: " + responseData.todoGroup[0]["id"]);
        /*
        responseData.todoGroup.map((item) => {
            console.log(item["list_name"]);
        })
        console.log("One Todogroup: ", todoGroups);*/

        }



    useEffect(()  => {



        //const intervalId = setInterval(getTodoGroups, 60000); // Fetch every 60 seconds

        getTodoGroups();


        //setFilteredItems(todoGroups);
      }, [loggedIn, currentUserId]);


    useEffect(() => {
         console.log("Updated todoGroupsIds: ", todoGroups);
    }, [todoGroups]);


    function searchTodoGroup(searchInput){

        if (searchInput === ""){
            setFilteredItems(todoGroups);


        } else {

            const filtered = todoGroups.filter((item) => {
                return item["list_name"].toLowerCase().includes(searchInput.toLowerCase());
              });
              setFilteredItems(filtered);
        }

    }

    return (
        <Router>
            <Header search={searchTodoGroup} setLoggedIn={setLoggedIn} loggedIn={loggedIn} setSearchInput={setSearchInput} searchInput={searchInput} />
            <div>
                <Routes>
                    <Route path="/" element={<Home getTodoGroups={getTodoGroups} setFilteredItems={setFilteredItems} filteredItems={filteredItems} todoGroups={todoGroups} setTodoGroups={setTodoGroups} loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUserId={currentUserId} searchInput={searchInput} />} />
                    <Route path="/login" element={<LoginField loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUserId={setCurrentUserId}/>} />
                    <Route path="/register" element={<Registerfield loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;