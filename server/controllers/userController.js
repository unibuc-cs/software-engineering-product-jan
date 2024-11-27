const {updateUserStats,getUserStats} = require("../services/statsService");
const {suggestTask} = require("../services/TaskSugestions_old");



async function createUser(req,res) {
    console.log("create user");
    // create user
    const { name,age,interests} = req.body;
    const db = req.app.locals.db;
    const userRef = db.collection("users").doc();
    // const startDate = new Date();
    //to do change with the actual user fields
    const user = {
        id: userRef.id,
        name,
        age,
        interests,
        stats : {
            intelligence: 0,
            fitness: 0,
            wellness: 0,
            skill: 0
        },
        startDate,
        buddies: []
    };
    try{
        await userRef.set(user);
        return res.status(201).json({message: "User created"});
    }
    catch(error){
        return res.status(500).json({error: error});
    }
}


async function getUsers(req,res) {
    const db = req.app.locals.db;
    const users = [];
    try{
        const snapshot = await db.collection("users").get();
        snapshot.forEach((doc) => {
            users.push(doc.data());
        });
    }
    catch(error){
        return res.status(500).json({error: error});
    }
    res.status(200).json(users);

}

async function getUser(req,res) {
    const db = req.app.locals.db;
    const id = req.params.id;
    try{
        const snapshot = await db.collection("users").doc(id).get();
        if(!snapshot.exists){
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json(snapshot.data());
    }
    catch(error){
        return res.status(500).json({error: error});
    }
}
async function updateUser(req,res) {
    const db = req.app.locals.db;
    const id = req.params.id;
    const {name,age,interests} = req.body;
    const userRef = db.collection("users").doc(id);
    try{
        //to do change with the actual user fields
        await userRef.update({
            name,
            age,
            interests
        });
        return res.status(200).json({message: "User updated"});
    }
    catch(error){
        return res.status(500).json({error: error});
    }
}
async function deleteUser(req,res) {
    const db = req.app.locals.db;
    const id = req.params.id;
    const userRef = db.collection("users").doc(id);
    try{
        await userRef.delete();
        return res.status(200).json({message: "User deleted"});
    }
    catch(error){
        return res.status(500).json({error: error});
    }
}

async function getStats(req,res) {
    const db = req.app.locals.db;
    const id = req.params.id;
    try{
        const stats = await getUserStats(db,id);
        if(!stats){
            return res.status(404).json({error: "Stats not found"});
        }
        return res.status(200).json(stats);
    }
    catch(error){
        return res.status(500).json({error: error});
    }
}

async function updateStats(req,res) {
    const db = req.app.locals.db;
    const id = req.params.id;
    const stats = req.body;
    try{
        await updateUserStats(db,id,stats);
        return res.status(200).json({message: "Stats updated"});
    }
    catch(error){
        return res.status(500).json({error: error});
    }
}

async function suggestUserTask(req,res) {
    const userId = "randomUserId"
    console.log("suggest user task");
    const taskSuggestions = await suggestTask();
    res.status(200).json(taskSuggestions);
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getStats,
    updateStats,
    suggestUserTask

};