import React, {useState, useEffect} from "react";
import Header from "./Header";
import InputArea from "./InputArea";
import ListElement from "./ListElement";


function Home(props){

    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [todoGroups, setTodoGroups] = useState([]);

    //var [filteredItems, setFilteredItems] = useState(todoGroups);



    async function deleteTodoGroup(id){

        console.log("Id of todogroup to delete: ", id);

        const response = await fetch("http://localhost:5000/delete", {
            method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({postId : id})
        })

        if (!response.ok){
            console.log("Fehler beim Löschen der Todogroup");
            return
        }

        props.getTodoGroups();

        /*props.setTodoGroups((prevValues) => {
            return (prevValues.filter((value, index) => {
                return index !== id;
            }));
        });

        props.setFilteredItems((prevValues) => {
            return (prevValues.filter((value, index) => {
                return index !== id;
            }));
        });*/

    }

    async function addTodoGroup( input){


        try{
            const response = await fetch("http://localhost:5000/add-todo-group", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({currentUserId: props.currentUserId, listName: input})
        });

        props.getTodoGroups();
        const responseData = response.json();
        console.log(responseData.message);

            /*setTodoGroups((prevValues) => {
                return [
                    ...prevValues,
                    input
                ];
        });*/

        } catch(err){
            console.log(err);
        }

    }




    return (
        <div style={{justifyContent: "center", alignItems: "center", width : "300px"}}>
            {props.loggedIn ?
                <div class="row m-auto">
                    <div class="col">
                        <ul class="list-group">

                            {props.filteredItems.map((todoGroup, index) => {
                                return (<ListElement
                                        key={index}
                                        id={todoGroup["id"]}
                                        element={todoGroup["list_name"]}
                                        delete={deleteTodoGroup}
                                    />
                                );
                            })}

                        </ul>
                        <InputArea add={addTodoGroup}/>


                    </div>
                    <div class="col">
                        One of three columns
                    </div>

                </div> :
                <div style={{color: "red", justifyContent: "center", alignItems: "center", width : "300px"}}> Sie müssen sich erst anmelden</div>
            }


        </div>
    );
}

export default Home;