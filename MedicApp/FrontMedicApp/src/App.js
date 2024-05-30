import Router from "./Router/Router";
import { MedicContextProvider } from './Context/medicContext';
function App() {
  return (
    <div >
      <MedicContextProvider>
        <Router />
      </MedicContextProvider>
    </div>
  );
}

export default App;
