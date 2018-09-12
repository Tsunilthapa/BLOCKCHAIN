const Block = require('./block');
const Blockchain = require('./blockchain');
// consolconst block = new Block('abc', 'bcd', 'cde');
// e.log(block.toString());
// console.log(Block.genesis().toString());
const fblock = Block.mineBlock(Block.genesis(), 'fblock');
console.log(fblock.toString());
