import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Preloader from './components/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';

const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer')
);

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer')
);

const Login = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className="wrapper">
        <HeaderContainer />
        <SidebarContainer />
        <Route
          path="/profile/:userId?"
          render={() => withSuspense(ProfileContainer)}
        />
        <Route path="/dialogs" render={() => withSuspense(DialogsContainer)} />
        <Route path="/news" component={News} />
        <Route path="/music" component={Music} />
        <Route path="/settings" component={Settings} />
        <Route path="/users" render={() => <UsersContainer />} />
        <Route path="/login" render={() => withSuspense(Login)} />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  };
};
export default compose(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(App);
