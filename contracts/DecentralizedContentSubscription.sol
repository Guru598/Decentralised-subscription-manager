// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedContentSubscription {
    struct Subscription {
        uint256 expiry;
        uint256 fee;
    }

    address public creator;
    uint256 public subscriptionFee;
    mapping(address => Subscription) public subscriptions;

    event SubscriptionStarted(address indexed subscriber, uint256 expiry);
    event SubscriptionRenewed(address indexed subscriber, uint256 expiry);
    event FeeUpdated(uint256 newFee);

    modifier onlyCreator() {
        require(msg.sender == creator, "Only the creator can perform this action.");
        _;
    }

    constructor() {
        creator = msg.sender;
    }

    // Set the subscription fee
    function setSubscriptionFee(uint256 fee) public onlyCreator {
        require(fee > 0, "Fee must be greater than zero.");
        subscriptionFee = fee;
        emit FeeUpdated(fee);
    }

    // Subscribe to the service
    function subscribe() public payable {
        require(msg.sender != creator, "The creator cannot subscribe to himself");
        require(subscriptionFee > 0, "Subscription fee has not been set.");
        require(msg.value == subscriptionFee, "Incorrect subscription fee sent.");
        require(subscriptions[msg.sender].expiry <= block.timestamp, "Cannot renew an active subscription.");

        uint256 newExpiry = block.timestamp + 30 days;
        subscriptions[msg.sender] = Subscription({
            expiry: newExpiry,
            fee: subscriptionFee
        });

        payable(creator).transfer(msg.value);
        emit SubscriptionStarted(msg.sender, newExpiry);
    }

    // Check if the subscription is active
    function isActiveSubscription(address subscriber) public view returns (bool) {
        return subscriptions[subscriber].expiry > block.timestamp;
    }

    // Get remaining time for the subscription
    function getRemainingTime(address subscriber) public view returns (uint256) {
        if (subscriptions[subscriber].expiry > block.timestamp) {
            return subscriptions[subscriber].expiry - block.timestamp;
        } else {
            return 0;
        }
    }
}
