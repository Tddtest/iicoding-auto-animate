import type { AutoAnimateOptions, AutoAnimationPlugin } from './type';
export default function autoAnimate(el: HTMLElement, config?: Partial<AutoAnimateOptions> | AutoAnimationPlugin): Readonly<{
    parent: HTMLElement;
    enable: () => void;
    disable: () => void;
    isEnabled: () => boolean;
    dispose: () => void;
}>;
