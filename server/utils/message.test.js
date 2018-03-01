const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate the correct message object',()=>{
       
        const from = 'jen';
        const text = 'some message';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        })

        //store response in variable
        // assert that from is correct
        //asser from matches value passed in
        // asster text matches
        // create at is a number
    })

})