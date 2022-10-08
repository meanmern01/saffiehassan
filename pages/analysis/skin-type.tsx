import produce from 'immer';
import { useState } from 'react';
import gsap from 'gsap';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import AnalysisInnerLayout from '@/components/layout/AnalysisInnerLayout';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { PageContextProvider } from '@/contexts/page';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import Button from '@/components/shared/Button';
import SkinType from '@/components/pages/analysis/skin-type/SkinType';
import { mediaQueryDeviceState } from '@/atoms/media-query-device';

const SkinTypePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [data, setData] = useState({
        'Fitzpatrick Skin Type': {
            default: 1,
            options: [
                {
                    id: 1,
                    name: '1 type',
                    description: 'Darker white skin. Tans after initial burn',
                    color: '#D29F7C',
                    accuracy: 96,
                    selected: true,
                },
                {
                    id: 2,
                    name: '2 type',
                    description: 'Darker white skin. Tans after initial burn',
                    color: '#F6CFB1',
                    accuracy: 6,
                    selected: false,
                },
                {
                    id: 3,
                    name: '3 type',
                    description: 'Darker white skin. Tans after initial burn',
                    color: '#E8B590',
                    accuracy: 3,
                    selected: false,
                },
                {
                    id: 4,
                    name: '4 type',
                    description: 'Darker white skin. Tans after initial burn',
                    color: '#BB7952',
                    accuracy: 2,
                    selected: false,
                },
                {
                    id: 5,
                    name: '5 type',
                    description: 'Darker white skin. Tans after initial burn',
                    color: '#A55E2B',
                    accuracy: 0,
                    selected: false,
                },
                {
                    id: 6,
                    name: '6 type',
                    description: 'Darker white skin. Tans after initial burn',
                    color: '#3B1E1A',
                    accuracy: 0,
                    selected: false,
                },
            ],
        },
        'Bauman Skin Type': {
            default: 32,
            options: [
                {
                    id: 1,
                    name: 'ds',
                    accuracy: 1,
                    selected: false,
                },
                {
                    id: 2,
                    name: 'os',
                    accuracy: 5,
                    selected: false,
                },
                {
                    id: 3,
                    name: 'dr',
                    options: [
                        {
                            id: 31,
                            name: 'drpt',
                            description: 'Dry, resistant, non-pigment and wrinkle-prone',
                            accuracy: 5,
                            selected: false,
                        },
                        {
                            id: 32,
                            name: 'drnt',
                            description: 'Dry, resistant, non-pigment and wrinkle-prone',
                            accuracy: 5,
                            selected: true,
                        },
                        {
                            id: 33,
                            name: 'drpw',
                            description: 'Dry, resistant, non-pigment and wrinkle-prone',
                            accuracy: 3,
                            selected: false,
                        },
                        {
                            id: 34,
                            name: 'drnw',
                            description: 'Dry, resistant, non-pigment and wrinkle-prone',
                            accuracy: 2,
                            selected: false,
                        },
                    ],
                },
                {
                    id: 4,
                    name: 'or',
                    accuracy: 2,
                    selected: false,
                },
            ],
        },
        'Goldman Skin Type': {
            default: 1,
            options: [
                {
                    id: 1,
                    name: '1 type',
                    description: 'Very light or white skin, "Celtic" type',
                    color: '#D29F7C',
                    accuracy: 96,
                    selected: true,
                },
                {
                    id: 2,
                    name: '2 type',
                    description: 'Light or light-skinned European',
                    color: '#F6CFB1',
                    accuracy: 6,
                    selected: false,
                },
                {
                    id: 3,
                    name: '3 type',
                    description: 'Light intermediate, or dark-skinned European',
                    color: '#E8B590',
                    accuracy: 3,
                    selected: false,
                },
                {
                    id: 4,
                    name: '4 type',
                    description: 'Dark intermediate or "olive skin"',
                    color: '#A55E2B',
                    accuracy: 0,
                    selected: false,
                },
                {
                    id: 5,
                    name: '5 type',
                    description: 'Dark or "brown" type',
                    color: '#BB7952',
                    accuracy: 2,
                    selected: false,
                },
                {
                    id: 6,
                    name: '6 type',
                    description: 'Very dark or "black" type',
                    color: '#3B1E1A',
                    accuracy: 0,
                    selected: false,
                },
            ],
        },
        'Lancer Ethnicity Scale': {
            default: 43,
            options: [
                {
                    id: 1,
                    name: 'Asian',
                    options: [
                        {
                            id: 41,
                            name: 'Eritrean',
                            accuracy: 0,
                            selected: false,
                        },
                        {
                            id: 42,
                            name: 'Central',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 43,
                            name: 'Middle East Arabic',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 44,
                            name: 'east',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 45,
                            name: 'North',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 46,
                            name: 'Ethiopian',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 47,
                            name: 'west',
                            accuracy: 0,
                            selected: false,
                        },
                        {
                            id: 48,
                            name: 'Sephardic Jews',
                            accuracy: 0,
                            selected: false,
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'American',
                    options: [
                        {
                            id: 41,
                            name: 'Eritrean',
                            accuracy: 0,
                            selected: false,
                        },
                        {
                            id: 42,
                            name: 'Central',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 43,
                            name: 'Middle East Arabic',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 44,
                            name: 'east',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 45,
                            name: 'North',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 46,
                            name: 'Ethiopian',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 47,
                            name: 'west',
                            accuracy: 0,
                            selected: false,
                        },
                        {
                            id: 48,
                            name: 'Sephardic Jews',
                            accuracy: 0,
                            selected: false,
                        },
                    ],
                },
                {
                    id: 3,
                    name: 'European',
                    options: [
                        {
                            id: 41,
                            name: 'Eritrean',
                            accuracy: 0,
                            selected: false,
                        },
                        {
                            id: 42,
                            name: 'Central',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 43,
                            name: 'Middle East Arabic',
                            accuracy: 2,
                            selected: false,
                        },
                        {
                            id: 44,
                            name: 'east',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 45,
                            name: 'North',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 46,
                            name: 'Ethiopian',
                            accuracy: 1,
                            selected: false,
                        },
                    ],
                },
                {
                    id: 4,
                    name: 'african',
                    options: [
                        {
                            id: 41,
                            name: 'Eritrean',
                            accuracy: 0,
                            selected: false,
                        },
                        {
                            id: 42,
                            name: 'Central',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 43,
                            name: 'Middle East Arabic',
                            accuracy: 92,
                            selected: true,
                        },
                        {
                            id: 44,
                            name: 'east',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 45,
                            name: 'North',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 46,
                            name: 'Ethiopian',
                            accuracy: 1,
                            selected: false,
                        },
                        {
                            id: 47,
                            name: 'west',
                            accuracy: 0,
                            selected: false,
                        },
                        {
                            id: 48,
                            name: 'Sephardic Jews',
                            accuracy: 0,
                            selected: false,
                        },
                    ],
                },
            ],
        },
        // 'Van Luschan Chart': {
        //     default: 1,
        //     options: [
        //         {
        //             id: 1,
        //             name: '0–6 shade',
        //             description: 'Very light or white skin, "Celtic" type',
        //             color: '#D29F7C',
        //             accuracy: 96,
        //             selected: true,
        //         },
        //         {
        //             id: 2,
        //             name: '7–13 shade',
        //             description: 'Light or light-skinned European',
        //             color: '#F6CFB1',
        //             accuracy: 6,
        //             selected: false,
        //         },
        //         {
        //             id: 3,
        //             name: '14–20 shade',
        //             description: 'Light intermediate, or dark-skinned European',
        //             color: '#E8B590',
        //             accuracy: 3,
        //             selected: false,
        //         },
        //         {
        //             id: 4,
        //             name: '21-27 shade',
        //             description: 'Dark intermediate or "olive skin"',
        //             color: '#A55E2B',
        //             accuracy: 0,
        //             selected: false,
        //         },
        //         {
        //             id: 5,
        //             name: '28-34 shade',
        //             description: 'Dark or "brown" type',
        //             color: '#BB7952',
        //             accuracy: 2,
        //             selected: false,
        //         },
        //         {
        //             id: 6,
        //             name: '35–36 shade',
        //             description: 'Very dark or "black" type',
        //             color: '#3B1E1A',
        //             accuracy: 0,
        //             selected: false,
        //         },
        //     ],
        // },
    });

    const preloaderReady = useRecoilValue(preloaderReadyState);
    const mediaQueryDevice = useRecoilValue(mediaQueryDeviceState);

    const findSelectedOption = (source: any, key: string) => {
        const findOpt = (obj: Record<string, any>) => {
            if (obj.options?.length > 0) {
                for (let i = 0; i < obj.options.length; i++) {
                    const _option = findOpt(obj.options[i]);
                    if (_option) {
                        return _option;
                    }
                }
            } else if (obj.selected) {
                return obj;
            }
        };

        return findOpt(source[key]);
    };

    const findCurrentOption = (source: any, key: string, id: number) => {
        const findCurrentOpt = (obj: Record<string, any>) => {
            if (obj.options?.length > 0) {
                for (let i = 0; i < obj.options.length; i++) {
                    const _option = findCurrentOpt(obj.options[i]);
                    if (_option) {
                        return _option;
                    }
                }
            } else if (obj.id === id) {
                return obj;
            }
        };

        return findCurrentOpt(source[key]);
    };

    const findDefaultOption = (source: any, key: string) => {
        const defaultId = source[key].default;
        const findDefaultOpt = (obj: Record<string, any>) => {
            if (obj.options?.length > 0) {
                for (let i = 0; i < obj.options.length; i++) {
                    const _option = findDefaultOpt(obj.options[i]);
                    if (_option) {
                        return _option;
                    }
                }
            } else if (obj.id === defaultId) {
                return obj;
            }
        };

        return findDefaultOpt(source[key]);
    };

    const setActiveKeyOptionById = (key: string, id: number) =>
        setData(
            produce(data, (draftState) => {
                const selectedOption = findSelectedOption(draftState, key);
                if (selectedOption) {
                    selectedOption.selected = false;
                }

                const currentOption = findCurrentOption(draftState, key, id);
                if (currentOption) {
                    currentOption.selected = true;
                }
            }),
        );

    const reset = () => {
        setData(
            produce(data, (draftState) => {
                Object.keys(data).forEach((key) => {
                    const selectedOption = findSelectedOption(draftState, key);
                    if (selectedOption) {
                        selectedOption.selected = false;
                    }

                    const currentOption = findDefaultOption(draftState, key);
                    if (currentOption) {
                        currentOption.selected = true;
                    }
                });
            }),
        );
    };

    const confirm = () => {
        console.log('confirm');
    };

    // Intro animation
    useIsomorphicLayoutEffect(() => {
        const skinColorPickerButtons = Array.from(document.querySelectorAll('.js-skin-color-picker__button'));
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 1, ease: 'power3.out' },
            onComplete: () => {
                tl.kill();
            },
        });

        gsap.set(skinColorPickerButtons, { opacity: 0 });
        tl.fromTo('.js-skin-color-picker__chosen', { duration: 0.6, opacity: 0 }, { opacity: 1 }, 0.3)
            .fromTo(
                skinColorPickerButtons[0],
                { xPercent: 130, yPercent: -130 },
                {
                    xPercent: 0,
                    yPercent: 0,
                    onStart: () => {
                        gsap.set(skinColorPickerButtons, { clearProps: 'opacity' });
                    },
                },
                1.2,
            )
            .fromTo(skinColorPickerButtons[1], { xPercent: 130 }, { xPercent: 0 }, 1.2)
            .fromTo(skinColorPickerButtons[2], { yPercent: -130 }, { yPercent: 0 }, 1.2)
            .fromTo(skinColorPickerButtons[3], { yPercent: 130 }, { yPercent: 0 }, 1.2)
            .fromTo(skinColorPickerButtons[4], { xPercent: -130, yPercent: 130 }, { xPercent: 0, yPercent: 0 }, 1.2)
            .fromTo(skinColorPickerButtons[5], { xPercent: -130 }, { xPercent: 0 }, 1.2);

        if (preloaderReady) {
            tl.play();
        }
    }, [preloaderReady]);

    useOutroAnimation();

    return (
        <PageContextProvider value={props}>
            <AnalysisInnerLayout
                className="skin-type-page"
                title="Skin type"
                description="Skin-related characteristics"
                bottomNavMiddleSlot={
                    <div className="analysis-bottom-nav-text">If A.I. estimate is wrong, select the correct one.</div>
                }
                bottomNavRightSlot={
                    <>
                        <Button
                            variant={mediaQueryDevice.includes('mobile') ? 'dark' : 'outline-dark'}
                            className="analysis-action-btn analysis-action-btn--reset"
                            onClick={reset}
                        >
                            Reset
                        </Button>
                        <Button variant="dark" className="analysis-action-btn" onClick={confirm}>
                            Confirm
                        </Button>
                    </>
                }
            >
                <SkinType
                    data={data}
                    findSelectedOption={findSelectedOption}
                    findDefaultOption={findDefaultOption}
                    setActiveKeyOptionById={setActiveKeyOptionById}
                />
            </AnalysisInnerLayout>
        </PageContextProvider>
    );
};

type SkinTypePageServerSideProps = {
    //
};

export const getServerSideProps: GetServerSideProps<SkinTypePageServerSideProps> = async () => {
    return {
        props: {
            bodyClass: 'analysis-inner-page',
        },
    };
};

export default SkinTypePage;
