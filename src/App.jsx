import AppRoutes from "./components/Routes";
import { StatePredictionsProvider } from "./utils/StateIDs";



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
