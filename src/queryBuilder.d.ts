import { FragmentType } from './enums';
declare type filterExpressionType = string | number | boolean | Date;
export default class FilterBuilder {
    private fragments;
    filterExpression: (field: string, operator: string, value: filterExpressionType) => this;
    filterPhrase: (phrase: string) => this;
    and: (predicate: (filter: FilterBuilder) => FilterBuilder) => this;
    or: (predicate: (filter: FilterBuilder) => FilterBuilder) => this;
    toQuery: (operator: string) => string;
    private getValue;
}
export declare class QueryBuilder {
    private fragments;
    orderBy: (fields: string) => this;
    top: (top: number) => this;
    skip: (skip: number) => this;
    count: () => this;
    expand: (fields: string) => this;
    select: (fields: string) => this;
    filter: (predicate: (filter: FilterBuilder) => FilterBuilder, operator?: string) => this;
    clear: (fragmentType: FragmentType) => this;
    toQuery: () => string;
    private parseFilters;
}
export {};
