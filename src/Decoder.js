'use strict';
class Decoder {

    constructor(words) {
        this.words = words;
    }
    /**
     * iterate all the words 
     * for each new word add it to the result array
     * @param {*} words 
     */
    /**
     * Proof: if the index of the last word is the same as the current
     *  then the last words next letter is before the currents next
     * 
     * if the indexs don't match between the words then it is impossible to tell which letter is next in the alphabet
     * 
     * Solution
     * using the above proof create a directional graph and find the largest connection of indices
     */
    decode() {
        return this.dynamicSearch(this.graph(this.words));
    }

    /**
     * @param {Adjacency List As JS Map} graph 
     * solution: iterate through every member of the graph
     * for each vertex search all possibilities
     * base case we've visited every vertex
     */
    dynamicSearch(graph) {
        let longest = [];
        for (const [vertexID, listValues] of graph) {
            search(vertexID, []);
            // if (longest.length < alphabet.length) longest = [...alphabet];
        }
        return longest;

        /**
         * if new vertex isn't in the list and the 
         * @param {*} vertexID 
         * @param {*} list 
         * @returns 
         */
        function search(vertexID, list) {
            if (xInList(vertexID, list)) {
                updateLongest(list);
                return;
            }

            let nextVertexs = graph.get(vertexID);
            if (nextVertexs === undefined) {
                updateLongest(list.concat(vertexID));
                return;
            }
            
            for (let i = 0; i < nextVertexs.length; i++) {
                search(nextVertexs[i], list.concat(vertexID));
            }
            updateLongest(list.concat(vertexID));
        }

        function xInList(x, list) {
            for (let i = 0; i < list.length; i++) {
                if (x == list[i]) return true;
            }
            return false;
        }

        function updateLongest(list) {
            if (longest.length < list.length) longest = [...list];
        }
    }
    


    /**
     * Proof: if the index of the last word is the same as the current's
     *  then the last words next letter is before the current's next ^^^ iterative
     *  
     *  letters who don't have matching predecessors will be discarded because there is no way to prove their placement.
     * 
     * using the above proof create a directional graph ^^^
     * graph is static because it is easier to unit test this way and it is independent.
     * @param {ordered list of words} words 
     * @returns {graph as a JS Map}
     */
    graph() {
        let words = this.words;
        let graph = new Map();
        for (let i = 1; i < words.length; i++) {
            let letterIndex = 0;
            while ((words[i-1].length > letterIndex) && (words[i].charAt(letterIndex) === words[i-1].charAt(letterIndex))) {
                letterIndex++;
            }
    
            // we are going to point down the line a => b => c,d, c => d,... etc (then reverse it at the end of decode algorithm.)
            if (words[i-1].length > letterIndex) {
                let a = words[i].charAt(letterIndex);
                let b = words[i - 1].charAt(letterIndex);
                uppdateVertex(b, a);
            } 
        }
        return graph;
    
        function uppdateVertex(key, newValue) {
            let vertexList = graph.get(key);
            if (vertexList === undefined) {
                graph.set(key, [newValue]);
            } else {
                for (let i = 0; i < vertexList.length; i++) {
                    if (vertexList[i] === newValue) {
                        return;
                    }
                }
                vertexList.push(newValue);
                graph.set(key, vertexList);
            }
        }
    }
}

module.exports = Decoder;


['aba','accd','acd','ca','cb','cc']
// new Decoder(['aba','accd','acd']).graph();
// console.log(new Decoder(['aba','accd','acd']).graph())
let decoder = new Decoder(['aba','accd','acd','ca','cb','cc']);
console.log(decoder.graph());
console.log(decoder.decode());
console.log('done')

// console.log(graph(['bca','aaa','acb']))
// console.log(graph(['aaa','accad','accd','fab','fac','fc']))