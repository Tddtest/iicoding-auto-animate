import type { AnimateStore } from './core/Store';
import type { AnimateType } from './core/Animate';
import type { AnimateObserveType } from './core/Observe';
export interface Coordinates {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface Containers {
    store: AnimateStore;
    animate: AnimateType;
    observe: AnimateObserveType;
}
export type SiblingNode = Node | null;
export type Actions = 'add' | 'remove' | 'remain';
export interface AnimateOptions {
    indent: string;
    enter: Keyframe[];
    exit: Keyframe[];
    delay?: number;
    duration?: number;
}
export interface AutoAnimateOptions {
    duration: number;
    easing: 'linear' | 'ease-in' | 'ease-in-out' | 'string';
    delay?: number;
    animateOptions?: AnimateOptions | AnimateOptions[];
    disrespectUserMotionPreference?: boolean;
}
export interface AutoAnimationPlugin {
    <T extends Actions>(el: Element, action: T, newCoordinates?: T extends Actions ? Coordinates : undefined, oldCoordinates?: T extends 'remain' ? Coordinates : undefined): KeyframeEffect;
}
export type IndentElement = Element & {
    __aa_tgt: Element;
};
export type ForEachElementCallback = (el: Element, isRoot?: boolean) => void;
