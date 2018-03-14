(function ($, window) {

    var socket = io();

    var inputField = $('[name=message]');
    var list = $('#message-list');
    var locationButton = $('#send-location');

    socket.on('connect', function () {


    })
        .on('disconnect', () => {
            //    console.log('disconnected from server')
        })
        .on('newMessage', (data) => {

            const formattedTime = moment(data.createdAt).format('h:mm a');

            const name = $('<div/>').addClass('name').text(`${data.from} ${formattedTime}: `);

          //  const time = $('<div/>').addClass('time').text(formattedTime);

            const text=$('<div/>').addClass('text').text(data.text)

            const item = $('<li/>').append(name,text);

            list.append(item);
        })
        .on('newLocationMessage', (data) => {   

            const formattedTime = moment(data.createdAt).format('h:mm a');
            
            const name = $('<div/>').addClass('name').text(`${data.from} ${formattedTime}: `);

       //     const time = $('<div/>').addClass('time').text(formattedTime);
            
            const text=$('<div/>').addClass('text').html('<a target="_blank" rel="noopener noreferrer" href='+data.url+'>My Location</a>')

           const item = $('<li/>').append(name,text);


            list.append(item);
        });

    $('#message-form').on('submit', function (e) {
        e.preventDefault();

        socket.emit('createMessage', {
            from: 'anon',
            text: inputField.val()
        }, function () {
            inputField.val('');
        });
    });

    locationButton.on('click', function () {
        $(this).attr('disabled',"disabled").text('fetching..........');
        if (!navigator.geolocation) {
            return alert('Sorry, no geolocation for you');
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            socket.emit('createLocationMessage', {
                from: 'anon',
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            locationButton.removeAttr("disabled").text("Send Location");
        }, function () {
            alert('unable to fetch location')
        })
    })

})(jQuery, window);