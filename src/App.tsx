import {Provider} from "react-redux";
import "./App.scss";
import MainRouter from "./Routers/routers";
import store from "./Redux/store";
import {LanguageProvider} from "./Context/Language/LanguageContext";

function App() {
    return (
        <>
            <Provider store={store}>
                <LanguageProvider>
                    <MainRouter/>
                </LanguageProvider>
            </Provider>
        </>
    );
}

export default App;
