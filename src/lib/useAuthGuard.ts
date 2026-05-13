'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

/**
 * Returns the current Firebase user.
 * While the auth state is being resolved, `loading` is true.
 * Unauthenticated users are automatically redirected to /login.
 */
export function useAuthGuard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Access Control Rule: Allowed emails with dashboard access
        const ALLOWED_EMAILS = [
          'transport@psnacet.edu.in',
          'kcadharshini@gmail.com',
        ];
        if (firebaseUser.email && ALLOWED_EMAILS.includes(firebaseUser.email)) {
          setUser(firebaseUser);
        } else {
          router.replace('/waitlist');
        }
      } else {
        router.replace('/login');
      }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  return { user, loading };
}
