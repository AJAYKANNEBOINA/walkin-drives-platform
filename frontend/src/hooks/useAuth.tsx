import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

const BACKEND_URL = (typeof import.meta !== 'undefined' && import.meta.env?.REACT_APP_BACKEND_URL) || '';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  adminChecked: boolean;
  accessToken: string | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  adminChecked: false,
  accessToken: null,
  signOut: async () => {},
});

async function checkAdminViaBackend(token: string): Promise<boolean> {
  try {
    const resp = await fetch(`${BACKEND_URL}/api/check-admin`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (resp.ok) {
      const data = await resp.json();
      return data.is_admin === true;
    }
    return false;
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);

  useEffect(() => {
    let mounted = true;

    const handleSession = async (sess: Session | null) => {
      if (!mounted) return;
      const currentUser = sess?.user ?? null;
      setUser(currentUser);
      setSession(sess);
      setLoading(false);

      if (currentUser && sess?.access_token) {
        const admin = await checkAdminViaBackend(sess.access_token);
        if (mounted) {
          setIsAdmin(admin);
          setAdminChecked(true);
        }
      } else {
        setIsAdmin(false);
        setAdminChecked(true);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      handleSession(sess);
    });

    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      handleSession(sess);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setAdminChecked(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isAdmin,
      adminChecked,
      accessToken: session?.access_token ?? null,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
