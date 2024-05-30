import Router from "./Router/Router";
import { MedicContextProvider, MedicContext } from './Context/medicContext';
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
