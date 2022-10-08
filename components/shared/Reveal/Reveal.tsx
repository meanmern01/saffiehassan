/**
 * Компонент для анимации
 * появления элементов на скролл
 */

import { cloneElement, ReactElement, useEffect, useRef } from 'react';

type Props = {
    children: ReactElement;
};

// const selector = '[data-reveal], .wysiwyg > *';

let observer: IntersectionObserver | null;

const Reveal = ({ children }: Props) => {
    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!observer) {
            observer = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        obs.unobserve(entry.target);
                        entry.target.classList.add('is-revealed');
                    }
                });
            });
        }
    }, []);

    useEffect(() => {
        const { current } = el;

        if (current && observer) {
            observer.observe(current);
        }

        return () => {
            if (current && observer) {
                observer.unobserve(current);
            }
        };
    }, []);

    return cloneElement(children, { ref: el, 'data-reveal': true });
};

export default Reveal;
