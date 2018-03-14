const expect = require('expect');

const { isRealString } = require('./validation');


describe('isRealString',()=>{
    it('should reject non string values',function(){

        const resultNum = isRealString(5);
        const resultObj = isRealString({
            type: 'hello'
        });
        const resultArr = isRealString([2,3]);

        expect(resultNum).toBe(false);
        expect(resultObj).toBe(false);
        expect(resultArr).toBe(false);

    })
    it('should reject strings with only spaces',function(){

        const result = isRealString('      ');

        expect(result).toBe(false);

    })
    it('should allow strings with non space characters',function(){

        const result = isRealString('I am a real string');

        expect(result).toBe(true);

    })
})