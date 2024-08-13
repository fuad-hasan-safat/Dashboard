import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useRouteChange = (callback) => {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            callback(url);
        };

        router.events.on('routeChangeStart', handleRouteChange);

        // Clean up the event listener on unmount
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router, callback]);
};

export default useRouteChange;
