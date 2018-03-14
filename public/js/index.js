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

             var formattedTime = moment(data.createdAt).format('h:mm a');
       
            $.get('templates/message-template.mst',function(template){
                var rendered = Mustache.render(template,{
                    text:data.text,
                    from:data.from,
                    createdAt: formattedTime
                })
                list.append(rendered);
            });

        })
        .on('newLocationMessage', (data) => {   

           var formattedTime = moment(data.createdAt).format('h:mm a');    

            $.get('templates/location-message-template.mst',function(template){
                var rendered = Mustache.render(template,{
                    from:data.from,
                    url: data.url,
                    createdAt: formattedTime
                })
                list.append(rendered);
            });
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
    });


})(jQuery, window);