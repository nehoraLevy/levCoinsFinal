const crypto = require('crypto'); // Import NodeJS's Crypto Module
const logger = require('elogger');

class Block { // Our Block Class
    constructor(data, prevHash = "") {
        this.timestamp = Date.now(); // Get the current timestamp
        this.data = data; // Store whatever data is relevant 
        this.prevHash = prevHash // Store the previous block's hash
        this.hash = this.computeHash() // Compute this block's hash
    }
  
    computeHash() { // Compute this Block's hash
        let strBlock = this.prevHash + this.timestamp + JSON.stringify(this.data) // Stringify the block's data
        return crypto.createHash("sha256").update(strBlock).digest("hex") // Hash said string with SHA256 encrpytion
    }

}


class BlockChain { // Our Blockchain Object
    constructor() {
        this.blockchain = [this.startGenesisBlock()] // Initialize a new array of blocks, starting with a genesis block
    }
    startGenesisBlock() {
        return new Block({}) // Create an empty block to start
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1] // Get last block on the chain
    }
    addNewBlock(newBlock) { // Add a new block
        newBlock.prevHash = this.obtainLatestBlock().hash // Set its previous hash to the correct value
        newBlock.hash = newBlock.computeHash() // Recalculate its hash with this new prevHash value
        this.blockchain.push(newBlock) // Add the block to our chain
    }
    checkChainValidity() { // Check to see that all the hashes are correct and the chain is therefore valid
        for(let i = 1; i < this.blockchain.length; i++) { // Iterate through, starting after the genesis block
            const currBlock = this.blockchain[i]
            const prevBlock = this.blockchain[i -1]
            
            // Is the hash correctly computed, or was it tampered with?
            if(currBlock.hash !== currBlock.computeHash()) { 
                return false
            }
          
            // Does it have the correct prevHash value?; ie: What a previous block tampered with?
            if(currBlock.prevHash !== prevBlock.hash) {                 
              return false
            }
            
        }
        return true // If all the blocks are valid, return true
    }
}


let chain=new BlockChain();

module.exports = {
    initializeChain: function (){
        logger.info('Initializing blockchain . . .');
         // Init our chain
    },
    createNewBlock: function ({id,sender, reciever, amount, date}){
        let newBlock= new Block({id,sender, reciever, amount, date});
        logger.info(`new block hash: ${newBlock.hash}`);
        chain.addNewBlock(newBlock);
        logger.info(`updated chain! and his Validity: ${chain.checkChainValidity()}`);
    },
};
