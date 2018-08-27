import axios from "./axios";

///////////////////CHAT MESSAGE FUNCTIONS////////////////

export function userJoined(users) {
    return {
        type: "USER_JOINED",
        users
    };
}
export function onlineUsers(users) {
    return {
        type: "ONLINE_USERS",
        users: users
    };
}
export function userLeft(users) {
    return {
        type: "USER_LEFT",
        users: users
    };
}

/////////////////WANNABE FUNCTIONS FOR PART 7///////////////

//dispatch is first step - contact server to make db query

export function recieveFriendsWannabes(user) {
    // console.log("working!");
    return axios.get("/friends-wannabes").then(data => {
        console.log("data in actions; ", data.data.results);
        return {
            type: "RECIEVE_FRIENDS_WANNABES",
            user: data.data.results
        };
    });
}
export function acceptFriendRequest(id) {
    return axios.post("/acceptfriendship/" + id + ".json").then(data => {
        console.log("data in acceptfriendship actions; ", data);
        return {
            type: "ACCEPT_FRIEND_REQUEST",
            user: id
        };
    });
}
export function endFriendship(id) {
    return axios.post("/endfriendship/" + id + ".json").then(data => {
        console.log("data in endfriendship actions; ", data.data);
        return {
            type: "END_FRIENDSHIP",
            user: id
        };
    });
}
export function pushChatMessagesToRedux(chatMessages) {
    return {
        type: "PUSH_CHAT_MESSAGES_TO_REDUX",
        chatMessages
    };
}
export function newMessageAction(chatMessage) {
    console.log("newMessage", chatMessage);
    return {
        type: "NEW_MESSAGE",
        chatMessage
    };
}
