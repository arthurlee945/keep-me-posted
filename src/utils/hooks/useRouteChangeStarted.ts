import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useRouteChangeStarted() {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [routeChangeStarted, setRouteChangeStarted] = useState(false);
    if (routeChangeStarted) setRouteChangeStarted(false);
    useEffect(() => {
        setRouteChangeStarted(true);
    }, [pathName, searchParams]);
    return routeChangeStarted;
}
