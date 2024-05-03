import React, { useState } from 'react';

const StatePredictionsContext = React.createContext();

function StatePredictionsProvider({ children }) {
  const [state_predictions, setState_predictions] = useState([]);
  const [voting,setVoting]=useState([])
  const [president, setPresident] = useState();
  const [vicePresident, setVicePresident] = useState();
  const [party, setParty] = useState();
  const [token,setToken]=useState();


const addVoting=(vote)=>{
  setVoting((prev)=>[...prev,vote])
}

  const addPrediction = (prediction) => {
    setState_predictions((prevPredictions) => [...prevPredictions, prediction]);
  };

  const clearPredictions = () => {
    setState_predictions([]);
  };

  return (
    <StatePredictionsContext.Provider value={{voting,addVoting, token, setToken, state_predictions, addPrediction, clearPredictions,party,setParty, president, setPresident, vicePresident, setVicePresident }}>
      {children}
    </StatePredictionsContext.Provider>
  );
}

function useStatePredictions() {
  return React.useContext(StatePredictionsContext);
}

export { StatePredictionsProvider, useStatePredictions };
