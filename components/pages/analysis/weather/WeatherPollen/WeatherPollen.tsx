import styles from './WeatherPollen.module.scss';
import { HTMLAttributes, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import classNames from 'classnames';
import Button from '@/components/shared/Button';
import AnalysisCurtainBlock from '../../AnalysisCurtainBlock';
import WeatherInfo from '../WeatherInfo';

type Props = HTMLAttributes<HTMLElement> & {
    data: {
        type: string;
        primaryText: string;
        secondaryText: string;
    }[];
};

const WeatherPollen = ({ data = [], ...props }: Props) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <AnalysisCurtainBlock {...props} className={classNames(styles.container, props.className)} title="Pollen">
            <Tabs
                selectedIndex={tabIndex}
                onSelect={(tabIndex) => setTabIndex(tabIndex)}
                focusTabOnClick={false}
                className={styles.tabs}
            >
                <TabList className={classNames('list-unstyled', styles.list)}>
                    {data.map((obj, i) => (
                        <Tab key={i} tabIndex="-1">
                            <Button
                                as="span"
                                uppercase={false}
                                size="sm"
                                variant={tabIndex === i ? 'dark' : 'outline-dark'}
                            >
                                {obj.type}
                            </Button>
                        </Tab>
                    ))}
                </TabList>
                <div className={classNames('weather-pollen__content', styles.content)}>
                    {data.map((obj, i) => (
                        <TabPanel key={i}>
                            <WeatherInfo primaryText={obj.primaryText} secondaryText={obj.secondaryText} />
                        </TabPanel>
                    ))}
                </div>
            </Tabs>
        </AnalysisCurtainBlock>
    );
};

export default WeatherPollen;
