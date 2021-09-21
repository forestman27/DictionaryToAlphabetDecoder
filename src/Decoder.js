'use strict'

const GraphFactory = require('./GraphFactory.js');

class Decoder {

    constructor(words) {
        this.graph = new GraphFactory(words).getGraph();
        this.alphabets = [new Set()]; // it's possible there is an inconclusive ordering of the alphabet.
    }

    /**
     * Proof: The graph's nodes only points in a forward direction
     *      therefore, by following the flow of the graph, a letter can never be inserted out of order
     *      
     *      There are some cases where we can't calculate the exact order of a letter
     *      in this case more than one possible guess of the alphabet can be created.
     *      By finding the longest sequences we can be sure that we found the best guesses.
     */
    findAlphabet() {
        // start the algorithm restarting on each node.
        for (let key of this.graph.keys()) {
            this.longestSequence(key, new Set([]));
        }
        return this.alphabets;
    }

    longestSequence(node, set) {
        set.add(node);

        if (!this.graph.has(node)) { // if this is a dead end node
            this.updateLongest(set);
        } else {
            for (let nextNode of this.graph.get(node)) {
                console.log(this.graph.get(node));
                if (set.has(nextNode)) {
                    this.updateLongest(set);
                } else {
                    this.longestSequence(nextNode, new Set(set));
                }
            }
        }
    }

    updateLongest(set) {
        if (this.alphabets[0].size < set.size) {
            this.alphabets = [set];
        } else if (this.alphabets[0].size === set.size) {
            this.alphabets.push(set);
        }
    }
}

module.exports = Decoder;