export type FormStateChangeAction<T = any> = {
    name: string;
    value: T;
}

interface ElementReplaceAction {
    operation: "replace";
    name: string;
    value: any;
    index: number;
}

interface ElementDeleteAction {
    operation: "delete";
    name: string;
    index: number;
}

interface ElementPushAction {
    operation: "push";
    name: string;
    value: any;
}

export type ArrayFieldChangeAction = ElementReplaceAction | ElementDeleteAction | ElementPushAction; 
