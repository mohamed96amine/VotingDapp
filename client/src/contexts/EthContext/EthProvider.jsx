import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import BlockchainService from "../../service/BlockchainService";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const accounts = await web3.eth.requestAccounts();
      const currentUser = accounts[0];
      const networkID = await web3.eth.net.getId();
      const { abi } = artifact;
      let address,
        contract,
        myself,
        blockchainService,
        winningProposalId,
        currentVotingStatus;
      let proposals = false;
      let allEvents = [];
      try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
        const owner = await contract.methods.owner().call();
        const getMyself = await contract.methods
          .myself()
          .call({ from: currentUser });
        myself = {
          address: currentUser,
          isOwner: currentUser === owner,
          isRegistered: !!getMyself?.isRegistered,
          hasVoted: !!getMyself?.hasVoted,
          votedProposalId: parseInt(getMyself?.votedProposalId || 0),
        };
        blockchainService = new BlockchainService(contract, accounts, myself);
        if (myself.isRegistered) {
          proposals = await contract.methods
            .getProposals()
            .call({ from: currentUser });
        }
        allEvents = await contract.getPastEvents("allEvents", {
          fromBlock: 0,
          toBlock: "latest",
        });
        currentVotingStatus = await contract.methods
          .workflowStatus()
          .call({ from: currentUser });
        winningProposalId = await contract.methods
          .winningProposalID()
          .call({ from: currentUser });

        contract.events.WorkflowStatusChange({}, async (err, event) => {
          if (!err) {
            const newStatus = event.returnValues.newStatus;
            dispatch({
              type: actions.updateCurrentVotingStatus,
              data: newStatus,
            });
          }
        });
      } catch (err) {
        console.error(err);
      }
      dispatch({
        type: actions.init,
        data: {
          artifact,
          web3,
          accounts,
          networkID,
          contract,
          myself,
          blockchainService,
          winningProposalId,
          allEvents: allEvents,
          currentVotingStatus,
          proposals,
        },
      });
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Voting.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged", ""];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
