import { forwardRef, HTMLAttributes, ReactNode, useState } from 'react';
import classNames from 'classnames';
import IconButton from '@/components/shared/IconButton';
import Link from '@/components/shared/Link';
import ArrLeftIcon from '@/svg/arr-left.svg';
import DottedSquare from '@/components/shared/DottedSquare';

type Props = HTMLAttributes<HTMLElement> & {
    href?: string;
    text: string;
    icon: ReactNode;
    iconPosition?: 'left' | 'right';
    onLinkMouseenter?: () => void;
    onLinkMouseleave?: () => void;
    link?: boolean;
};

const TriangleLink = forwardRef<HTMLDivElement, Props>(
    ({ link, icon, href, text, iconPosition = 'left', onLinkMouseenter, onLinkMouseleave, ...props }, ref) => {
        const [hovered, setHovered] = useState(false);
        const [focused, setFocused] = useState(false);

        const renderButton = (as?: string) => (
            <IconButton
                as={as}
                icon={icon}
                iconPosition={iconPosition}
                className="dotted-square__item js-index-dotted-square__item"
                onMouseEnter={() => {
                    setHovered(true);
                    onLinkMouseenter?.();
                }}
                onMouseLeave={() => {
                    setHovered(false);
                    onLinkMouseleave?.();
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            >
                {text}
            </IconButton>
        );

        return (
            <div
                {...props}
                ref={ref}
                className={classNames('index-dotted-square', props.className, {
                    'is-hovered': hovered,
                    'is-focused': focused,
                })}
            >
                <DottedSquare className="js-index-dotted-square-el" expanded={hovered || focused} />
                <div className="dotted-square__link-wrapper">
                    {link ? (
                        <Link href={href || '/'} className="index-dotted-square__link" passHref>
                            {renderButton('a')}
                        </Link>
                    ) : (
                        renderButton()
                    )}
                </div>
            </div>
        );
    },
);

TriangleLink.displayName = 'TriangleLink';

export default TriangleLink;
