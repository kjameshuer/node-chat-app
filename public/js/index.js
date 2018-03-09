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
            list.append($('<li/>').text(`${data.from}: ${data.text}`));
        })
        .on('newLocationMessage', (data) => {            
            var link = $('<a/>')
                .attr({'href':data.url,'target':'_blank'})
                .append(`${data.from}'s location`);

            const item = $('<li/>')
                .append(link);

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
        if (!navigator.geolocation) {
            return alert('Sorry, no geolocation for you');
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            socket.emit('createLocationMessage', {
                from: 'anon',
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function () {
            alert('unable to fetch location')
        })
    })

})(jQuery, window);