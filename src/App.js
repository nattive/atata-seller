import React from "react";
import logo from "./logo.svg";
import "./Styles/custom.css";
import "./Styles/bootstrap.min.css";
import AppNavigator from "./MainScreens/EntryPoint.js/AppNavigator";
import "rsuite/dist/styles/rsuite-default.css";
import { Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

// const Routes = {
//   Home: Index,
//   login: SignIn,
//   SignUpUser: SignUp,
//   SignUpSeller: CreateSeller,
//   dashboard: Home,
// };
// const MyNavigator = createSwitchNavigator(Routes);

// const MainPage = createBrowserApp(MyNavigator);

function App() {
  return (
    <div className=' h-100'>
      <Widget title="Chat with Support" />
      <AppNavigator />
    </div>
  );
}

export default App;
