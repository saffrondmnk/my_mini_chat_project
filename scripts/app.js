// dom queries
const chatlist = document.querySelector('.chat-list');
const newCHatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// add a new chat
newCHatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newCHatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newCHatForm.reset())
    .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // updaet name via chatroom class
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // reset the form
  newNameForm.reset();
  // show then hide update message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => {
    updateMssg.innerHTML = '';
  }, 3000);
});

// update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat))
  }
});

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats(data => chatUI.render(data));
