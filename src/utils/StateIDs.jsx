import React, { useState } from 'react';

const StatePredictionsContext = React.createContext();

function StatePredictionsProvider({ children }) {
  const [state_predictions, setState_predictions] = useState([]);

  const addPrediction = (prediction) => {
    setState_predictions((prevPredictions) => [...prevPredictions, prediction]);
  };

  const clearPredictions = () => {
    setState_predictions([]);
  };

  return (
    <StatePredictionsContext.Provider value={{ state_predictions, addPrediction, clearPredictions }}>
      {children}
    </StatePredictionsContext.Provider>
  );
}

function useStatePredictions() {
  return React.useContext(StatePredictionsContext);
}

export { StatePredictionsProvider, useStatePredictions };
