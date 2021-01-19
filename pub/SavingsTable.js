"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SavingsTable = /** @class */ (function (_super) {
    __extends(SavingsTable, _super);
    function SavingsTable(props) {
        return _super.call(this, props) || this;
    }
    SavingsTable.prototype.render = function () {
        var savings = this.props.calculator.calculateSavings();
        var everyNthRow = 1;
        var end = savings.length - 1;
        if (savings.length > this.props.maxTableLength) {
            everyNthRow = Math.round(savings.length / this.props.maxTableLength);
        }
        var table = React.createElement("table", { id: "savingsTable" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "\u00C5r"),
                    React.createElement("th", null, "Med avkastning"),
                    React.createElement("th", null, "Utan avkastning"),
                    React.createElement("th", null, "Skillnad i %"))),
            React.createElement("tbody", null, savings.map(function (saving, i) {
                if (i % everyNthRow == 0 || i == 0 || i == end) {
                    return (React.createElement(SavingsTableRow, { key: i, savings: saving }));
                }
                else {
                    return null;
                }
            })));
        return table;
    };
    return SavingsTable;
}(React.Component));
var SavingsTableRow = /** @class */ (function (_super) {
    __extends(SavingsTableRow, _super);
    function SavingsTableRow(props) {
        return _super.call(this, props) || this;
    }
    SavingsTableRow.prototype.formatNumberNicely = function (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
    SavingsTableRow.prototype.render = function () {
        var diffInProcent = Math.round((this.props.savings.resultWithProfit / this.props.savings.resultNoProfit) * 100);
        var withProfit = this.formatNumberNicely(this.props.savings.resultWithProfit);
        var noProfit = this.formatNumberNicely(this.props.savings.resultNoProfit);
        var row = React.createElement("tr", null,
            React.createElement("td", null, this.props.savings.year),
            React.createElement("td", null,
                withProfit,
                " kr"),
            React.createElement("td", null,
                noProfit,
                " kr"),
            React.createElement("td", null,
                diffInProcent,
                "%"));
        return row;
    };
    return SavingsTableRow;
}(React.Component));