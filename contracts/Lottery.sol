pragma solidity ^0.8.X;

contract Lottery {
    uint minimunAmountToEnter = .01 ether;
    address public manager;
    address  payable[] private players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > minimunAmountToEnter, "Not enough money to enter.");

        players.push(payable(msg.sender));
    }

    function pickWinner() public managerOnly {
        uint indexWinner = random() % players.length;
        players[indexWinner].transfer(address(this).balance);
        players = new address payable[](0);
    }

    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
    }

    function getPlayers() public view returns(address payable[] memory) {
        return players;
    }

    modifier managerOnly() {
        require(msg.sender == manager, "The caller isn't a manager.");
        _;
    }
}