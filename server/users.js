const MAX_USERS_PER_ROOM = 2;
const rooms = [{
  users: []
}]

export const addUser = user => {
  const roomIdx = rooms.findIndex(r => r.users.length < MAX_USERS_PER_ROOM)
  if(roomIdx !== -1){
    rooms[roomIdx].users.push({id: user, name: user})
    return roomIdx
  }else{
    rooms.push({
      users: [user]
    })
    return rooms.length - 1
  }
  
  console.log(rooms)
}

export const removeUser = id => {
  const roomIdx = rooms.findIndex(r => r.users.some(user => user.id == id))
  if (roomIdx !== -1){
    const {users} = rooms[roomIdx]
    rooms[roomIdx].users = users.filter( u => u.id !== id)
  }

}

export const findRoom = id => {
  return rooms.findIndex(r => r.users.some(user => user.id == id))
}

export const findChatee = id => {
  const roomIdx = rooms.findIndex(r => r.users.some(user => user.id == id))
  if (roomIdx !== -1){
    const {users} = rooms[roomIdx]
    return (users.length === 2) ? users.find( u => u.id !== id) : null    
  }
}

export const replaceUser = (id, name) => {
  const roomIdx = rooms.findIndex(r => r.users.some(user => user.id == id))
  if (roomIdx !== -1) {
    const {users} = rooms[roomIdx]
    const userIdx = users.findIndex(u => u.id === id)
    rooms[roomIdx].users[userIdx].name = name;
  }
}

export const getUser = (id) => {
  const roomIdx = rooms.findIndex(r => r.users.some(user => user.id == id))
  if (roomIdx !== -1) {
    const {users} = rooms[roomIdx]
    return users.find(u => u.id === id)
  }
}