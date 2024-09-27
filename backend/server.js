import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import {configDotenv} from "dotenv";

/*const apiKey = process.env.API_KEY;
console.log("Api Key: ", apiKey);*/

const app = express();
const port = 5000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "todo",
    password: "stAnWe",
    port: 5432,
});
db.connect();

app.set('view engine', 'ejs');
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static("public"));


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get("/", async (req, res) =>{

    
    /*var lists = await db.query("SELECT * FROM todolists");
    console.log("Listen" + lists.rows[0].name);

    //var list_elements = db.query("SELECT * FROM todoelements");*/


    res.render("index.html");
});




app.get("/login", async (req, res) => {



    res.render("login.html");
});



app.get("/register", async (req, res) => {


    res.render("register.html");
});

app.post("/register/submit", async (req, res) => {

    const signInData = req.body;

    const {username, email, password} = signInData;

    console.log("Route wurde aufgerufen");
    //const {username, email} = req.body;

    const passwordUnhashed = signInData["password"];

    const hashedPassword = await bcrypt.hash(passwordUnhashed, 10);

    console.log("Hashed Password: ", hashedPassword);

    try{
       const result = await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3); ", [username, email, hashedPassword]);

       if (result.rowCount > 0){
           console.log("Einfügen des Benutzers korrekt abgelaufen");
       } else {
           console.log("Etwas ist schiefgelaufen");
       }

    } catch(err){
        console.error('Error inserting user:', err);
    }

    res.status(200).json({ message: 'Form data received successfully', data: req.body });
});


app.post("/add-list", async (req, res) =>{
    var new_list_name = await req.body["list_name"];

    console.log(new_list_name);

    const result = await db.query("INSERT INTO todolists (name, symbol) VALUES ($1, $2)", [new_list_name, 'three_dots']);


    res.redirect("/");
});



app.post("/login", async (req, res) => {

    const {email, password} = req.body;


    try {

    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    const resultPasswordDatabase= result.rows[0]["password"];

    const isPasswordCorrect = await bcrypt.compare(password, resultPasswordDatabase);


    if(!isPasswordCorrect){
        console.log("Passwort ist falsch");
        return res.status(401).json({ message: 'Incorrect password' });
    }

    if (result.rows.length === 0) {
      // Keine Zeile gefunden
         console.log("Keine Zeile gefunden");
         return res.status(404).json({ message: 'User not found' });
    }

    // Zeile gefunden
    res.status(200).json({message: "Form data received successfully", id: result.rows[0]["id"] });
    //res.json(result.rows[0]);
  } catch (err) {
    console.log("Keine Zeile gefunden");
    console.error(err);
    res.status( 500).json({ message: 'Internal Server Error' });
  }


})


app.post("/add-todo-group", async(req, res) => {
    try{



        const {currentUserId, listName} = req.body;

    console.log("CurrentUSerId: " + currentUserId + " ListName: " + listName);

    const result = await db.query("INSERT INTO todogroups (list_name, user_id) VALUES ($1, $2)", [listName, currentUserId] );

    if (result.rows.length === 0) {
      // Keine Zeile gefunden
         return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({message: 'Todogroup wurde erfolgreich hinzugefügt'});

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

})


app.post("/delete", async (req, res) => {

    const {postId} = req.body;

    try{

        const result = await db.query("DELETE FROM todogroups WHERE id=$1", [postId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Todo group not found' });
        }

        return res.status(200).json({ message: 'Todo group deleted successfully' });

    } catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

})


app.post("/get-todo-groups", async (req, res) =>{

    try {

    const {currentUserId} = req.body;

    if (!currentUserId || isNaN(currentUserId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

    const result = await db.query("SELECT id, list_name FROM todogroups WHERE user_id = $1", [parseInt(currentUserId, 10)]);

    if (result.rows.length === 0) {
      // Keine Zeile gefunden
         console.log("Keine Zeile gefunden");
         return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: '', todoGroup: result.rows });

    } catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

})



app.post("/add-todo-element", async (req, res) => {

    try {
    const {todoElement, todoGroupId} = req.body;

    const result = await db.query("INSERT INTO listelements (content, list_id) VALUES ($1, $2)", [todoElement, todoGroupId]);

    if (result.rowCount === 0) {
            return res.status(500).json({ message: 'Failed to add todo element' });
        }

    //const resultTodoLists = await db.query("SELECT id, content FROM listelements WHERE list_id = $1", [todoGroupId]);



    return res.status(200).json({message: 'Todoelement wurde erfolgreich hinzugefügt'/*, todoList : resultTodoLists.rows*/});

    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Internal Server Error' })
    }

})


app.post("/get-todo-list", async(req, res) => {


    try {
        const {list_id} = req.body;

        console.log("Current ListId: ", list_id);

        const result = await db.query("SELECT id, content FROM listelements WHERE list_id = $1", [parseInt(list_id)]);

        if (result.rows.length === 0) {
      // Keine Zeile gefunden
         return res.status(404).json({ message: 'Keine Todolist gefunden' });
    }

    return res.status(200).json({message: 'Todoelemente erfolgreich gefunden', todoListElements: result.rows });

    } catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

})

app.post("/delete-todo-item", async (req, res) => {

    try {
        const {todoElementId} = req.body;
        
        const result = await db.query("DELETE FROM listelements WHERE id=$1",[todoElementId] );
        if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Todoelement not found' });
            }

            return res.status(200).json({ message: 'Todoelement deleted successfully' });

    } catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});