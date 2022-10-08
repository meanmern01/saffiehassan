import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import AnalysisInnerLayout from '@/components/layout/AnalysisInnerLayout';
import { PageContextProvider } from '@/contexts/page';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import PinSVG from '@/svg/pin.svg';
import AnalysisCurtainBlock from '@/components/pages/analysis/AnalysisCurtainBlock';
import WeatherInfo from '@/components/pages/analysis/weather/WeatherInfo';
import WeatherPollen from '@/components/pages/analysis/weather/WeatherPollen';

const WeatherPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    useOutroAnimation();

    return (
        <PageContextProvider value={props}>
            <AnalysisInnerLayout title="Weather" description="Weather conditions in your location">
                <div className="text-transition-container analysis-inner-clip-wrapper js-analysis-inner-clip-wrapper">
                    <div className="weather-location js-analysis-inner-clip">
                        <PinSVG className="weather-location__icon" />
                        <div className="weather-location__name">Sydney, NSW, Australia</div>
                    </div>
                </div>

                <div className="weather-blocks-row">
                    <AnalysisCurtainBlock
                        title="Air Quality Index"
                        bottomSlot={
                            <WeatherInfo
                                primaryText="1.0"
                                secondaryText="Air quality is satisfactory and poses little or no risk"
                            />
                        }
                        className="weather-blocks-row__item--air-quality"
                    />

                    <WeatherPollen
                        data={[
                            {
                                type: 'Weed Pollen',
                                primaryText: '20',
                                secondaryText:
                                    'The term weed is referring to plants used as culinary herbs and medicinal plants as well as ecologically adaptive and invasive segetal plants.',
                            },
                            {
                                type: 'Tree Pollen',
                                primaryText: '30',
                                secondaryText: '2 The term weed is referring to plants used as culinary herbs.',
                            },
                            {
                                type: 'Grass Pollen',
                                primaryText: '10',
                                secondaryText:
                                    '3 The term weed is referring to plants used as culinary herbs and medicinal plants as well as ecologically adaptive and invasive segetal plants.',
                            },
                        ]}
                        className="weather-blocks-row__item--pollen"
                    />

                    <AnalysisCurtainBlock title="Pollution" className="weather-blocks-row__item--pollution">
                        <div className="weather-table-wrapper">
                            <table className="text-caption weather-table">
                                <tbody>
                                    <tr>
                                        <td>NH3</td>
                                        <td>1.5</td>
                                        <td>Good</td>
                                    </tr>
                                    <tr>
                                        <td>NO</td>
                                        <td>1.62</td>
                                        <td>Good</td>
                                    </tr>
                                    <tr>
                                        <td>NO2</td>
                                        <td>1.5</td>
                                        <td>Good</td>
                                    </tr>
                                    <tr>
                                        <td>O3</td>
                                        <td>1.62</td>
                                        <td>Very Poor</td>
                                    </tr>
                                    <tr>
                                        <td>SO2</td>
                                        <td>1.62</td>
                                        <td>Very Poor</td>
                                    </tr>
                                    <tr>
                                        <td>PM10</td>
                                        <td>1.5</td>
                                        <td>Good</td>
                                    </tr>
                                    <tr>
                                        <td>PM2.5</td>
                                        <td>1.62</td>
                                        <td>Moderate</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </AnalysisCurtainBlock>

                    <AnalysisCurtainBlock
                        title="Season"
                        bottomSlot={<WeatherInfo primaryText="Summer" />}
                        className="weather-blocks-row__item--season"
                    />

                    <AnalysisCurtainBlock
                        title="UV Index"
                        bottomSlot={<WeatherInfo primaryText="2.42" secondaryText="Moderate" />}
                        className="weather-blocks-row__item--uv-index"
                    />

                    <AnalysisCurtainBlock
                        title="Safe Exposure Time"
                        bottomSlot={<WeatherInfo primaryText="283" secondaryText="Minutes" />}
                        className="weather-blocks-row__item--safe-exposure-time"
                    />
                    <AnalysisCurtainBlock
                        title="Climate zone"
                        bottomSlot={<WeatherInfo primaryText="Polar" />}
                        className="weather-blocks-row__item--climate-zone"
                    />
                </div>
            </AnalysisInnerLayout>
        </PageContextProvider>
    );
};

type WeatherPageServerSideProps = {
    //
};

export const getServerSideProps: GetServerSideProps<WeatherPageServerSideProps> = async () => {
    return {
        props: {
            bodyClass: 'analysis-inner-page',
        },
    };
};

export default WeatherPage;
