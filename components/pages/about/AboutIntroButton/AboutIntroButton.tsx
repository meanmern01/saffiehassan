import { HTMLAttributes, useEffect, useState } from 'react';
import classNames from 'classnames';
import DottedSquare from '@/components/shared/DottedSquare';
import TriangleLink from '@/components/pages/index/TriangleLink';
import IconButton from '@/components/shared/IconButton';
import { useRecoilValue } from 'recoil';
import { mediaQueryDeviceState } from '@/atoms/media-query-device';
import ArrLeftIcon from '@/svg/arr-left.svg';
import ArrRightIcon from '@/svg/arr-right.svg';

type Props = HTMLAttributes<HTMLElement> & {
    title: string;
    position: 'left' | 'right';
    onButtonClick?: () => void;
};

const AboutIntroButton = ({ title, position, onButtonClick, ...props }: Props) => {
    const mediaQueryDevice = useRecoilValue(mediaQueryDeviceState);

    if (mediaQueryDevice.includes('mobile')) {
        return (
            <IconButton
                {...props}
                direction="vertical"
                icon={<span className="icon-square"></span>}
                onClick={onButtonClick}
                className={classNames('about-intro-btn', `about-intro-btn--${position}`, props.className)}
            >
                {title}
            </IconButton>
        );
    }

    if (mediaQueryDevice.includes('tablet')) {
        return (
            <TriangleLink
                {...props}
                onClick={onButtonClick}
                text={title}
                icon={position === 'left' ? <ArrLeftIcon /> : <ArrRightIcon />}
                className={classNames(`index-${position}-link`, props.className)}
            />
        );
    }

    return (
        <button
            {...props}
            className={classNames('about-intro-btn', `about-intro-btn--${position}`, props.className)}
            onClick={onButtonClick}
        >
            <DottedSquare expanded animated className="about-square" />
            <span className="subhead about-intro-btn__text">{title}</span>
        </button>
    );
};

export default AboutIntroButton;
