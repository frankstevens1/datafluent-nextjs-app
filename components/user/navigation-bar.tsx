"use client";

import { useEffect, useState } from 'react';
import { signOutAction } from '@/lib/auth-actions';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  // Listen for auth state changes and get the current user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    // Fetch the current user on component mount
    getUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // event, session can be used here
      setUser(session?.user || null);
    });

    // Cleanup the listener on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <nav className="w-full flex items-center justify-between p-4">
      {/* Avatar and User Info */}
      {user ? (
        <div className="flex items-center gap-4">
          <Image
            src={user.user_metadata?.avatar_url || `https://api.dicebear.com/9.x/identicon/svg?seed=${user?.email}`}
            alt="User Avatar"
            width={40}
            height={40}
            className="border shadow-md rounded-full"
            unoptimized
          />
          <div className='flex flex-col'>
            <span className="text-secondary-foreground font-semibold text-sm">
              {user.user_metadata?.full_name || null}
            </span>
            <span className="text-muted-foreground text-xs">
              {user.email || null}
            </span>
          </div>
        </div>
      ) : (
        <span>Not signed in</span>
      )}

      {/* Sign Out Button */}
      {user && (
        <button
          onClick={signOutAction}
          className='flex flex-row items-center justify-center gap-2 text-xs text-gray-500 hover:text-blue-500'
        >
          <LogOut size={16} />
          Sign out
        </button>
      )}
    </nav>
  );
}
