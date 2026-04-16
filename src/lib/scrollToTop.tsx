import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  children?: ReactNode;
};

export default function ScrollToTop({ children }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    // scroll to top on route change
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname]);

  return <>{children}</>;
}
