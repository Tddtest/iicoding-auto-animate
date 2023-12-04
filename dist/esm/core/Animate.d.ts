import type { AnimateStore } from './Store';
declare class Animate {
    readonly store: AnimateStore;
    constructor(store: AnimateStore);
    animate: (el: Element) => void;
    updateAllPos: () => void;
    updatePos: (el: Element) => void;
    poll: (el: Element) => void;
    private remain;
    private remove;
    private add;
    private getOptions;
    private lowPriority;
    private observePosition;
    private getTarget;
    private isEnabled;
    private deletePosition;
    private getKeyframeOpt;
}
export type AnimateType = InstanceType<typeof Animate>;
export default Animate;
