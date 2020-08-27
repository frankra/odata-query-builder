"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
var enums_1 = require("./enums");
var queryFragment_1 = require("./queryFragment");
var orderBy = require('lodash.orderby');
var FilterBuilder = /** @class */ (function () {
    function FilterBuilder() {
        var _this = this;
        this.fragments = [];
        this.filterExpression = function (field, operator, value) {
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.Filter, field + " " + operator + " " + _this.getValue(value)));
            return _this;
        };
        this.filterPhrase = function (phrase) {
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.Filter, phrase));
            return _this;
        };
        this.and = function (predicate) {
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.Filter, "(" + predicate(new FilterBuilder()).toQuery('and') + ")"));
            return _this;
        };
        this.or = function (predicate) {
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.Filter, "(" + predicate(new FilterBuilder()).toQuery('or') + ")"));
            return _this;
        };
        this.toQuery = function (operator) {
            if (!_this.fragments || _this.fragments.length < 1)
                return '';
            return _this.fragments.map(function (f) { return f.value; }).join(" " + operator + " ");
        };
    }
    FilterBuilder.prototype.getValue = function (value) {
        var type = typeof value;
        if (value instanceof Date)
            type = 'date';
        switch (type) {
            case 'string':
                return "'" + value + "'";
            case 'date':
                return "" + value.toISOString();
            default:
                return "" + value;
        }
    };
    return FilterBuilder;
}());
exports.default = FilterBuilder;
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder() {
        var _this = this;
        this.fragments = [];
        this.orderBy = function (fields) {
            _this.clear(enums_1.FragmentType.OrderBy);
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.OrderBy, "$orderby=" + fields));
            return _this;
        };
        this.top = function (top) {
            _this.clear(enums_1.FragmentType.Top);
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.Top, "$top=" + top));
            return _this;
        };
        this.skip = function (skip) {
            _this.clear(enums_1.FragmentType.Skip);
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.Skip, "$skip=" + skip));
            return _this;
        };
        this.count = function () {
            _this.clear(enums_1.FragmentType.Count);
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.Count, "$count=true"));
            return _this;
        };
        this.expand = function (fields) {
            _this.clear(enums_1.FragmentType.Expand);
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.Expand, "$expand=" + fields));
            return _this;
        };
        this.select = function (fields) {
            _this.clear(enums_1.FragmentType.Select);
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.Select, "$select=" + fields));
            return _this;
        };
        this.filter = function (predicate, operator) {
            if (operator === void 0) { operator = 'and'; }
            _this.clear(enums_1.FragmentType.Filter);
            _this.fragments.push(new queryFragment_1.QueryFragment(enums_1.FragmentType.Filter, predicate(new FilterBuilder()).toQuery(operator)));
            return _this;
        };
        this.clear = function (fragmentType) {
            _this.fragments = _this.fragments.filter(function (f) { return f.type !== fragmentType; });
            return _this;
        };
        this.toQuery = function () {
            if (_this.fragments.length < 1)
                return '';
            var sortedFragments = orderBy(_this.fragments, function (sf) { return sf.type; });
            var nonFilterFragments = sortedFragments.filter(function (sf) { return sf.type !== enums_1.FragmentType.Filter; });
            var filterFragments = sortedFragments.filter(function (sf) { return sf.type === enums_1.FragmentType.Filter; });
            var query = '?' +
                sortedFragments
                    .filter(function (sf) { return sf.type !== enums_1.FragmentType.Filter; })
                    .map(function (sf) { return sf.value; })
                    .join('&');
            if (filterFragments.length < 1)
                return query;
            else if (nonFilterFragments.length > 0)
                query += '&';
            query += _this.parseFilters(filterFragments, 'and').trim();
            return query;
        };
    }
    QueryBuilder.prototype.parseFilters = function (fragments, operator) {
        if (!fragments === null || fragments.length < 1)
            return '';
        return '$filter=' + fragments.map(function (f) { return f.value; }).join(" " + operator + " ");
    };
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=queryBuilder.js.map