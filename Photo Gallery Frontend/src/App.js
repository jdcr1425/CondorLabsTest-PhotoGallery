import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { Content } from './components/content';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    const { children } = this.props;
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <Content body={children} />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
