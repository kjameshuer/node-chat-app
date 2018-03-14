const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    it('should add new user', function () {
        var users = new Users();

        var user = {
            id: '123',
            name: 'Kevin',
            room: 'The Room'
        }

       var resUser = users.addUser(user.id,user.name,user.room);

       expect(users.users).toEqual([user])
    })

    it('should remove and return existing user',function(){
        var users = new Users();
        
        var user1 = {
            id: '321',
            name: 'Niveck',
            room: 'The Room'
        }
        
        var user2 = {
            id: '123',
            name: 'Kevin',
            room: 'The Room'
        }

        users.addUser(user1.id,user1.name,user1.room)
        users.addUser(user2.id,user2.name,user2.room);

        expect(users.users.length).toBe(2)

        var oldUser = users.removeUser('321');

        expect(oldUser).toEqual(user1);
        expect(users.users.length).toBe(1)

        const otherUser = users.removeUser('pickle');
        expect(otherUser).toBe(undefined);
        expect(users.users.length).toBe(1)

    });

    it('should return id specified user if they exist',function(){
        var users = new Users();
        
        var user1 = {
            id: '321',
            name: 'Niveck',
            room: 'The Room'
        }

        users.addUser(user1.id,user1.name,user1.room);

        var user = users.getUser('321');

        expect(user).toEqual(user1);

        var fakeUser = users.getUser('pickle');
        expect(fakeUser).toBe(undefined);
    })

    it('should return list of all users in a given room',function(){
        var user1 = {
            id: '321',
            name: 'Nivek',
            room: 'The Room'
        }
        
        var user2 = {
            id: '123',
            name: 'Kevin',
            room: 'The Room'
        }
        var user3 = {
            id: '231',
            name: 'Joe',
            room: 'The Other Room'
        }

        var users = new Users;

        users.addUser(user1.id,user1.name,user1.room)
        users.addUser(user2.id,user2.name,user2.room)
        users.addUser(user3.id,user3.name,user3.room)
        expect(users.users.length).toBe(3)
        expect(users.getUserList('The Room')).toEqual(['Nivek','Kevin']);
        expect(users.getUserList('lskfjslef')).toEqual([]);   
     
    })
})