(function ($, window) {

    var socket = io();

    var inputField = $('[name=message]');
    var list = $('#message-list');
    var locationButton = $('#send-location');

    socket.on('connect', function () {
        var params = $.deparam(window.location.search);

        socket.emit('join', params, function (err) {
            if (err) {
                alert('Need valid name and name room')
                window.location.href = '/';
            } else {
                console.log('no error')
            }
        })

    })
        .on('disconnect', () => {
            //    console.log('disconnected from server')
        })
        .on('newMessage', (data) => {

            var formattedTime = moment(data.createdAt).format('h:mm a');

            var isScrolledToBottom = userIsScrolledToBottom();

            $.get('templates/message-template.mst', function (template) {
                var rendered = Mustache.render(template, {
                    text: data.text,
                    from: data.from,
                    createdAt: formattedTime
                })
                list.append(rendered);
                if (isScrolledToBottom) scrollToBottom();

            });

        })
        .on('newLocationMessage', (data) => {

            var formattedTime = moment(data.createdAt).format('h:mm a');

            $.get('templates/location-message-template.mst', function (template) {
                var rendered = Mustache.render(template, {
                    from: data.from,
                    url: data.url,
                    createdAt: formattedTime
                })
                list.append(rendered);
                scrollToBottom();
            });
        })
        .on('updateUserList',function(users){
            var ul = $('<ul/>');
            users.forEach(function(user){
                console.log(user)
                ul.append($('<li/>').text(user));
            })

            $('#users').html(ul)
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
        $(this).attr('disabled', "disabled").text('fetching..........');
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

    var scrollToBottom = function () {
        var height = list.outerHeight();
        list.scrollTop(height);
    }

    var userIsScrolledToBottom = function () {
        var height = list.outerHeight();
        var scrollTop = list.scrollTop();
        var scrollHeight = list.prop('scrollHeight');
        return scrollHeight - scrollTop - height < 1;
    }

})(jQuery, window);