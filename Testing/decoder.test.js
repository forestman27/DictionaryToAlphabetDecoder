const Decoder = require('../src/Decoder.js');


test('given example => graph initialization', ()=> {
    const words = ['bca','aaa','acb'];
    let graph = new Map();
    graph.set('b',['a']);
    graph.set('a',['c']);
    expect(new Decoder(words).graph()).toStrictEqual(graph);
})

test('inconclusive char for cases where logic is impossible', () => {
    let words = ['aba','accd','acd'];
    let graph = new Decoder(words).graph();
    let expectedGraph = new Map();
    expectedGraph.set('b', ['c']);
    expectedGraph.set('c',['d']);
    expect(graph).toStrictEqual(expectedGraph);
});

test('given example => finding a path which touches every vertex 1 time', ()=> {
    const words = ['bca','aaa','acb'];
    const result = ['b','a','c'];
    expect(new Decoder(words).decode()).toStrictEqual(result);
})

test('English alphabet', () => {
    const words = ['aba','accd','acd'];
    const results = ['a','b','c','d'];
    expect(new Decoder(words).decode()).toStrictEqual(results);
})

test('English alphabet 2', () => {
    const words = ['aaa','accad','accd','fab','fac','fc'];
    const results = ['a','b','c','d','f'];
    expect(new Decoder(words).decode()).toStrictEqual(results);
})

