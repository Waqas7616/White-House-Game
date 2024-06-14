import AppRoutes from "./components/Routes";
import { StatePredictionsProvider } from "./utils/StateIDs";
import ReactGA from 'react-ga4';

const TRACKING_ID="G-9TJST3ENJ6"
ReactGA.initialize(TRACKING_ID);


function App() {
  return (
    <StatePredictionsProvider>
      <div className="">


        <AppRoutes />
        {/* <ElectoralCollege /> */}
      </div>
    </StatePredictionsProvider>
  );
}

export default App;
