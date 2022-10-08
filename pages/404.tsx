import { InferGetStaticPropsType } from 'next';
import ErrorLayout from '@/components/layout/ErrorLayout';

const Custom404 = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <ErrorLayout errorNumber={404} errorText="This page does not exist" />;
};

export async function getStaticProps() {
    return {
        props: {
            bodyClass: 'error-page',
        },
    };
}

export default Custom404;
