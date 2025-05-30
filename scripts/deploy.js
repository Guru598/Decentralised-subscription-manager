async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const SubscriptionContract = await ethers.getContractFactory("DecentralizedContentSubscription");
    const contract = await SubscriptionContract.deploy();
    console.log("Subscription contract deployed to:", contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  