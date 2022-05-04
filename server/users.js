const MAX_USERS_PER_ROOM = 2;
const rooms = [{
  users: []
}]

export const addUser = user => {
  const roomIdx = rooms.findIndex(r => r.users.length < MAX_USERS_PER_ROOM)
  if(roomIdx !== -1){
    rooms[roomIdx].push(user)
  }else{
    rooms.push({
      users: [user]
    })
  }
}

export const removeUser = user => {
  const roomIdx = rooms.findIndex(r => r.users.includes(user))
  const {users} = rooms[roomIdx]
  rooms[roomIdx].users = users.filter( u => u !== user)
}