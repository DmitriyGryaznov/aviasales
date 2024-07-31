import "./App.css";
import { useEffect } from "react";
import Page from "./components/Page/Page.jsx";
import { useDispatch } from "react-redux";
import { getTicketsAction } from "./store/reducers/ticketReducer.js";
import { ConfigProvider } from "antd";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicketsAction());
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2196F3",
          // borderRadius: 2,
          // colorBgContainer: '#f6ffed',
        },
      }}
    >
      <div className="App">
        <Page></Page>
      </div>
    </ConfigProvider>
  );
}

export default App;
