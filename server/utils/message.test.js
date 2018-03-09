const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate the correct message object', () => {

        const from = 'jen';
        const text = 'some message';
        var message = generateMessage(from, text);

        expect(message).toHaveProperty('from', from);
        expect(message).toHaveProperty('text', text);

    })

})

describe('generateLocationMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'jen';
        const lat = '123456789';
        const long = '987654321';
        const url = 'https://www.google.com/maps?q=123456789,987654321';
        const locationMessage = generateLocationMessage(from, lat, long);

        expect(locationMessage).toHaveProperty('from', from)
        expect(locationMessage).toHaveProperty('url', url)

    })
})