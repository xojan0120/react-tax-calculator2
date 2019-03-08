import React, { Component } from 'react';
import numeral from "numeral";
import classNames from "classnames";
import DefaultSetting from './constants/DefaultSetting';
import store from 'store';
import FormatType from "./constants/FormatType";
import { Provider, Subscribe, Container } from 'unstated';
import TaxContainer   from './TaxContainer';

class TaxCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log("fa")
    return true
  }

  handlePriceChange = (e) => {
    this.setState({
      price: e.target.value
    })
  }

  handleResultClick = (e) => {
    e.target.select()
  }

  //calcPrice = (price, rate, rule, format, includeTax=true) => {
  //  // numeral(price)はフォーマット済みのpriceを元の数値に戻す
  //  price = numeral(price).value()
  //  rate = rate / 100 + 1
  //  let mathMethod = Math[rule.value]

  //  if (isNaN(price)) {
  //    return 0
  //  } else {
  //    let val = includeTax ? (price * rate) : (price / rate)
  //    val = mathMethod(val)
  //    return numeral(val).format(FormatType[format.value])
  //  }
  //}

  priceClearClasses = (price) => {
    return classNames({
             "tax-calculator__price__clear": true,
             "is-show": price.toString().length > 0 ? true : false
           })
  }

  render() {
    return (
      <Provider>
        <Subscribe to={[TaxContainer]}>
          {tax => (

            <div className="tax-calculator">
              <div className="input-group input-group--x-lg tax-calculator__price">

                <span className="input-group__addon">&yen;</span>
                <input
                  type="text"
                  pattern="[0-9]*"
                  className="input-group__control"
                  placeholder="計算する金額"
                  value={this.state.price}
                  name="price"
                  onChange={this.handlePriceChange}
                />
                <button
                  type="button"
                  className={this.priceClearClasses(tax.state.price)}
                  onClick={tax.handlePriceClearClick}>
                  &times;
                </button>

                <div className="tax-calculator__results">
                  <div className="input-group input-group--lg">
                    <span className="input-group__addon">&yen;</span>
                    <input
                      type="text"
                      readOnly={true}
                      className="input-group__control"
                      value={tax.state.resultIncludeTax}
                      onClick={this.handleResultClick}
                    />
                    <span className="input-group__addon">税込</span>
                  </div>
                  <div className="input-group input-group--lg">
                    <span className="input-group__addon">&yen;</span>
                    <input
                      type="text"
                      readOnly={true}
                      className="input-group__control"
                      value={tax.state.resultExcludeTax}
                      onClick={this.handleResultClick}
                    />
                    <span className="input-group__addon">税抜</span>
                  </div>
                </div>

              </div>
            </div>

          )}
        </Subscribe>
      </Provider>
    );
  }
}

export default TaxCalculator;
