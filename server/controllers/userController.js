async function createUser(req,res) {
    // create user
    const { name,age,interests} = req.body;
    const db = req.app.locals.db;
    const userRef = db.collection("users").doc();
    const user = {
        id: userRef.id,
        name,
        age,
        interests
    };
    await userRef.set(user);
}
async function getUsers(req,res) {
    const db = req.app.locals.db;
    const users = [];
   
        const snapshot = await db.collection("users").get();
        snapshot.forEach((doc) => {
            users.push(doc.data());
        });
  
    res.status(200).json(users);

}

module.exports = {
    createUser,
    getUsers
};