import                                       './sass/style.scss';
import About                            from './About';
import DefaultSetting                   from './constants/DefaultSetting';
import FormatType                       from "./constants/FormatType";
import GitHubForkRibbon                 from 'react-github-fork-ribbon';
import React, { Component }             from 'react';
import TaxCalculator                    from './TaxCalculator';
import TaxSetting                       from './TaxSetting';
import numeral                          from "numeral";
import store                            from 'store';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price:      store.get("price")      || DefaultSetting.price,
      rate:       store.get("rate")       || DefaultSetting.rate,
      rule:       store.get("rule")       || DefaultSetting.rule,
      format:     store.get("format")     || DefaultSetting.format,
      currentTab: store.get("currentTab") || 0,
      resultIncludeTax: 0,
      resultExcludeTax: 0,
    }
  }

  componentDidMount = () => {
    this.handleCalcPrice()
  }

  handlePriceChange = (e) => {
    const formatedPrice = e.target.value
    store.set("price", formatedPrice)
    this.setState({ price: formatedPrice })
    this.handleCalcPrice({ formatedPrice })
  }

  handlePriceClear = (e) => {
    e.preventDefault()

    this.setState({ price: "" })
    this.handleCalcPrice({ formatedPrice: "" })
  }

  handleTabSelect = (current, prev) => {
    store.set("currentTab", current);
    this.setState({ currentTab: current })
  }

  handleRateChange = (e) => {
    const rate = e.target.value
    store.set("rate", rate)
    this.setState({ rate: rate })
    this.handleCalcPrice({ rate: rate })
  }

  // SelectコンポーネントのonChange時に渡されるパラメータは
  // value属性にセットされているオブジェクト。
  // 通常のinput要素のようなイベントオブジェクトではない。
  handleRuleChange = (rule) => {
    store.set("rule", rule)
    this.setState({ rule: rule })
    this.handleCalcPrice({ rule: rule })
  }

  handleFormatChange = (format) => {
    store.set("format", format)
    this.setState({ format: format })
    this.handleCalcPrice({ format: format })
  }

  calcPrice = (formatedPrice, srcRate, rule, format, includeTax) => {
    // numeral(price)はフォーマット済みのpriceを元の数値に戻す
    let price = numeral(formatedPrice).value()

    if (isNaN(price)) {
      return 0
    } else {
      let rate = srcRate / 100 + 1
      let mathMethod = Math[rule.value]
      let result = includeTax ? (price * rate) : (price / rate)
      result = mathMethod(result)
      return this.formatPrice(result, format)
    }
  }

  formatPrice = (price, format) => {
    return numeral(price).format(FormatType[format.value]) 
  }

  handleCalcPrice = (
    { 
      formatedPrice = this.state.price,
      rate          = this.state.rate,
      rule          = this.state.rule,
      format        = this.state.format
    } = {}
  ) => {
    this.setState({ 
      resultIncludeTax: this.calcPrice(formatedPrice, rate, rule, format, true),
      resultExcludeTax: this.calcPrice(formatedPrice, rate, rule, format, false)
    })
  }

  handleSettingClear = (e) => {
    e.preventDefault()

    store.set("rate",   DefaultSetting.rate)
    store.set("rule",   DefaultSetting.rule)
    store.set("format", DefaultSetting.format)

    this.setState({
      rate:   DefaultSetting.rate,
      rule:   DefaultSetting.rule,
      format: DefaultSetting.format
    })

    this.handleCalcPrice({
      rate:   DefaultSetting.rate,
      rule:   DefaultSetting.rule,
      format: DefaultSetting.format
    })
  }

  render() {
    return (
      <div>

        <GitHubForkRibbon
          href="https://github.com/tsuyoshiwada/react-tax-calculator"
          position="right"
          color="black">
          xojan0120
        </GitHubForkRibbon>

        <div className="header">
          <div className="container">
            <h1><i className="fas fa-calculator"></i> Tax Calculator</h1>
            <TaxCalculator
              price={this.state.price}
              resultIncludeTax={this.state.resultIncludeTax}
              resultExcludeTax={this.state.resultExcludeTax}
              onPriceChange={this.handlePriceChange}
              onPriceClear={this.handlePriceClear}
            />
          </div>
        </div>

        <div className="container">
          <Tabs onSelect={this.handleTabSelect} selectedIndex={this.state.currentTab}>
            <TabList>
              <Tab><i className="fa fa-cog"></i> Settings</Tab>
              <Tab><i className="fa fa-info-circle"></i> About</Tab>
            </TabList>
            <TabPanel>
              <TaxSetting
                rate={this.state.rate}
                rule={this.state.rule}
                format={this.state.format}
                onRateChange={this.handleRateChange}
                onRuleChange={this.handleRuleChange}
                onFormatChange={this.handleFormatChange}
                onSettingClear={this.handleSettingClear}
              />
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
