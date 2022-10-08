import { useEffect, useState } from 'react';
import AppMessage from '@/components/shared/AppMessage';
import Button from '@/components/shared/Button';
import { useRouter } from 'next/router';

const AnalysisMessage = () => {
    const [visible, setVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(
            () => {
                setVisible(true);
            },
            process.env.NODE_ENV === 'development' ? 100 : 2000,
        );

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const onRouteChangeStart = () => {
            setVisible(false);
        };

        router.events.on('routeChangeStart', onRouteChangeStart);

        return () => {
            router.events.off('routeChangeStart', onRouteChangeStart);
        };
    }, [router.events]);

    return (
        <AppMessage
            visible={visible}
            actionsSlot={
                <Button variant="dark" onClick={() => setVisible(false)}>
                    OK
                </Button>
            }
        >
            <p>You haven&apos;t met following requirements. Test results might be inaccurate.</p>
            <ul className="list-unstyled text-caption analysis-message-list">
                <li className="analysis-message-list__item analysis-message-list__item--checked">Neutral Expression</li>
                <li className="analysis-message-list__item analysis-message-list__item--checked">Frontal Pose</li>
                <li className="analysis-message-list__item">Adequate Lighting</li>
            </ul>
        </AppMessage>
    );
};

export default AnalysisMessage;
