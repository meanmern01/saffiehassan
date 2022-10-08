/**
 * Link component.
 *
 * It replicates 'next/link' except scrolling to top.
 *
 * Because of custom page transitions we need the opportunity
 * to scroll the page in the right moment.
 */

import { default as NextLink, LinkProps } from 'next/link';

const Link = ({
    children,
    ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps) => {
    return (
        <NextLink {...props} scroll={props.scroll || false}>
            {children}
        </NextLink>
    );
};

export default Link;
