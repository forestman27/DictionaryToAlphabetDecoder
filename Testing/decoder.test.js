const Decoder = require('../src/Decoder.js');
const GraphFactory = require('../src/GraphFactory.js');

test('Graph initialization 1 => given example', ()=> {
    const words = ['bca','aaa','acb'];
    let graph = new Map();
    graph.set('b',new Set(['a']));
    graph.set('a',new Set(['c']));
    expect(new GraphFactory(words).getGraph()).toStrictEqual(graph);
})

test('Graph initialization 2', () => {
    let words = ['aba','accd','acd','ae'];
    let expectedGraph = new Map();
    expectedGraph.set('b', new Set(['c']));
    expectedGraph.set('c', new Set(['d','e']));
    expect(new GraphFactory(words).getGraph()).toStrictEqual(expectedGraph);
});

test('given example 1 => finding a path which touches every vertex 1 time', ()=> {
    const words = ['bca','aaa','acb'];
    const result = [new Set(['b','a','c'])];
    expect(new Decoder(words).findAlphabet()).toStrictEqual(result);
})

test('English alphabet 1', () => {
    const words = ['aba','accd','acd','ca','cb','cc'];
    const results = [new Set(['a','b','c','d'])];
    expect(new Decoder(words).findAlphabet()).toStrictEqual(results);
})

test('English alphabet 2 doesnt include "d" even though it is in the graph', () => {
    const words = ['aaa','accad','accd','accf','b','c','fab','fac','fc'];
    const results = [new Set(['a','b','c','f'])];
    expect(new Decoder(words).findAlphabet()).toStrictEqual(results);
})

test('English alphabet 3 multiple possibilities', () => {
    const words = ['a','cb','cc'];
    const results = [new Set(['a','c']), new Set(['b','c'])];
    expect(new Decoder(words).findAlphabet()).toStrictEqual(results);
})

