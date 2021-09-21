'use strict'

/**
 * adjacency list implemented using js Map and Sets
 */
class GraphFactory {
    
    /**
     * @param { [] Strings } sortedWords 
     */
    constructor(sortedWords) {
        this.words = sortedWords;
        // this will contain all the vertexs and their children as a set
        this.nodes = new Map();
    }

    getGraph() {
        this.init();
        return this.nodes;
    }

    /**
     * Proof: word a comes before word b
     *      if word a's index value is the same as b's 
     *      then a's next index value (could) come before b's
     * 
     *      ex: a = 'ab', b = 'ac' then char 'b' comes before char 'c'
     *      ex: a = 'a', b = 'ac', then it is impossible to tell 'c's "parent"
     */
    init() {
        let words = this.words;
        for (let i = 1; i < words.length; i++) {
            let letterIndex = 0;
            // simply:    a has more indexs          &&             a's index value equals b's 
            while ((words[i-1].length > letterIndex) && (words[i].charAt(letterIndex) === words[i-1].charAt(letterIndex))) {
                letterIndex++;
            }
    
            // we are going to point down the line a => b => c,d, c => d,... etc 
            if (words[i-1].length > letterIndex) {
                let a = words[i - 1].charAt(letterIndex);
                let b = words[i].charAt(letterIndex);
                this.addNode(a, b);
            } // else we can't determine the order
        }
    }

    /**
     * @param {character} parent 
     * @param {character} child 
     */
    addNode(parent, child) {
        let children = new Set();
        if (this.nodes.has(parent)) children = this.nodes.get(parent);
        children.add(child);
        this.nodes.set(parent, children);
    }
}
module.exports = GraphFactory;
