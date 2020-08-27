import { FragmentType } from './enums';
export declare class QueryFragment {
    type: FragmentType;
    value: string;
    constructor(type: FragmentType, value: string);
}
