const Block = require('./block');

class Blockchain
{
	constructor()
	{
		this.chain = [Block.genesis()];
	}

	addBlock(data)
	{
		const lastBlock = this.chain[this.chain.length-1];
		const block = Block.mineBlock(lastBlock, data);
		this.chain.push(block);
		return block;
	}
	isValidChain(chain)
	{
	

		if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
		for(let i=1; i<chain.length; i++)
		{
			const block = chain[i];
			const lastBlock = chain[i-1];
			if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block))
			{
				return false;
			}
		}
		return true;
	}

	replaceChain(newChain)
	{
		if (this.chain.length >= newChain.length) 
		{
			console.log('no new chain or current chain is longer');
			return;
		}
		else if (!this.isValidChain(newChain))
		{
			console.log('not a valid chain');
			return;
		}
		
		console.log('replcaing the chain');
		this.chain = newChain;
	}


}

module.exports = Blockchain;
