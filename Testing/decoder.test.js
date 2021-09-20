const Decoder = require('../src/Decoder.js');


test('example test given', ()=> {
    const words = ['bca','aaa','acb'];
    const result = ['b','a','c'];
    expect(Decoder.decode(words)).toStrictEqual(result);
})

test('US alphabet', () => {
    const words = ['aba','acc','acd','ca','cd'];
    const results = ['a','b','c','d'];
    expect(Decoder.decode(words)).toStrictEqual(results);
})
