async function updateUserStats(db, id, stats) {
    const userRef = db.collection("users").doc(id);
    try {
        await userRef.update({
            stats
        });
    } catch (error) {
        return error;
    }
}

async function getUserStats(db, id) {
    try {
        const snapshot = await db.collection("users").doc(id).get();
        if (!snapshot.exists) {
            return null;
        }
        return snapshot.data().stats;
    } catch (error) {
        return error;
    }
}
  
module.exports = {  
    updateUserStats,
    getUserStats
};