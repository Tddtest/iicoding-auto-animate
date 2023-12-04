(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.autoAnimate = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var Store = (function () {
        function Store() {
            this.TGT = '__aa_tgt';
            this.DEL = '__aa_del';
            this.initKeyframe = {
                indent: 'default',
                enter: [
                    { transform: 'scale(.98)', opacity: 0.3 },
                    { transform: 'scale(0.98)', opacity: 0.7, offset: 0.5 },
                    { transform: 'scale(1)', opacity: 1 },
                ],
                exit: [
                    { transform: 'scale(1)', opacity: 1 },
                    { transform: 'scale(.98)', opacity: 0 },
                ],
            };
            this.root = document.documentElement;
            this.parents = new Set();
            this.enabled = new WeakSet();
            this.coords = new WeakMap();
            this.animations = new WeakMap();
            this.keyframeMapping = new WeakMap();
            this.defaultKeyframe = new WeakMap();
            this.siblings = new WeakMap();
            this.debounce = new WeakMap();
            this.intervals = new WeakMap();
            this.intersections = new WeakMap();
            this.options = new WeakMap();
        }
        return Store;
    }());

    function raw(str) {
        return Number(str.replace(/[^0-9.\-]/g, ''));
    }
    function getTransitionSizes(el, oldCoords, newCoords) {
        var widthFrom = oldCoords.width;
        var heightFrom = oldCoords.height;
        var widthTo = newCoords.width;
        var heightTo = newCoords.height;
        var styles = getComputedStyle(el);
        var sizing = styles.getPropertyValue('box-sizing');
        if (sizing === 'content-box') {
            var paddingY = raw(styles.paddingTop) +
                raw(styles.paddingBottom) +
                raw(styles.borderTopWidth) +
                raw(styles.borderBottomWidth);
            var paddingX = raw(styles.paddingLeft) +
                raw(styles.paddingRight) +
                raw(styles.borderRightWidth) +
                raw(styles.borderLeftWidth);
            widthFrom -= paddingX;
            widthTo -= paddingX;
            heightFrom -= paddingY;
            heightTo -= paddingY;
        }
        return [widthFrom, widthTo, heightFrom, heightTo].map(Math.round);
    }
    function getCoords(el) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height,
        };
    }
    function target(el, animateStore, child) {
        var TGT = animateStore.TGT;
        if (!child && !(TGT in el)) {
            Object.defineProperty(el, TGT, { value: el });
        }
        else if (child && !(TGT in child)) {
            Object.defineProperty(child, TGT, { value: el });
        }
    }
    var getElement = function (mutation, animateStore) {
        var DEL = animateStore.DEL;
        var observedNodes = mutation.reduce(function (nodes, mutation) {
            return __spreadArray(__spreadArray(__spreadArray([], nodes, true), Array.from(mutation.addedNodes), true), Array.from(mutation.removedNodes), true);
        }, []);
        var onlyCommentNodesObserved = observedNodes.every(function (node) { return node.nodeName === '#comment'; });
        if (onlyCommentNodesObserved)
            return false;
        return mutation.reduce(function (elements, mutation) {
            if (elements === false)
                return false;
            if (mutation.target instanceof Element) {
                target(mutation.target, animateStore);
                if (!elements.has(mutation.target)) {
                    elements.add(mutation.target);
                    for (var i = 0; i < mutation.target.children.length; i++) {
                        var child = mutation.target.children.item(i);
                        if (!child)
                            continue;
                        if (DEL in child)
                            return false;
                        target(mutation.target, animateStore, child);
                        elements.add(child);
                    }
                }
                if (mutation.removedNodes.length) {
                    for (var i = 0; i < mutation.removedNodes.length; i++) {
                        var child = mutation.removedNodes[i];
                        if (DEL in child)
                            return false;
                        if (child instanceof Element) {
                            elements.add(child);
                            target(mutation.target, animateStore, child);
                            animateStore.siblings.set(child, [
                                mutation.previousSibling,
                                mutation.nextSibling,
                            ]);
                        }
                    }
                }
            }
            return elements;
        }, new Set());
    };
    var forEachElements = function (parent, animateStore) {
        var callbacks = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            callbacks[_i - 2] = arguments[_i];
        }
        callbacks.forEach(function (callback) {
            return callback(parent, animateStore.options.has(parent));
        });
        var _loop_1 = function (i) {
            var child = parent.children.item(i);
            if (child) {
                callbacks.forEach(function (callback) {
                    return callback(child, animateStore.options.has(child));
                });
            }
        };
        for (var i = 0; i < parent.children.length; i++) {
            _loop_1(i);
        }
    };

    var Animate = (function () {
        function Animate(store) {
            var _this = this;
            this.store = store;
            this.animate = function (el) {
                var _a;
                var isMounted = el.isConnected;
                var preExisting = _this.store.coords.has(el);
                if (isMounted && _this.store.siblings.has(el))
                    _this.store.siblings.delete(el);
                if (_this.store.animations.has(el)) {
                    (_a = _this.store.animations.get(el)) === null || _a === void 0 ? void 0 : _a.cancel();
                }
                if (preExisting && isMounted) {
                    _this.remain(el);
                }
                else if (preExisting && !isMounted) {
                    _this.remove(el);
                }
                else {
                    _this.add(el);
                }
            };
            this.updateAllPos = function () {
                clearTimeout(_this.store.debounce.get(_this.store.root));
                _this.store.debounce.set(_this.store.root, setTimeout(function () {
                    _this.store.parents.forEach(function (parent) {
                        return forEachElements(parent, _this.store, function (el) {
                            return _this.lowPriority(function () { return _this.updatePos(el); });
                        });
                    });
                }, 100));
            };
            this.updatePos = function (el) {
                clearTimeout(_this.store.debounce.get(el));
                var optionsOrPlugin = _this.getOptions(el);
                var delay = typeof optionsOrPlugin === 'function' ? 500 : optionsOrPlugin.duration;
                _this.store.debounce.set(el, setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var currentAnimation;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                currentAnimation = this.store.animations.get(el);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4, (currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.finished)];
                            case 2:
                                _a.sent();
                                this.store.coords.set(el, getCoords(el));
                                this.observePosition(el);
                                return [3, 4];
                            case 3:
                                _a.sent();
                                return [3, 4];
                            case 4: return [2];
                        }
                    });
                }); }, delay));
            };
            this.poll = function (el) {
                setTimeout(function () {
                    _this.store.intervals.set(el, setInterval(function () { return _this.lowPriority(_this.updatePos.bind(null, el)); }, 2000));
                }, Math.round(2000 * Math.random()));
            };
            this.remain = function (el) {
                var oldCoords = _this.store.coords.get(el);
                var newCoords = getCoords(el);
                if (!_this.isEnabled(el))
                    return _this.store.coords.set(el, newCoords);
                if (!oldCoords)
                    return false;
                var animation;
                var pluginOrOptions = _this.getOptions(el);
                if (typeof pluginOrOptions !== 'function') {
                    var deltaX = oldCoords.left - newCoords.left;
                    var deltaY = oldCoords.top - newCoords.top;
                    var _a = getTransitionSizes(el, oldCoords, newCoords), widthFrom = _a[0], widthTo = _a[1], heightFrom = _a[2], heightTo = _a[3];
                    var start = {
                        transform: "translate(".concat(deltaX, "px, ").concat(deltaY, "px)"),
                    };
                    var end = {
                        transform: 'translate(0, 0)',
                    };
                    if (widthFrom !== widthTo) {
                        start.width = "".concat(widthFrom, "px");
                        end.width = "".concat(widthTo, "px");
                    }
                    if (heightFrom !== heightTo) {
                        start.height = "".concat(heightFrom, "px");
                        end.height = "".concat(heightTo, "px");
                    }
                    animation = el.animate([start, end], {
                        duration: pluginOrOptions.duration,
                        easing: pluginOrOptions.easing,
                    });
                }
                else {
                    animation = new Animation(pluginOrOptions(el, 'remain', oldCoords, newCoords));
                    animation.play();
                }
                _this.store.animations.set(el, animation);
                _this.store.coords.set(el, newCoords);
                animation.addEventListener('finish', _this.updatePos.bind(null, el));
                return undefined;
            };
            this.remove = function (el) {
                var _a;
                if (!_this.store.siblings.has(el) || !_this.store.coords.has(el))
                    return;
                var _b = _this.store.siblings.get(el) || [], prev = _b[0], next = _b[1];
                Object.defineProperty(el, _this.store.DEL, { value: true });
                if (next && next.parentNode && next.parentNode instanceof Element) {
                    next.parentNode.insertBefore(el, next);
                }
                else if (prev && prev.parentNode) {
                    prev.parentNode.appendChild(el);
                }
                else {
                    (_a = _this.getTarget(el)) === null || _a === void 0 ? void 0 : _a.appendChild(el);
                }
                var cleanUp = function () {
                    var _a;
                    el.remove();
                    _this.store.coords.delete(el);
                    _this.store.siblings.delete(el);
                    _this.store.animations.delete(el);
                    (_a = _this.store.intersections.get(el)) === null || _a === void 0 ? void 0 : _a.disconnect();
                };
                if (!_this.isEnabled(el))
                    return cleanUp();
                var _c = _this.deletePosition(el), top = _c[0], left = _c[1], width = _c[2], height = _c[3];
                var optionsOrPlugin = _this.getOptions(el);
                var oldCoords = _this.store.coords.get(el);
                var animation;
                Object.assign(el.style, {
                    position: 'absolute',
                    top: "".concat(top, "px"),
                    left: "".concat(left, "px"),
                    width: "".concat(width, "px"),
                    height: "".concat(height, "px"),
                    margin: 0,
                    pointerEvents: 'none',
                    transformOrigin: 'center',
                    zIndex: 100,
                });
                if (typeof optionsOrPlugin !== 'function') {
                    var elementAnimateOption = _this.getKeyframeOpt(el);
                    animation = el.animate(elementAnimateOption.exit, {
                        duration: optionsOrPlugin.duration,
                        easing: 'ease-out',
                    });
                }
                else {
                    animation = new Animation(optionsOrPlugin(el, 'remove', oldCoords));
                    animation.play();
                }
                _this.store.animations.set(el, animation);
                animation.addEventListener('finish', cleanUp);
            };
            this.add = function (el) {
                var newCoords = getCoords(el);
                _this.store.coords.set(el, newCoords);
                var pluginOrOptions = _this.getOptions(el);
                if (!_this.isEnabled(el))
                    return;
                var animation;
                if (typeof pluginOrOptions !== 'function') {
                    var elementAnimateOption = _this.getKeyframeOpt(el);
                    if (elementAnimateOption.delay) {
                        el.setAttribute('style', 'opacity: 0');
                        var timer_1 = setTimeout(function () {
                            el.setAttribute('style', 'opacity: 1');
                            clearTimeout(timer_1);
                        }, elementAnimateOption.delay + 200);
                    }
                    animation = el.animate(elementAnimateOption.enter, {
                        duration: elementAnimateOption.duration || pluginOrOptions.duration,
                        easing: 'ease-in',
                        delay: elementAnimateOption.delay || 0,
                    });
                }
                else {
                    animation = new Animation(pluginOrOptions(el, 'add', newCoords));
                    animation.play();
                }
                _this.store.animations.set(el, animation);
                animation.addEventListener('finish', function () {
                    _this.updatePos(el);
                });
            };
            this.getOptions = function (el) {
                var TGT = _this.store.TGT;
                return TGT in el && _this.store.options.has(el[TGT])
                    ? _this.store.options.get(el[TGT])
                    : { duration: 250, easing: 'ease-in-out' };
            };
            this.lowPriority = function (callback) {
                if (typeof requestIdleCallback === 'function') {
                    requestIdleCallback(function () { return callback(); });
                }
                else {
                    requestAnimationFrame(function () { return callback(); });
                }
            };
            this.observePosition = function (el) {
                var oldObserver = _this.store.intersections.get(el);
                oldObserver === null || oldObserver === void 0 ? void 0 : oldObserver.disconnect();
                var rect = _this.store.coords.get(el);
                var invocations = 0;
                var buffer = 5;
                if (!rect) {
                    rect = getCoords(el);
                    _this.store.coords.set(el, rect);
                }
                var _a = _this.store.root, offsetWidth = _a.offsetWidth, offsetHeight = _a.offsetHeight;
                var rootMargins = [
                    rect.top - buffer,
                    offsetWidth - (rect.left + buffer + rect.width),
                    offsetHeight - (rect.top + buffer + rect.height),
                    rect.left - buffer,
                ];
                var rootMargin = rootMargins
                    .map(function (px) { return "".concat(-1 * Math.floor(px), "px"); })
                    .join(' ');
                var observer = new IntersectionObserver(function () {
                    ++invocations > 1 && _this.updatePos(el);
                }, {
                    root: _this.store.root,
                    rootMargin: rootMargin,
                    threshold: 1,
                });
                observer.observe(el);
                _this.store.intersections.set(el, observer);
            };
            this.getTarget = function (el) {
                return _this.store.TGT in el
                    ? el[_this.store.TGT]
                    : undefined;
            };
            this.isEnabled = function (el) {
                var target = _this.getTarget(el);
                return target ? _this.store.enabled.has(target) : false;
            };
            this.deletePosition = function (el) {
                var oldCoords = _this.store.coords.get(el);
                var _a = getTransitionSizes(el, oldCoords, getCoords(el)), width = _a[0], height = _a[2];
                var offsetParent = el.parentElement;
                while (offsetParent &&
                    (getComputedStyle(offsetParent).position === 'static' ||
                        offsetParent instanceof HTMLBodyElement)) {
                    offsetParent = offsetParent.parentElement;
                }
                if (!offsetParent)
                    offsetParent = document.body;
                var parentStyles = getComputedStyle(offsetParent);
                var parentCoords = _this.store.coords.get(offsetParent) || getCoords(offsetParent);
                var top = Math.round(oldCoords.top - parentCoords.top) -
                    raw(parentStyles.borderTopWidth);
                var left = Math.round(oldCoords.left - parentCoords.left) -
                    raw(parentStyles.borderLeftWidth);
                return [top, left, width, height];
            };
            this.getKeyframeOpt = function (el) {
                var keyframe = _this.store.initKeyframe;
                if (el.parentElement) {
                    var definedKeyframe = _this.store.keyframeMapping.get(el.parentElement);
                    var defaultOpt = _this.store.defaultKeyframe.get(el.parentElement);
                    var indent = el.getAttribute('data-indent');
                    if (definedKeyframe && indent) {
                        var animateOptions = definedKeyframe[indent];
                        keyframe = animateOptions || _this.store.initKeyframe;
                    }
                    if (defaultOpt) {
                        if (definedKeyframe && keyframe.delay === undefined) {
                            keyframe.delay = defaultOpt.delay;
                        }
                        else {
                            keyframe = defaultOpt || _this.store.initKeyframe;
                        }
                    }
                }
                return keyframe;
            };
            this.store = store;
        }
        return Animate;
    }());

    var AnimateObserve = (function () {
        function AnimateObserve(store, animate) {
            var _this = this;
            this.store = store;
            this.animate = animate;
            this.resizeElement = function (element) {
                var _a;
                (_a = _this.resize) === null || _a === void 0 ? void 0 : _a.observe(element);
            };
            this.handleMutations = function (mutations) {
                var elements = getElement(mutations, _this.store);
                if (elements) {
                    elements.forEach(function (element) {
                        _this.start(element);
                    });
                }
            };
            this.handleResizes = function (entries) {
                entries.forEach(function (entry) {
                    if (entry.target === _this.store.root)
                        _this.animate.updateAllPos();
                    if (_this.store.coords.has(entry.target))
                        _this.animate.updatePos(entry.target);
                });
            };
            this.start = function (el) {
                _this.animate.animate(el);
            };
            this.store = store;
            this.animate = animate;
            if (typeof window !== 'undefined') {
                this.mutations = new MutationObserver(this.handleMutations);
                this.resize = new ResizeObserver(this.handleResizes);
                this.resize.observe(this.store.root);
            }
        }
        return AnimateObserve;
    }());

    var Container = (function () {
        function Container() {
            var _this = this;
            this.containers = new WeakMap();
            this.getContainer = function (element) {
                if (!_this.containers.has(element)) {
                    _this.injectContainer(element);
                }
                return _this.containers.get(element);
            };
            this.dispose = function (element) {
                if (_this.containers.has(element)) {
                    _this.containers.delete(element);
                }
            };
            this.injectContainer = function (element) {
                var store = new Store();
                var animate = new Animate(store);
                var observe = new AnimateObserve(store, animate);
                _this.containers.set(element, { store: store, animate: animate, observe: observe });
            };
        }
        return Container;
    }());
    var helper = new Container();

    function autoAnimate(el, config) {
        var _a = helper.getContainer(el), store = _a.store, animate = _a.animate, observe = _a.observe;
        if (observe.resize && observe.mutations) {
            var mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            var isDisabledDueToReduceMotion = mediaQuery.matches;
            var configIsFun = typeof config === 'function';
            if (!isDisabledDueToReduceMotion) {
                store.enabled.add(el);
                if (getComputedStyle(el).position === 'static') {
                    Object.assign(el.style, { position: 'relative' });
                }
                if (configIsFun) {
                    store.options.set(el, config);
                }
                else {
                    store.options.set(el, __assign({ duration: 500, easing: 'ease-in-out' }, config));
                    if (config && (config === null || config === void 0 ? void 0 : config.animateOptions)) {
                        if (Array.isArray(config.animateOptions)) {
                            var indentMappingOpt_1 = {};
                            config.animateOptions.forEach(function (opt) {
                                indentMappingOpt_1[opt.indent] = opt;
                            });
                            store.keyframeMapping.set(el, indentMappingOpt_1);
                        }
                        else {
                            store.defaultKeyframe.set(el, __assign({ delay: config.delay }, config.animateOptions));
                        }
                    }
                }
                forEachElements(el, store, animate.updatePos, animate.poll, observe.resizeElement);
                observe.mutations.observe(el, { childList: true });
                store.parents.add(el);
            }
        }
        return Object.freeze({
            parent: el,
            enable: function () {
                store.enabled.add(el);
            },
            disable: function () {
                store.enabled.delete(el);
            },
            isEnabled: function () { return store.enabled.has(el); },
            dispose: function () {
                helper.dispose(el);
            },
        });
    }

    exports.autoAnimate = autoAnimate;
    exports.default = autoAnimate;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
