import styles from './SkinType.module.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import PickButton from '@/components/shared/PickButton';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import SkinColorPicker from '../SkinColorPicker';
import SkinTypePanel from '../SkinTypePanel';
import IconButton from '@/components/shared/IconButton';
import ArrLeftIcon from '@/svg/arr-left.svg';
import NestedPicker from '@/components/shared/NestedPicker';

const SkinType = ({ data, findSelectedOption, findDefaultOption, setActiveKeyOptionById }: any) => {
    const [revealed, setRevealed] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
    const preloaderReady = useRecoilValue(preloaderReadyState);
    const [isNarrowMobile, setIsNarrowMobile] = useState(false);

    useEffect(() => {
        setRevealed(true);
    }, []);

    useEffect(() => {
        const onResize = () => {
            setIsNarrowMobile(matchMedia('(max-width: 767px)').matches);
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
                                category={findSelectedOption(data, key)?.name}
                                title={key}
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
                {data['Fitzpatrick Skin Type'] && (
                    <TabPanel
                        className={classNames(styles['panel-tab'], {
                            [styles['panel-tab--opened']]: openModalIndex === 0,
                        })}
                    >
                        <div className={styles['panel-tab__top-line']}>
                            <IconButton
                                icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                                onClick={() => setOpenModalIndex(null)}
                            >
                                Back
                            </IconButton>
                        </div>

                        <div className={classNames('h4', styles['panel-tab__title'])}>Fitzpatrick Skin Type</div>

                        <SkinTypePanel
                            data={data}
                            objectKey="Fitzpatrick Skin Type"
                            findDefaultOption={findDefaultOption}
                            revealed={revealed}
                        >
                            <SkinColorPicker
                                data={data['Fitzpatrick Skin Type'].options}
                                onPick={(el) => setActiveKeyOptionById('Fitzpatrick Skin Type', el.id)}
                                className={styles['panel-left-picker']}
                            />
                        </SkinTypePanel>
                    </TabPanel>
                )}
                {data['Bauman Skin Type'] && (
                    <TabPanel
                        className={classNames(styles['panel-tab'], {
                            [styles['panel-tab--opened']]: openModalIndex === 1,
                        })}
                    >
                        <div className={styles['panel-tab__top-line']}>
                            <IconButton
                                icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                                onClick={() => setOpenModalIndex(null)}
                            >
                                Back
                            </IconButton>
                        </div>

                        <div className={classNames('h4', styles['panel-tab__title'])}>Bauman Skin Type</div>

                        <SkinTypePanel
                            data={data}
                            objectKey="Bauman Skin Type"
                            findDefaultOption={findDefaultOption}
                            revealed={revealed}
                        >
                            <NestedPicker
                                options={data['Bauman Skin Type'].options.map((option) => ({
                                    id: option.id,
                                    name: option.name,
                                    description: option.description,
                                    selected: option.selected,
                                    options: option.options,
                                }))}
                                onPick={(el) => setActiveKeyOptionById('Bauman Skin Type', el.id)}
                                className={classNames(
                                    styles['panel-left-picker'],
                                    styles['panel-left-skin-type-picker'],
                                )}
                            />
                        </SkinTypePanel>
                    </TabPanel>
                )}
                {data['Goldman Skin Type'] && (
                    <TabPanel
                        className={classNames(styles['panel-tab'], {
                            [styles['panel-tab--opened']]: openModalIndex === 2,
                        })}
                    >
                        <div className={styles['panel-tab__top-line']}>
                            <IconButton
                                icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                                onClick={() => setOpenModalIndex(null)}
                            >
                                Back
                            </IconButton>
                        </div>

                        <div className={classNames('h4', styles['panel-tab__title'])}>Goldman Skin Type</div>

                        <SkinTypePanel
                            data={data}
                            objectKey="Goldman Skin Type"
                            findDefaultOption={findDefaultOption}
                            revealed={revealed}
                        >
                            <SkinColorPicker
                                data={data['Goldman Skin Type'].options}
                                onPick={(el) => setActiveKeyOptionById('Goldman Skin Type', el.id)}
                                className={styles['panel-left-picker']}
                            />
                        </SkinTypePanel>
                    </TabPanel>
                )}
                {data['Lancer Ethnicity Scale'] && (
                    <TabPanel
                        className={classNames(styles['panel-tab'], {
                            [styles['panel-tab--opened']]: openModalIndex === 3,
                        })}
                    >
                        <div className={styles['panel-tab__top-line']}>
                            <IconButton
                                icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                                onClick={() => setOpenModalIndex(null)}
                            >
                                Back
                            </IconButton>
                        </div>

                        <div className={classNames('h4', styles['panel-tab__title'])}>Lancer Ethnicity Scale</div>

                        <SkinTypePanel
                            data={data}
                            objectKey="Lancer Ethnicity Scale"
                            findDefaultOption={findDefaultOption}
                            revealed={revealed}
                        >
                            <NestedPicker
                                middleText="Background"
                                options={data['Lancer Ethnicity Scale'].options.map((option) => ({
                                    id: option.id,
                                    name: option.name,
                                    description: option.description,
                                    selected: option.selected,
                                    options: option.options,
                                }))}
                                onPick={(el) => setActiveKeyOptionById('Lancer Ethnicity Scale', el.id, true)}
                                className={classNames(
                                    styles['panel-left-picker'],
                                    styles['panel-left-skin-type-picker'],
                                )}
                            />
                        </SkinTypePanel>
                    </TabPanel>
                )}
                {data['Van Luschan Chart'] && (
                    <TabPanel
                        className={classNames(styles['panel-tab'], {
                            [styles['panel-tab--opened']]: openModalIndex === 4,
                        })}
                    >
                        <div className={styles['panel-tab__top-line']}>
                            <IconButton
                                icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                                onClick={() => setOpenModalIndex(null)}
                            >
                                Back
                            </IconButton>
                        </div>

                        <div className={classNames('h4', styles['panel-tab__title'])}>Van Luschan Chart</div>

                        <SkinTypePanel
                            data={data}
                            objectKey="Van Luschan Chart"
                            findDefaultOption={findDefaultOption}
                            revealed={revealed}
                        >
                            <SkinColorPicker
                                data={data['Van Luschan Chart'].options}
                                onPick={(el) => setActiveKeyOptionById('Van Luschan Chart', el.id)}
                                className={styles['panel-left-picker']}
                            />
                        </SkinTypePanel>
                    </TabPanel>
                )}
            </div>
        </Tabs>
    );
};

export default SkinType;
