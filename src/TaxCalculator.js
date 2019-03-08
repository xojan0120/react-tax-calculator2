import React, { Component } from 'react';
import classNames           from "classnames";

class TaxCalculator extends Component {
  //constructor(props) {
  //  super(props);
  //}

  handleResultClick = (e) => {
    e.target.select()
  }

  priceClearClasses = (price) => {
    return classNames({
      "tax-calculator__price__clear": true,
      "is-show": price.toString().length > 0 ? true : false
    })
  }

  render() {
    return (
      <div className="tax-calculator">
        <div className="input-group input-group--x-lg tax-calculator__price">
          <span className="input-group__addon">&yen;</span>
          <input
            type="text"
            pattern="[0-9]*"
            className="input-group__control"
            placeholder="計算する金額"
            value={this.props.price}
            name="price"
            onChange={this.props.onPriceChange}
          />
          <button
            type="button"
            className={this.priceClearClasses(this.props.price)}
            onClick={this.props.onPriceClear}>
            &times;
          </button>
        </div>

        <div className="tax-calculator__results">
          <div className="input-group input-group--lg">
            <span className="input-group__addon">&yen;</span>
            <input
              type="text"
              readOnly={true}
              className="input-group__control"
              value={this.props.resultIncludeTax}
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
              value={this.props.resultExcludeTax}
              onClick={this.handleResultClick}
            />
            <span className="input-group__addon">税抜</span>
          </div>
        </div>

      </div>
    );
  }
}

export default TaxCalculator;
