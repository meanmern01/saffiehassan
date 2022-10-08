import { useEffect, useState, useTransition } from 'react';
import { viewport } from '@/viewport';

const LayoutGrid = () => {
    const key = 'k';
    const lineWidth = 1;

    const baseColor = [0, 0, 255];
    const columnColor = `rgba(${baseColor.join(',')}, 0)`;
    const gapColor = `rgba(${baseColor.join(',')}, 0.75)`;

    const [hidden, setHidden] = useState(true);
    const [columnWidth, setColumnWidth] = useState(0);
    const [gapWidth, setGapWidth] = useState(0);
    const [offsetX, setOffsetX] = useState(0);

    const [_, startTransition] = useTransition();

    useEffect(() => {
        function onResize() {
            const docStyles = window.getComputedStyle(document.documentElement);
            const offsetX = docStyles.getPropertyValue('--offsetX')
                ? parseInt(docStyles.getPropertyValue('--offsetX'), 10)
                : 0;
            const gapWidth = parseInt(docStyles.getPropertyValue('--grid-gap'), 10);
            const gridColumns = parseInt(docStyles.getPropertyValue('--grid-columns'), 10);
            // const scrollbarWidth = docStyles.getPropertyValue('--scrollbar-width')
            //     ? parseInt(docStyles.getPropertyValue('--scrollbar-width'), 10)
            //     : 0;
            const scrollbarWidth = 0;
            const columnWidth =
                (viewport.width - scrollbarWidth - offsetX * 2) / gridColumns -
                gapWidth * ((gridColumns - 1) / gridColumns);

            startTransition(() => {
                setOffsetX(offsetX);
                setGapWidth(gapWidth);
                setColumnWidth(columnWidth);
            });
        }

        onResize();
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [columnColor, gapColor]);

    useEffect(() => {
        function onKeydown(event: KeyboardEvent) {
            if (event.key === key || event.key === key.toUpperCase()) {
                setHidden(!hidden);
            }
        }

        document.addEventListener('keydown', onKeydown);

        return () => {
            document.removeEventListener('keydown', onKeydown);
        };
    }, [hidden]);

    return (
        <div
            hidden={hidden}
            style={{
                pointerEvents: 'none',
                position: 'fixed',
                zIndex: 99999999,
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `repeating-linear-gradient(to right, ${columnColor}, ${columnColor} ${
                    columnWidth - (gapWidth === 0 ? lineWidth : 0)
                }px, ${gapColor} ${columnWidth - (gapWidth === 0 ? lineWidth : 0)}px, ${gapColor} ${
                    columnWidth + gapWidth
                }px)`,
                backgroundSize: `calc(100% - ${offsetX * 2}px) 100%`,
            }}
        ></div>
    );
};

export default LayoutGrid;
