import React, { Component } from 'react';
import { Provider, Subscribe, Container } from 'unstated';
import DefaultSetting from './constants/DefaultSetting';
import store from 'store';
import numeral from "numeral";
import FormatType from "./constants/FormatType";

class TaxContainer extends Container {
  state = {
    price: store.get("price") || DefaultSetting.price,
    rate: store.get("rate") || DefaultSetting.rate,
    rule: store.get("rule") || DefaultSetting.rule,
    format: store.get("format") || DefaultSetting.format,
    resultIncludeTax: 1,
    resultExcludeTax: 1,
  }

  handlePriceChange = (e) => {
    store.set("price", e.target.value)
    this.setState({price: e.target.value})
    //this.setState(()=>{
    //  return {price: e.target.value}
    //},
    //  ()=>{this.calcPrice()}
    //)
  }

  handlePriceClearClick = (e) => {
    e.preventDefault()
    this.setState({price: ""})
  }


  handleRateChange = (e) => {
    console.log(`handleRateChange:${e.target.value}`)
    store.set("rate", e.target.value)
    this.setState(()=>{
      return {rate: e.target.value}
    },
      ()=>{this.calcPrice()}
    )
  }

  handleRuleChange = (rule) => {
    store.set("rule", rule)
    this.setState({rule: rule})
  }

  handleFormatChange = (e) => {
    console.log(e)
    store.set("format", e.target.value)
    this.setState({format: e.target.value})
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

  calcPrice = () => {
    console.log("calc!")
    // numeral(price)はフォーマット済みのpriceを元の数値に戻す
    let price = numeral(this.state.price).value()
    let rate = this.state.rate / 100 + 1
    let mathMethod = Math[this.state.rule.value]
    let result1 = 0
    let result2 = 0

    if (isNaN(price)) {
      console.log("price is NaN")
    } else {
      result1 = mathMethod((price * rate))
      this.setState(()=>{
        return {resultIncludeTax: numeral(result1).format(FormatType[this.state.format.value])}
      })

      result2 = mathMethod((price / rate))
      this.setState(()=>{
        return {resultExcludeTax: numeral(result2).format(FormatType[this.state.format.value])}
      })

      console.log(this.state.resultIncludeTax)
      console.log(this.state.resultExcludeTax)
    }
  }
}

export default TaxContainer;
