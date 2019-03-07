import store from 'store';
import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import TaxSetting     from './TaxSetting';
import TaxCalculator  from './TaxCalculator';
import About          from './About';
import DefaultSetting from './constants/DefaultSetting';
import { Provider, Subscribe } from 'unstated';
import TaxContainer   from './TaxContainer';
import './sass/style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: store.get("currentTab") || 0,
    }
    //price: store.get("price") || DefaultSetting.price,
  }

  //handlePriceChange = (price) => {
  //  store.set("price", price)
  //}

  handleTabSelect = (current, prev) => {
    store.set("currentTab", current);
    this.setState({ currentTab: current })
  }

  render() {
    return (
      <div>

        <GitHubForkRibbon
          href="https://github.com/tsuyoshiwada/react-tax-calculator"
          position="right"
          color="black">
          Fork me on GitHub
        </GitHubForkRibbon>

        <div className="header">
          <div className="container">
            <h1><i className="fa fa-dot-circle-o"></i> Tax Calculator</h1>
            <TaxCalculator />
          </div>
        </div>

        <div className="container">
          <Tabs onSelect={this.handleTabSelect} selectedIndex={this.state.currentTab}>
            <TabList>
              <Tab><i className="fa fa-cog"></i> Settings</Tab>
              <Tab><i className="fa fa-info-circle"></i> About</Tab>
            </TabList>
            <TabPanel>
              <TaxSetting />
            </TabPanel>
            <TabPanel>
              <About />
            </TabPanel>
          </Tabs>
        </div>


      </div>
    );
  }
}

export default App;
