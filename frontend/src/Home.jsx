import React, {useState, useEffect} from "react";
import Header from "./Header";
import InputArea from "./InputArea";
import ListElement from "./ListElement";


function Home(props){

    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [todoGroups, setTodoGroups] = useState([]);

    //var [filteredItems, setFilteredItems] = useState(todoGroups);

    const [todoListElements, setTodoListElements] = useState([])

    const [clickedOnTodoGroup, setClickedOnTodoGroup] = useState(false);
    const [currentTodoGroupId, setCurrentTodoGroupId] = useState("");


    async function getTodoList(){



        const response = await fetch("http://localhost:5000/get-todo-list", {
            method : "POST",
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({list_id: currentTodoGroupId})
        })

        if (!response.ok) {
            console.log("Fehler beim zugreifen auf Todolistelements");
            return;
        }


        const responseData = await response.json();

        setTodoListElements(responseData.todoListElements);

        console.log("ResponseData Todolistelements: ", responseData.todoListElements);

    }

    /*
    useEffect(()=>{

        async function fetchTodolist(){
            const responseGetTodoList = await fetch("http://localhost:5000/get-todo-list", {
            method : "POST",
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({list_id: currentTodoGroupId})
        })

        if (!responseGetTodoList.ok) {
            console.log("Fehler beim zugreifen auf Todolistelements");
            return;
        }


        const responseData = await responseGetTodoList.json();

        setTodoListElements(responseData.todoListElements);
        }

        fetchTodolist();

    }, [currentTodoGroupId])*/

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

    async function deleteTodoItem(){

    }

    async function openTodoList(id){

        setClickedOnTodoGroup(!clickedOnTodoGroup);

        console.log("Id der Todogroup: ", id);
        setCurrentTodoGroupId(id);

        const response = await fetch("http://localhost:5000/get-todo-list", {
            method : "POST",
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({list_id: id})
        })

        if (!response.ok) {
            console.log("Fehler beim zugreifen auf Todolistelements");
            return;
        }


        const responseData = await response.json();

        setTodoListElements(responseData.todoListElements);

        //console.log("ResponseData Todolistelements: ", responseData.todoListElements);


    }

    async function addTodoElement(input){
        const response = await fetch("http://localhost:5000/add-todo-element", {
            method : "POST",
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({todoElement: input, todoGroupId: currentTodoGroupId})
        })

        if (!response.ok) {
            console.log("Fehler beim hinzufügen des Todolistelements");
            return;
        }

        const responseData = await response.json();

       await getTodoList();


    }


    return (
        <div class="container text-center" style={{ width : "600px"}}>
            {props.loggedIn ?
                <div /*class="row m-auto"*/>
                      <div class="row align-items-start">
                    <div class="col">
                        <ul class="list-group">

                            {props.filteredItems.map((todoGroup, index) => {
                                return (<ListElement
                                        openTodoList = {openTodoList}
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
                          {clickedOnTodoGroup ?
                              <div class="col">
                                  <ul className="list-group">

                                      {todoListElements.map((todoListElement, index) => {
                                          return (
                                              <ListElement
                                                  key={index}
                                                  id={todoListElement["id"]}
                                                  element={todoListElement["content"]}
                                                  delete={deleteTodoItem}
                                              />
                                          );
                                      })}

                                  </ul>
                                      <InputArea add={addTodoElement}/>

                              </div> : <div style={{width: "300px"}}> Keine Todoliste ausgewählt </div>}
                      </div>
                </div> :
                <div style={{color: "red", justifyContent: "center", alignItems: "center", width : "300px"}}> Sie müssen sich erst anmelden</div>
            }


        </div>
    );
}

export default Home;