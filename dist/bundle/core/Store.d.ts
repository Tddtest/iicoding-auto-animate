/// <reference types="node" />
import type { AnimateOptions, AutoAnimateOptions, AutoAnimationPlugin, Coordinates } from '../type';
declare class Store {
    readonly TGT = "__aa_tgt";
    readonly DEL = "__aa_del";
    readonly initKeyframe: AnimateOptions;
    readonly root: HTMLElement;
    mutations: MutationObserver | undefined;
    resize: ResizeObserver | undefined;
    parents: Set<Element>;
    enabled: WeakSet<Element>;
    coords: WeakMap<Element, Coordinates>;
    animations: WeakMap<Element, Animation>;
    keyframeMapping: WeakMap<Element, Record<string, AnimateOptions>>;
    defaultKeyframe: WeakMap<Element, AnimateOptions>;
    siblings: WeakMap<Element, Node[]>;
    debounce: WeakMap<Element, NodeJS.Timeout>;
    intervals: WeakMap<Element, NodeJS.Timeout>;
    intersections: WeakMap<Element, IntersectionObserver>;
    options: WeakMap<Element, AutoAnimateOptions | AutoAnimationPlugin>;
}
export type AnimateStore = InstanceType<typeof Store>;
export default Store;
