import React, { useState } from "react";

const StatePredictionsContext = React.createContext();

function StatePredictionsProvider({ children }) {
  const [state_predictions, setState_predictions] = useState([]);
  const [voting, setVoting] = useState([]);
  const [president, setPresident] = useState();
  const [vicePresident, setVicePresident] = useState();
  const [party, setParty] = useState();
  const [token, setToken] = useState();

  const addVoting = (vote) => {
    setVoting((prev) => [...prev, vote]);
  };
  // const resetVoting = () => {
  //   setPresident(null);
  //   setVicePresident(null);
  //   setParty(null);
  //   setVoting([]);
  // };

  const addPrediction = (prediction) => {
    setState_predictions((prevPredictions) => [...prevPredictions, prediction]);
    // setState_predictions((prev)=>{
    //   const newArrayPredection=[...prev];
    //   newArrayPredection[step]=prediction;
    //   return newArrayPredection;
    // })
  };

  const clearPredictions = () => {
    setState_predictions((prevPredictions) => prevPredictions.slice(0, -1));
  };

  const removeToken = () => {
    setToken("");
  };
  return (
    <StatePredictionsContext.Provider
      value={{
        voting,
        addVoting,
        token,
        setToken,
        removeToken,
        state_predictions,
        addPrediction,
        clearPredictions,
        party,
        setParty,
        president,
        setPresident,
        vicePresident,
        setVicePresident,
        // resetVoting,
      }}
    >
      {children}
    </StatePredictionsContext.Provider>
  );
}

function useStatePredictions() {
  return React.useContext(StatePredictionsContext);
}

export { StatePredictionsProvider, useStatePredictions };
