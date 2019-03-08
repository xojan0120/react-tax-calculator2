import React, { Component } from 'react';
import Select from 'react-select';
import DefaultSetting from "./constants/DefaultSetting";
import store from 'store';
import { Provider, Subscribe } from 'unstated';
import TaxContainer   from './TaxContainer';

class TaxSetting extends Component {
  //constructor(props) {
  //  super(props);
  //}

  //handleClearClick = (e) => {
  //  e.preventDefault()
  //}

  render() {

    const ruleOptions = [
      {value: "floor", label: "切り捨て"},
      {value: "ceil",  label: "切り上げ"},
      {value: "round", label: "四捨五入"},
    ]

    const formatOptions = [
      {value: "TYPE_1", label: "¥12000"},
      {value: "TYPE_2", label: "¥12,000"},
      {value: "TYPE_3", label: "¥+12,000"},
    ]

    return (
      <Provider>
        <Subscribe to={[TaxContainer]}>
          {tax => (

            <div className="tax-setting">

              <div className="tax-setting__row">
                <div className="tax-setting__col">
                  <div className="input-group">
                    <span className="input-group__addon">税率</span>
                    <input
                      type="number"
                      pattern="[0-9]*"
                      className="input-group__control"
                      placeholder="00"
                      value={tax.state.rate}
                      onChange={tax.handleRateChange}
                    />
                    <span className="input-group__addon">%</span>
                  </div>
                </div>

                <div className="tax-setting__col">
                  <div className="input-group">
                    <span className="input-group__addon">計算方法</span>
                    <Select
                      value={tax.state.rule}
                      className="input-group__control"
                      clearable={false}
                      searchable={false}
                      options={ruleOptions}
                      onChange={tax.handleRuleChange} />
                  </div>
                </div>

                <div className="tax-setting__col">
                  <div className="input-group">
                    <span className="input-group__addon">表記</span>
                    <Select
                      value={tax.state.format}
                      className="input-group__control"
                      clearable={false}
                      searchable={false}
                      options={formatOptions}
                      onChange={tax.handleFormatChange} />
                  </div>
                </div>
              </div>

              <button type="button" className="tax-setting__clear" onClick={tax.handleClearClick}>設定を初期化</button>
            </div>

          )}
        </Subscribe>
      </Provider>
    );
  }
}

export default TaxSetting;
