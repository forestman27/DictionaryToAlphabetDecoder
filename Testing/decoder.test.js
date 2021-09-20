const Decoder = require('../src/Decoder.js');


// It is impossible to figure out some cases.
/**
 * 
 */
test('example test given to make the graph', ()=> {
    const words = ['bca','aaa','acb'];
    let graph = new Map();
    graph.set('b',['a']);
    graph.set('a',['c']);
    expect(Decoder.graph(words)).toStrictEqual(graph);
})

test('example test given', ()=> {
    const words = ['bca','aaa','acb'];
    const result = ['b','a','c'];


    expect(new Decoder(words).decode()).toStrictEqual(result);
})

test('US alphabet', () => {
    const words = ['aba','accd','acd'];
    const results = ['a','b','c','d'];
    expect(new Decoder(words).decode()).toStrictEqual(results);
})

test('US alphabet 2', () => {
    const words = ['aaa','accad','accd','fab','fac','fc'];
    const results = ['a','b','c','d','f'];
    expect(new Decoder(words).decode()).toStrictEqual(results);
})

