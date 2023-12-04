import type { Coordinates, ForEachElementCallback } from './type';
import type { AnimateStore } from './core/Store';
export declare function raw(str: string): number;
export declare function getTransitionSizes(el: Element, oldCoords: Coordinates, newCoords: Coordinates): number[];
export declare function getCoords(el: Element): Coordinates;
export declare function target(el: Element, animateStore: AnimateStore, child?: Element): void;
export declare const getElement: (mutation: MutationRecord[], animateStore: AnimateStore) => Set<Element> | false;
export declare const forEachElements: (parent: Element, animateStore: AnimateStore, ...callbacks: ForEachElementCallback[]) => void;
