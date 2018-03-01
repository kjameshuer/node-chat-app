(function ($, window) {

    var socket = io();

    var inputField = $('[name=message]');
    var list = $('#message-list')

    socket.on('connect', function () {

 
    })
        .on('disconnect', () => {
            //    console.log('disconnected from server')
        })
        .on('newMessage', (data) => {

            inputField.val('');
            list.append($('<li/>').text(`${data.from}: ${data.text}`));

        });


    $('#message-form').on('submit',function(e){
        e.preventDefault();

        socket.emit('createMessage',{
            from: 'anon',
            text: inputField.val()
        },function(){
      
        });

    })

})(jQuery, window);