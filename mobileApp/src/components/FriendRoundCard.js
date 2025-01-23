import {
	View,
	StyleSheet,
	Text,
    Image,
} from "react-native";

export default function FriendRoundCard({friend, color}) {
    return (
        <View style = {[styles.container, {backgroundColor: color,}]}>
            <Image 
              style = {styles.avatar} 
              resizeMode = "contain"
              source = {require('../../assets/character.png')} // TODO: replace with friend's character
            />
            <Text style = {styles.name}> {friend.name} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 1,
      },
      avatar: {
        flex: 3,
        width: "100%",
        height: "100%",
      },
      name: {
        flex: 1,
        fontSize: 12,
        alignSelf: "center",
      },
})