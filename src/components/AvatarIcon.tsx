'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { CircleUser } from 'lucide-react'

export async function AvatarIcon() {
    const supabase = createClient()
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div>
            {!avatarUrl ? ( 
                <CircleUser className="h-5 w-5" />
            ) : (
            <img src={user!.user_metadata.avatar_url} alt="Avatar" className="size-5" />
            )}
        </div>
    )
}
