import * as io from "socket.io-client";
import {
  onlineUsers,
  userJoined,
  userLeft,
  pushChatMessagesToRedux,
  newMessageAction
} from "./actions";

let socket;

// *****************CHAT MESSAGE METHODS*****************
export function init(store) {
  if (!socket) {
    socket = io.connect();

    socket.on("onlineUsers", users => {
      store.dispatch(onlineUsers(users));

      //function onlineUsers from actions.js is the final step to push data tro redux
    });
    socket.on("userJoined", onlineUsers => {
      store.dispatch(userJoined(users));
    });
    socket.on("userLeft", onlineUsers => {
      store.dispatch(userLeft(users));
    });
    socket.on("chatMessages", chatMessages => {
      store.dispatch(pushChatMessagesToRedux(chatMessages));
    });

    socket.on("newMessageBack", newMessage => {
      store.dispatch(newMessageAction(newMessage));
    });
  }
}

export function newMessageSocket(newMessageSocket) {
  socket.emit("newMessage", newMessageSocket);
}

//dispach - action - reducer

// action function process
//gives a 'type' to the araay of data that we want to affect

// then mapStateToProps
