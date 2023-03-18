class BlockchainService {
  constructor(contract, accounts, myself) {
    this.contract = contract;
    this.accounts = accounts;
    this.myself = myself;
  }

  setVote = async (id, fromAddress) => {
    try {
      return await this.contract.methods.setVote(id).send({from: fromAddress});
    } catch (err) {
      throw(err);
    }
  }

  addProposal = async (description, fromAddress) => {
    try {
      return await this.contract.methods.addProposal(description).send({from: fromAddress});
    } catch (err) {
      throw(err);
    }
  }

  register = async (address, fromAddress) => {
    try {
      console.log('called');
      return await this.contract.methods.addVoter(address).send({from: fromAddress});
    } catch (err) {
      throw(err);
    }
  }

  getCurrentStatus = async () => {
    try {
      return await this.contract.methods.workflowStatus().call();
    } catch (err) {
      console.error(err);
    }
  };

  nextStatus = async () => {
    let currentStatus = await this.getCurrentStatus();
    console.log(currentStatus === 1);
    console.log(currentStatus === "1");
    try {
      switch (currentStatus) {
        case "0":
          await this.contract.methods
            .startProposalsRegistering()
            .send({ from: this.accounts[0] });
          break;
        case "1":
          await this.contract.methods
            .endProposalsRegistering()
            .send({ from: this.accounts[0] });
          break;
        case "2":
          await this.contract.methods
            .startVotingSession()
            .send({ from: this.accounts[0] });
          break;
        case "3":
          await this.contract.methods
            .endVotingSession()
            .send({ from: this.accounts[0] });
          break;
        case "4":
          await this.contract.methods
            .tallyVotes()
            .send({ from: this.accounts[0] });
          break;
        default:
          console.log(`Voting session ended. `);
      }
    } catch (error) {
      console.error("Could'nt fetch voting session", error);
    }
  };

  getProposals = async () => {
    try {
      // return await this.contract.methods
      //   .getProposals()
      //   .call({ from: this.accounts[0] });
    } catch (err) {
      console.error(err);
    }
  };
}

export default BlockchainService;
