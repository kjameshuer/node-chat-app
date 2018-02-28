
    var socket = io();
    socket.on('connect',function(){
       
      console.log('Ive connected')

    })
    .on('disconnect',()=>{
    //    console.log('disconnected from server')
    })
    .on('newMessage',(data) => {
        console.log('newMessage: ', data)
    
    });
