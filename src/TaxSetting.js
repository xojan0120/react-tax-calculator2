import React, { Component } from 'react';
import Select               from 'react-select';

class TaxSetting extends Component {
  //constructor(props) {
  //  super(props);
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
                value={this.props.rate}
                onChange={this.props.onRateChange}
              />
              <span className="input-group__addon">%</span>
            </div>
          </div>

          <div className="tax-setting__col">
            <div className="input-group">
              <span className="input-group__addon">計算方法</span>
              <Select
                value={this.props.rule}
                className="input-group__control"
                clearable={false}
                searchable={false}
                options={ruleOptions}
                onChange={this.props.onRuleChange} />
            </div>
          </div>

          <div className="tax-setting__col">
            <div className="input-group">
              <span className="input-group__addon">表記</span>
              <Select
                value={this.props.format}
                className="input-group__control"
                clearable={false}
                searchable={false}
                options={formatOptions}
                onChange={this.props.onFormatChange} />
            </div>
          </div>
        </div>

        <button type="button" className="tax-setting__clear" onClick={this.props.onSettingClear}>設定を初期化</button>
      </div>
    );
  }
}

export default TaxSetting;
