import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "./styles/app.sass";
import Page from "./components/Page";
import LandingPage from "./screens/LandingPage";
import UploadVariants from "./screens/UploadVariants";
import UploadDetails from "./screens/UploadDetails";
import ConnectWallet from "./screens/ConnectWallet";
import Faq from "./screens/Faq";
import Activity from "./screens/Activity";
import Search01 from "./screens/Search01";
import Search02 from "./screens/Search02";
import Profile from "./screens/Profile";
import ProfileEdit from "./screens/ProfileEdit";
import Item from "./screens/Item";
import PageList from "./screens/PageList";
import { Web3AuthProvider, useWeb3Auth } from "./context/Web3AuthContext";

// Create a component for routes
const AppRoutes = () => {
  const history = useHistory();
  const { loggedIn } = useWeb3Auth();

  useEffect(() => {
    if (loggedIn) {
      history.push("/search01");
    } else {
      history.push("/");
    }
  }, [loggedIn, history]);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Page>
            <LandingPage />
          </Page>
        )}
      />
      <Route
        exact
        path="/upload-variants"
        render={() => (
          <Page>
            <UploadVariants />
          </Page>
        )}
      />
      <Route
        exact
        path="/upload-details"
        render={() => (
          <Page>
            <UploadDetails />
          </Page>
        )}
      />
      <Route
        exact
        path="/connect-wallet"
        render={() => (
          <Page>
            <ConnectWallet />
          </Page>
        )}
      />
      <Route
        exact
        path="/faq"
        render={() => (
          <Page>
            <Faq />
          </Page>
        )}
      />
      <Route
        exact
        path="/activity"
        render={() => (
          <Page>
            <Activity />
          </Page>
        )}
      />
      <Route
        exact
        path="/search01"
        render={() => (
          <Page>
            <Search01 />
          </Page>
        )}
      />
      <Route
        exact
        path="/search02"
        render={() => (
          <Page>
            <Search02 />
          </Page>
        )}
      />
      <Route
        exact
        path="/profile"
        render={() => (
          <Page>
            <Profile />
          </Page>
        )}
      />
      <Route
        exact
        path="/profile-edit"
        render={() => (
          <Page>
            <ProfileEdit />
          </Page>
        )}
      />
      <Route
        exact
        path="/item"
        render={() => (
          <Page>
            <Item />
          </Page>
        )}
      />
      <Route
        exact
        path="/pagelist"
        render={() => (
          <Page>
            <PageList />
          </Page>
        )}
      />
    </Switch>
  );
};

function App() {
  return (
    <Router>
      <Web3AuthProvider>
        <AppRoutes />
      </Web3AuthProvider>
    </Router>
  );
}

export default App;
