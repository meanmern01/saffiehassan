import { useState } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import AnalysisInnerLayout from '@/components/layout/AnalysisInnerLayout';
import { PageContextProvider } from '@/contexts/page';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import CosmeticConcerns from '@/components/pages/analysis/CosmeticConcerns';

const CosmeticConcernsPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // --------------------api
    // ===========https://a8mm2nz5ea.execute-api.us-east-2.amazonaws.com/book_four
    const [data, setData] = useState([
        {
            id: 1,
            name: "Crow's Feet Wrinkle",
            description:
                'Orbital wrinkles are closely seen near the outer corners of the eye and are most visible during smiling. Hydrating ingredients are most effective for improving wrinkle depth.',
            accuracy: 98,
        },
        {
            id: 2,
            name: 'Eye Bags',
            description:
                'Orbital wrinkles are closely seen near the outer corners of the eye and are most visible during smiling. Hydrating ingredients are most effective for improving wrinkle depth.',
            accuracy: 46,
        },
        {
            id: 3,
            name: 'Frown Lines',
            description:
                'Orbital wrinkles are closely seen near the outer corners of the eye and are most visible during smiling. Hydrating ingredients are most effective for improving wrinkle depth.',
            accuracy: 32,
        },
        {
            id: 4,
            name: 'Tear Through Depression',
            description:
                'Orbital wrinkles are closely seen near the outer corners of the eye and are most visible during smiling. Hydrating ingredients are most effective for improving wrinkle depth.',
            accuracy: 21,
        },
        {
            id: 5,
            name: 'Forehead Lines',
            description:
                'Orbital wrinkles are closely seen near the outer corners of the eye and are most visible during smiling. Hydrating ingredients are most effective for improving wrinkle depth.',
            accuracy: 2,
        },
        {
            id: 6,
            name: 'Undereye Dark Circles',
            description:
                'Orbital wrinkles are closely seen near the outer corners of the eye and are most visible during smiling. Hydrating ingredients are most effective for improving wrinkle depth.',
            accuracy: 1,
        },
        {
            id: 7,
            name: 'Smile Lines',
            description:
                'Orbital wrinkles are closely seen near the outer corners of the eye and are most visible during smiling. Hydrating ingredients are most effective for improving wrinkle depth.',
            accuracy: 0,
        },
        {
            id: 8,
            name: 'Undereye Fat Pad',
            description:
                'Orbital wrinkles are closely seen near the outer corners of the eye and are most visible during smiling. Hydrating ingredients are most effective for improving wrinkle depth.',
            accuracy: 0,
        },
    ]);

    useOutroAnimation();

    return (
        <PageContextProvider value={props}>
            <AnalysisInnerLayout title="Cosmetic concerns" description="Skin health & Ageing">
                <CosmeticConcerns data={data} />
            </AnalysisInnerLayout>
        </PageContextProvider>
    );
};

type CosmeticConcernsPageServerSideProps = {
    //
};

export const getServerSideProps: GetServerSideProps<CosmeticConcernsPageServerSideProps> = async () => {
    return {
        props: {
            bodyClass: 'analysis-inner-page',
        },
    };
};

export default CosmeticConcernsPage;
