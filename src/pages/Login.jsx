import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Login() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
        <h2>Login / Sign Up</h2>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );
  } else {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Welcome, {session.user.email}</h2>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          Logout
        </button>
      </div>
    );
  }
}
