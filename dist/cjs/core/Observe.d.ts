import type { AnimateStore } from './Store';
import type { AnimateType } from './Animate';
declare class AnimateObserve {
    readonly store: AnimateStore;
    readonly animate: AnimateType;
    mutations: MutationObserver | undefined;
    resize: ResizeObserver | undefined;
    constructor(store: AnimateStore, animate: AnimateType);
    resizeElement: (element: Element) => void;
    private handleMutations;
    private handleResizes;
    private start;
}
export type AnimateObserveType = InstanceType<typeof AnimateObserve>;
export default AnimateObserve;
