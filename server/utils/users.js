class Users {
    constructor(){
        this.users = []
    }
    addUser(id,name,room){
        var user = {id:id,name:name,room:room}
        this.users.push(user);
        return user;
    }
    removeUser(id){
        const user = this.users.filter(user=>{
            return user.id === id;
        })[0]
       this.users = this.users.filter((user)=>{
           return user.id !== id;
       })

       return user;
    }

    getUser(id){
      return this.users.filter((user)=>{
            return id === user.id
        })[0]

    }

    getUserList(room){
        const userList = this.users.filter((user)=>{
            return user.room === room
        }).map((filteredUser)=>{
            return filteredUser.name;
        })

        return userList || []
    }
}

module.exports = {
    Users
}