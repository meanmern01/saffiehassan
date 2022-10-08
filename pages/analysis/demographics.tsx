import produce from 'immer';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import AnalysisInnerLayout from '@/components/layout/AnalysisInnerLayout';
import { PageContextProvider } from '@/contexts/page';
import Button from '@/components/shared/Button';
import Demographics from '@/components/pages/analysis/Demographics';
import { mediaQueryDeviceState } from '@/atoms/media-query-device';

const DemographicsPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // ------https://1h12dv07x1.execute-api.us-east-2.amazonaws.com/book_two
    const [data, setData] = useState({
        race: {
            default: 1,
            options: [
                {
                    id: 1,
                    name: 'East asian',
                    accuracy: 96,
                    selected: true,
                },
                {
                    id: 2,
                    name: 'White',
                    accuracy: 6,
                    selected: false,
                },
                {
                    id: 3,
                    name: 'Black',
                    accuracy: 3,
                    selected: false,
                },
                {
                    id: 4,
                    name: 'South Asian',
                    accuracy: 2,
                    selected: false,
                },
                {
                    id: 5,
                    name: 'Latino Hispanic',
                    accuracy: 0,
                    selected: false,
                },
                {
                    id: 6,
                    name: 'South East Asain',
                    accuracy: 0,
                    selected: false,
                },
                {
                    id: 7,
                    name: 'Middle Eastern',
                    accuracy: 0,
                    selected: false,
                },
            ],
        },
        age: {
            default: 3,
            options: [
                {
                    id: 1,
                    name: '0-9',
                    accuracy: 0,
                    selected: false,
                },
                {
                    id: 2,
                    name: '10-19',
                    accuracy: 4,
                    selected: false,
                },
                {
                    id: 3,
                    name: '20-29',
                    accuracy: 96,
                    selected: true,
                },
                {
                    id: 4,
                    name: '30-39',
                    accuracy: 2,
                    selected: false,
                },
                {
                    id: 5,
                    name: '40-49',
                    accuracy: 0,
                    selected: false,
                },
                {
                    id: 6,
                    name: '50-59',
                    accuracy: 0,
                    selected: false,
                },
                {
                    id: 7,
                    name: '60-69',
                    accuracy: 0,
                    selected: false,
                },
                {
                    id: 8,
                    name: '70+',
                    accuracy: 0,
                    selected: false,
                },
            ],
        },
        sex: {
            default: 1,
            options: [
                {
                    id: 1,
                    name: 'Female',
                    accuracy: 99,
                    selected: true,
                },
                {
                    id: 2,
                    name: 'Male',
                    accuracy: 1,
                    selected: false,
                },
            ],
        },
    });

    const mediaQueryDevice = useRecoilValue(mediaQueryDeviceState);

    const findSelectedOption = (source: any, key: string) => source[key].options.find((option) => option.selected);

    const setActiveKeyOptionById = (key: string, id: number) =>
        setData(
            produce(data, (draftState) => {
                const selectedOption = findSelectedOption(draftState, key);
                if (selectedOption) {
                    selectedOption.selected = false;
                }

                const currentOption = draftState[key].options.find((opt) => opt.id === id);
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

                    const currentOption = draftState[key].options.find((opt) => opt.id === draftState[key].default);
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

    return (
        <PageContextProvider value={props}>
            <AnalysisInnerLayout
                title="Demographics"
                description="Predicted Race & Age"
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
                <Demographics
                    data={data}
                    findSelectedOption={findSelectedOption}
                    setActiveKeyOptionById={setActiveKeyOptionById}
                />
            </AnalysisInnerLayout>
        </PageContextProvider>
    );
};

type DemographicsPageServerSideProps = {
    //
};

export const getServerSideProps: GetServerSideProps<DemographicsPageServerSideProps> = async () => {
    return {
        props: {
            bodyClass: 'analysis-inner-page',
        },
    };
};

export default DemographicsPage;
