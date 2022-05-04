const MAX_USERS_PER_ROOM = 2;
const rooms = [{
  users: []
}]

export const addUser = user => {
  console.log('adding user')
  const roomIdx = rooms.findIndex(r => r.users.length < MAX_USERS_PER_ROOM)
  if(roomIdx !== -1){
    rooms[roomIdx].users.push(user)
    return roomIdx
  }else{
    rooms.push({
      users: [user]
    })
    return rooms.length
  }
}

export const removeUser = user => {
  const roomIdx = rooms.findIndex(r => r.users.includes(user))
  if (roomIdx !== -1){
    const {users} = rooms[roomIdx]
    rooms[roomIdx].users = users.filter( u => u !== user)
    console.log(rooms)
  }

}

export const findRoom = user => {
  return rooms.findIndex(r => r.users.includes(user))
}