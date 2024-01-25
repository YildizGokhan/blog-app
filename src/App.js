
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"


function App() {
  return (
    <>
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
        <ToastContainer />
      </Provider>
      
    </>

  );
}

export default App;