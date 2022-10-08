import styles from './CookiesAgreement.module.scss';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRecoilValue } from 'recoil';
import Button from '@/components/shared/Button';
import AppMessage from '@/components/shared/AppMessage';
import { preloaderReadyState } from '@/atoms/preloader-ready';

const cookieName = 'COOKIES_USAGE_ACCEPTED';

const CookiesAgreement = () => {
    const [visible, setVisible] = useState(false);
    const preloaderReady = useRecoilValue(preloaderReadyState);
    const [cookiesAccepted, setCookiesAccepted] = useState(false);

    const acceptCookies = () => {
        Cookies.set(cookieName, 'true', {
            expires: 365, // days
        });
        setVisible(false);
    };

    useEffect(() => {
        if (preloaderReady) {
            if (Cookies.get(cookieName) === 'true') {
                setCookiesAccepted(true);
            } else {
                setTimeout(() => {
                    setVisible(true);
                }, 3000);
            }
        }
    }, [preloaderReady]);

    return !cookiesAccepted ? (
        <AppMessage
            fixed
            visible={visible}
            actionsSlot={
                <Button variant="dark" onClick={acceptCookies}>
                    OK
                </Button>
            }
        >
            We use cookie to provide the best experience
        </AppMessage>
    ) : null;
};

export default CookiesAgreement;
