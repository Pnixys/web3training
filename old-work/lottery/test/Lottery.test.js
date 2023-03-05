const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object})
        .send({ from: accounts[0], gas:'1000000' });
});

describe('Lottery contract <==> Unit-Test', () => {
    it('Deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('Allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('Allows multiple accounts to enter', async () => {
        const numberOfJoiner = 3;

        for(let i = 0; i < numberOfJoiner; ++i){
            await lottery.methods.enter().send({
                from: accounts[i],
                value: web3.utils.toWei('0.02', 'ether')
            });
        }

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        for(let j = 0; j < numberOfJoiner; ++j) {
            assert.equal(accounts[j], players[j]);
        }

        assert.equal(numberOfJoiner, players.length);
    });

    it('Requires a minimum amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send({
                from:accounts[0],
                value: 0
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('Only manager can pick a winner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        } catch(error) {
            assert(error);
        }
    });
});

describe('Lottery Contract <==> End-to-end', async () => {
    it('Sends money to the winner and rester players array', async () =>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;
        assert(difference > web3.utils.toWei('1.9', 'ether'));

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(0, players.length)
    });
});