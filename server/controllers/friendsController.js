async function addFriend(req, res) {
    const db = req.app.locals.db;
    const friend_id = req.params.id;
    const { user_id } = req.body;

    const userRef = db.collection("users").doc(user_id);
    const friendRef = db.collection("users").doc(friend_id);

    const user = await userRef.get();
    const friend = await friendRef.get();

    if (!user.exists) {
        return res.status(404).json({ error: "User not found" });
    }

    if (!friend.exists) {
        return res.status(404).json({ error: "Friend not found" });
    }


    const userBuddies = user.data().buddies;
    const friendBuddies = friend.data().buddies;

    if (userBuddies.includes(friend_id)) {
        return res.status(400).json({ error: "User is already your friend" });
    }


    userBuddies.push(friend_id);
    friendBuddies.push(user_id);

    try {
        await userRef.update({ buddies: userBuddies });
        await friendRef.update({ buddies: friendBuddies });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Friend added" });

   
}

async function deleteFriend(req, res) {
    const db = req.app.locals.db;
    const friend_id = req.params.id;
    const { user_id } = req.body;

    const userRef = db.collection("users").doc(user_id);

    const user = await userRef.get();

    if (!user.exists) {
        return res.status(404).json({ error: "User not found" });
    }

    const userBuddies = user.data().buddies;

    if (!userBuddies.includes(friend_id)) {
        return res.status(400).json({ error: "User is not your friend" });
    }

    const newBuddies = userBuddies.filter((buddy) => buddy !== friend_id);

    try {
        await userRef.update({ buddies: newBuddies });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Friend deleted" });
}

async function getUserFriends(req, res) {
    const db = req.app.locals.db;
    const id = req.params.id;
    const friends = [];

    const userRef = db.collection("users").doc(id);

    const buddies = await userRef.get()

    const buddiesData = buddies.data().buddies;

    for (const buddy of buddiesData) {
        const buddyRef = db.collection("users").doc(buddy);
        const buddyData = await buddyRef.get();
        friends.push(buddyData.data());
    }

    res.status(200).json(friends);

}

async function sendTaskToFriend(req, res) {
    const db = req.app.locals.db;
    const { user_id, friend_id, task } = req.body;

    const friendRef = db.collection("users").doc(friend_id);

    const friend = await friendRef.get();

    if (!friend.exists) {
        return res.status(404).json({ error: "Friend not found" });
    }

   
    const newTask = {
        ...task,
        from_buddy: user_id,
        user_id: friend_id, 
        created_at: new Date().toISOString(), 
        done: false,         
    };

    try {
        const activitiesRef = db.collection("activities");
        const docRef = await activitiesRef.add(newTask);
        
        const newTaskId = docRef.id;
        await docRef.update({ id: newTaskId });

        res.status(200).json({ message: "Task sent to friend", taskId: newTaskId });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}











module.exports = {
    addFriend,
    deleteFriend,
    getUserFriends,
    sendTaskToFriend
}