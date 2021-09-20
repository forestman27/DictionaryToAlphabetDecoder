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
        return search(graph(this.words));
    }

    /**
     * 
     * @param {Adjacency List As JS Map} graph 
     */
    search(graph) {

    };

    static graph(words) {
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



/**
 * 
 * @param {list of "ordered" words} words 
 */
function graph(words) {
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

console.log(graph(['aba','accd','acd']))
console.log(graph(['bca','aaa','acb']))
console.log(graph(['aaa','accad','accd','fab','fac','fc']))