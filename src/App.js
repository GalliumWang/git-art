import React, { Component } from "react";
import Navbar, { NAVBAR } from "./Navbar";
import GitContributionWall from "./GitContributionComponent/GitContributionClass";
import GitContributionComponentMain from "./GitContributionComponent/GitContributionComponentMain";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNav: NAVBAR.TEXT,
      gitContributionWall: new GitContributionWall()
    };
    this._selectNav = this._selectNav.bind(this);
  }

  _selectNav(navbarTab) {
    this.setState({
      selectedNav: navbarTab
    });
  }
  render() {
    function CreateHeader() {
      return (
        <section className="hero is-dark">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Git Art</h1>
              <h2 className="subtitle">Make your github pretty</h2>
            </div>
          </div>
        </section>
      );
    }

    return (
      <>
        <CreateHeader />
        <Navbar
          selectedNav={this.state.selectedNav}
          navbarTabOnClick={this._selectNav}
        />
        <GitContributionComponentMain
          gitWall={this.state.gitContributionWall}
        />
      </>
    );
  }
}

export default App;