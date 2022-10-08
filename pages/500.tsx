import { InferGetStaticPropsType } from 'next';
import ErrorLayout from '@/components/layout/ErrorLayout';

const Custom500 = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <ErrorLayout errorNumber={500} errorText="Internal server error" />;
};

export async function getStaticProps() {
    return {
        props: {
            bodyClass: 'error-page',
        },
    };
}

export default Custom500;
