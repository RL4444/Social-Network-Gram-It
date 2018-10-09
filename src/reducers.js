export default function(state = {}, action) {
  // console.log("actions in reducers:", action);
  if (action.type == "RECIEVE_FRIENDS_WANNABES") {
    state = Object.assign({}, state, {
      user: action.user
    });
  }
  if (action.type == "END_FRIENDSHIP") {
    state = {
      ...state,
      user: state.user.map(user => {
        // console.log("user in reducers endFriendship", user);
        if (user.id == action.user) {
          return {
            ...user,
            status: null
          };
        } else {
          return user;
        }
      })
    };
  }
  if (action.type == "ACCEPT_FRIEND_REQUEST") {
    state = {
      ...state,
      user: state.user.map(user => {
        // console.log("user in reducers ACCEPT_FRIEND_REQUEST", user);
        if (user.id != action.user) {
          return user;
        } else {
          return {
            ...user,
            status: 2
          };
        }
      })
    };
  }
  if (action.type == "ONLINE_USERS") {
    state = {
      ...state,
      users: action.users
    };
  }
  if (action.type == "USER_JOINED") {
    state = {
      ...state,
      users: [action.user.user, ...state.users]
    };
  }
  if (action.type == "USER_LEFT") {
    state = {
      ...state,
      users: state.users.filter(user => user.id != action.id)
    };
  }
  if (action.type == "PUSH_CHAT_MESSAGES_TO_REDUX") {
    // console.log("pushChatMessagesToRedux", action.chatMessages);
    state = {
      ...state,
      chatMessages: action.chatMessages
    };
  }

  if (action.type == "NEW_MESSAGE") {
    state = {
      ...state,
      chatMessages: [...state.chatMessages, action.chatMessage]
    };
  }
  return state;
}
