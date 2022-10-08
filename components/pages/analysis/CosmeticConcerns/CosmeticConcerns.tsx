import styles from './CosmeticConcerns.module.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import PickButton from '@/components/shared/PickButton';
import AIConfidenceDashboard from '../AIConfidenceDashboard/AIConfidenceDashboard';
import { mediaQueryDeviceState } from '@/atoms/media-query-device';
import IconButton from '@/components/shared/IconButton';
import ArrLeftIcon from '@/svg/arr-left.svg';
import Diagram from '../Diagram';
import { preloaderReadyState } from '@/atoms/preloader-ready';

const CosmeticConcerns = ({ data }: any) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
    const mediaQueryDevice = useRecoilValue(mediaQueryDeviceState);
    const shouldRenderConfidenceDashboard =
        mediaQueryDevice === 'desktop' ||
        mediaQueryDevice.includes('tablet') ||
        (typeof window !== 'undefined' ? matchMedia('(min-width: 577px)').matches : true);
    const preloaderReady = useRecoilValue(preloaderReadyState);
    const [isNarrowMobile, setIsNarrowMobile] = useState(false);

    useEffect(() => {
        const onResize = () => {
            setIsNarrowMobile(matchMedia('(max-width: 576px)').matches);
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
                <TabList className={classNames('list-unstyled', styles['pick-buttons-list'])}>
                    {data.map((el, i) => (
                        <Tab key={el.id} className={styles['pick-button']}>
                            <PickButton
                                category={`${el.accuracy}%`}
                                title={el.name}
                                className={classNames('curtain-reveal-element js-curtain-reveal-element', {
                                    'is-revealed': preloaderReady,
                                })}
                                active={(typeof window !== 'undefined' ? !isNarrowMobile : true) && tabIndex === i}
                                onClick={
                                    (typeof window !== 'undefined' ? isNarrowMobile : false)
                                        ? () => setOpenModalIndex(i)
                                        : undefined
                                }
                            />
                        </Tab>
                    ))}
                </TabList>
            </div>
            <div className={styles.right}>
                {data.map((el, i) => (
                    <TabPanel key={el.id} className={styles.panel}>
                        {shouldRenderConfidenceDashboard && (
                            <AIConfidenceDashboard
                                percent={el.accuracy || 0}
                                className={classNames('curtain-reveal-element js-curtain-reveal-element', {
                                    'is-revealed': preloaderReady,
                                })}
                            />
                        )}
                        <div
                            className={classNames(
                                'curtain-reveal-element js-curtain-reveal-element',
                                styles['concern-info'],
                                {
                                    'is-revealed': preloaderReady,
                                    [styles['concern-info--opened']]: openModalIndex === i,
                                },
                            )}
                        >
                            <div className={styles['concern-info__top-line']}>
                                <IconButton
                                    icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                                    onClick={() => setOpenModalIndex(null)}
                                >
                                    Back
                                </IconButton>
                            </div>
                            <div className={styles['concern-info-content']}>
                                <div className={styles['concern-info-content__label']}>Information on</div>
                                <div className={classNames('subhead', styles['concern-info__title'])}>{el.name}</div>
                                <div className={styles['concern-info__diagram-block']}>
                                    <div className={classNames('subhead', styles['concern-info__diagram-title'])}>
                                        A.I. confidence
                                    </div>
                                    <Diagram percent={el.accuracy} className={styles['concern-info__diagram']} />
                                </div>
                                <div className={styles['concern-info__description']}>{el.description}</div>
                            </div>
                        </div>
                    </TabPanel>
                ))}
            </div>
        </Tabs>
    );
};

export default CosmeticConcerns;
