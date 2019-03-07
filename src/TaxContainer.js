import React, { Component } from 'react';
import { Provider, Subscribe, Container } from 'unstated';
import DefaultSetting from './constants/DefaultSetting';
import store from 'store';

class TaxContainer extends Container {
  state = {
    price: store.get("price") || DefaultSetting.price,
    rate: store.get("rate") || DefaultSetting.rate,
    rule: store.get("rule") || DefaultSetting.rule,
    format: store.get("format") || DefaultSetting.format,
  }

  handlePriceChange = (e) => {
    store.set("price", e.target.value)
    this.setState({price: e.target.value})
  }

  handlePriceClearClick = (e) => {
    e.preventDefault()
    this.setState({price: ""})
  }


  handleRateChange = (e) => {
    store.set("rate", e.target.value)
    this.setState({rate: e.target.value})
  }

  handleRuleChange = (rule) => {
    store.set("rule", rule)
    this.setState({rule: rule})
  }

  handleFormatChange = (format) => {
    store.set("format", format)
    this.setState({format: format})
  }

  handleClearClick = (e) => {
    e.preventDefault()
    this.setState({rate: DefaultSetting.rate})
    this.setState({rule: DefaultSetting.rule})
    this.setState({format: DefaultSetting.format})
    store.set("rate", DefaultSetting.rate)
    store.set("rule", DefaultSetting.rule)
    store.set("format", DefaultSetting.format)
  }
}

export default TaxContainer;
