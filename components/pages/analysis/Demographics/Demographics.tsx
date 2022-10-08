import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import styles from './Demographics.module.scss';
import PickButton from '@/components/shared/PickButton';
import AIConfidenceDashboard from '../AIConfidenceDashboard/AIConfidenceDashboard';
import { mediaQueryDeviceState } from '@/atoms/media-query-device';
import IconButton from '@/components/shared/IconButton';
import ArrLeftIcon from '@/svg/arr-left.svg';
import Diagram from '../Diagram';
import { preloaderReadyState } from '@/atoms/preloader-ready';

const Demographics = ({ data, findSelectedOption, setActiveKeyOptionById }: any) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
    const mediaQueryDevice = useRecoilValue(mediaQueryDeviceState);
    const shouldRenderConfidenceDashboard = mediaQueryDevice === 'desktop' || mediaQueryDevice === 'horizontal-tablet';
    const preloaderReady = useRecoilValue(preloaderReadyState);
    const [isNarrowMobile, setIsNarrowMobile] = useState(false);

    useEffect(() => {
        const onResize = () => {
            setIsNarrowMobile(matchMedia('(max-width: 420px)').matches);
        };

        onResize();
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (isNarrowMobile && typeof openModalIndex === 'number') {
            document.documentElement.classList.add('no-scroll');
        } else {
            document.documentElement.classList.remove('no-scroll');
        }

        return () => document.documentElement.classList.remove('no-scroll');
    }, [openModalIndex, isNarrowMobile]);

    return (
        <Tabs
            className={styles.container}
            selectedIndex={tabIndex}
            onSelect={(tabIndex) => setTabIndex(tabIndex)}
            focusTabOnClick={false}
        >
            <div className={styles.left}>
                <TabList className="list-unstyled">
                    {Object.keys(data).map((key, i) => (
                        <Tab key={key} className={styles['pick-button']}>
                            <PickButton
                                category={key}
                                title={findSelectedOption(data, key)?.name}
                                className={classNames('curtain-reveal-element js-curtain-reveal-element', {
                                    'is-revealed': preloaderReady,
                                })}
                                active={(typeof window !== 'undefined' ? !isNarrowMobile : true) && tabIndex === i}
                                onClick={
                                    (typeof window !== 'undefined' ? isNarrowMobile : false)
                                        ? () => setOpenModalIndex(i)
                                        : undefined
                                }
                            >
                                {!shouldRenderConfidenceDashboard && (
                                    <span className={styles['pick-button-diagram']}>
                                        <Diagram
                                            percent={findSelectedOption(data, key)?.accuracy || 0}
                                            className={styles['pick-button-diagram__item']}
                                        />
                                        <span className={styles['pick-button-diagram__text']}>Edit</span>
                                    </span>
                                )}
                            </PickButton>
                        </Tab>
                    ))}
                </TabList>
            </div>
            <div className={styles.right}>
                {Object.keys(data).map((key, i) => (
                    <TabPanel key={key} className={styles.panel}>
                        {shouldRenderConfidenceDashboard && (
                            <AIConfidenceDashboard
                                percent={findSelectedOption(data, key)?.accuracy || 0}
                                className={classNames('curtain-reveal-element js-curtain-reveal-element', {
                                    'is-revealed': preloaderReady,
                                })}
                            />
                        )}
                        <div
                            className={classNames(
                                'curtain-reveal-element js-curtain-reveal-element',
                                styles['race-confidence'],
                                {
                                    'is-revealed': preloaderReady,
                                    [styles['race-confidence--opened']]: openModalIndex === i,
                                },
                            )}
                        >
                            <div className={styles['race-confidence__top-line']}>
                                <IconButton
                                    icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                                    onClick={() => setOpenModalIndex(null)}
                                >
                                    Back
                                </IconButton>
                            </div>
                            <div className={classNames('subhead', styles['race-confidence__top'])}>
                                <div>Race</div>
                                <div>A. I. confidence</div>
                            </div>
                            <div className={styles['race-confidence__content']}>
                                {data[key].options.map((option) => (
                                    <button
                                        key={option.id}
                                        className={classNames(styles['race-confidence__row'], {
                                            [styles['race-confidence__row--selected']]: option.selected,
                                        })}
                                        onClick={() => setActiveKeyOptionById(key, option.id)}
                                    >
                                        <span className={styles['race-confidence__key']}>{option.name}</span>
                                        <span className={styles['race-confidence__value']}>{option.accuracy}%</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </TabPanel>
                ))}
            </div>
        </Tabs>
    );
};

export default Demographics;
