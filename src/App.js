import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
import VerifyCredentials from "./screens/VerifyCredentials";
import { Web3AuthProvider, useWeb3Auth } from "./context/Web3AuthContext";

const AppRoutes = () => {
  const { loggedIn } = useWeb3Auth();

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
        path="/verify"
        render={() => (
          <Page>
            <VerifyCredentials />
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
        render={() =>
          loggedIn ? (
            <Page>
              <Search01 />
            </Page>
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/search02"
        render={() =>
          loggedIn ? (
            <Page>
              <Search02 />
            </Page>
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/profile"
        render={() =>
          loggedIn ? (
            <Page>
              <Profile />
            </Page>
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/profile-edit"
        render={() =>
          loggedIn ? (
            <Page>
              <ProfileEdit />
            </Page>
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/item"
        render={() =>
          loggedIn ? (
            <Page>
              <Item />
            </Page> 
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/pagelist"
        render={() =>
          loggedIn ? (
            <Page>
              <PageList />
            </Page>
          ) : (
            <Redirect to="/" />
          )
        }
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
