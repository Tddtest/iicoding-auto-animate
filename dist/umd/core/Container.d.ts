import type { Containers } from '../type';
declare class Container {
    private containers;
    getContainer: (element: Element) => Containers;
    dispose: (element: Element) => void;
    private injectContainer;
}
declare const helper: Container;
export default helper;
