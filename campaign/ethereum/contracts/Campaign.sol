pragma solidity 0.8.X;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint256 public minimumContribution;
    uint256 public numberOfRequest;
    mapping(address => bool) public approvers;
    mapping(uint256 => Request) public requests;
    uint256 public approversCount;

    modifier restricted() {
        require(
            msg.sender == manager,
            "You are not the manager, only the manager call call this nethod."
        );
        _;
    }

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(
            msg.value > minimumContribution,
            "Your contribution is to low, please verify the minimum amount to contribute."
        );

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string calldata description,
        uint256 value,
        address payable recipient
    ) public restricted {
        Request storage r = requests[numberOfRequest++];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalCount = 0;
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];

        require(
            approvers[msg.sender],
            "You are not parts of the approvers, contribute before trying to approve a request."
        );
        require(
            !request.approvals[msg.sender],
            "You have already answers to this request."
        );

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];

        require(
            request.approvalCount > (approversCount / 2),
            "Not enought approvers have cote to this request to be approved."
        );
        require(!request.complete, "This request is already complete.");

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            numberOfRequest,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return numberOfRequest;
    }
}
