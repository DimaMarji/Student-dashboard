import { Provider } from "react-redux";
import "./App.scss";
import MainRouter from "./Routers/routers";
import store from "./Redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </>
  );
}

export default App;
