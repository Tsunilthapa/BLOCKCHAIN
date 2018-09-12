const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
	let bc, bc2;
	beforeEach(() => {
		bc = new Blockchain();
		bc2 = new Blockchain();
	});

	it ('starts with genesis block', () => {
		expect(bc.chain[0]).toEqual(Block.genesis());
	});

	it('adds a new blocl', () => {
		const data = 'abc';
		bc.addBlock(data);
		expect(bc.chain[bc.chain.length-1].data).toEqual(data);

	});

	it('validates a valid block', () => {
		bc2.addBlock('cdef');
		expect(bc.isValidChain(bc2.chain)).toBe(true);

	});

	it('invalidates a chain whith corrupt genesis block', () => {
		bc2.chain[0].data = 'juiiugj';
		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('invalidates a corrupt chain', () => {
		bc2.addBlock('ascds');
		bc2.chain[1].data = 'rewt';
		expect(bc.isValidChain(bc2.chain)).toBe(false);

	});

	it('replaces the chain with the valid chain', () => {
		bc2.addBlock('wefcs');
		bc.replaceChain(bc2.chain);
		expect(bc.chain).toEqual(bc2.chain);
	});

	it('does not replace with a chain shorter than the existing cain', () => {
		bc.addBlock('safsdv');
		bc.replaceChain(bc2.chain);
		expect(bc.chain).not.toEqual(bc2.chain);

	})
})