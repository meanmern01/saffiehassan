import { viewport } from '@/viewport';

export function getOffsetTop(el: Element, windowScrollY = window.scrollY, heightOffset = 0): number {
    return el.getBoundingClientRect().top + windowScrollY - heightOffset;
}

export function wrap(toWrap: Element, wrapper?: HTMLElement) {
    const _wrapper = wrapper || document.createElement('div');
    toWrap.parentNode?.appendChild(_wrapper);
    _wrapper.appendChild(toWrap);
    return _wrapper;
}

export function isElementInViewport(el: Element) {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= viewport.height && rect.right <= viewport.width;
}
