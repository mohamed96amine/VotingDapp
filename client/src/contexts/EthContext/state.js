const actions = {
  init: "INIT",
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  myself: null,
  currentVotingStatus: null,
  blockchainService: null,
  proposals: null,
  winningProposalId: null,
  allEvents: null,
  proposals: null,
  newEvent: null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    case actions.updateCurrentVotingStatus:
      return {
        ...state,
        currentVotingStatus: data,
      };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
