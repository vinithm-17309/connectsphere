'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UserPlus, Users, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'

interface SuggestionsProps {
  showAll?: boolean
}

export function Suggestions({ showAll = false }: SuggestionsProps) {
  const { user } = useAuth()

  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [followingIds, setFollowingIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // 🔹 Load following ONLY once when user loads
  useEffect(() => {
    if (user) {
      fetchFollowing()
    }
  }, [user])

  // 🔹 Fetch users whenever search changes
  useEffect(() => {
    if (user) {
      fetchUsers()
    }
  }, [searchQuery, user])

  const fetchUsers = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id)

      if (searchQuery.trim() !== '') {
        query = query.ilike('username', `%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) {
        console.error('Fetch users error:', error)
        setUsers([])
      } else {
        setUsers(data || [])
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setUsers([])
    }

    setLoading(false)
  }

  const fetchFollowing = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id)

      if (!error && data) {
        setFollowingIds(data.map((f) => f.following_id))
      }
    } catch (err) {
      console.error('Fetch following error:', err)
    }
  }

  const handleFollow = async (targetUserId: string) => {
    if (!user) return
    if (followingIds.includes(targetUserId)) return

    try {
      const { error } = await supabase.from('follows').insert({
        follower_id: user.id,
        following_id: targetUserId,
      })

      if (!error) {
        setFollowingIds((prev) => [...prev, targetUserId])
      }
    } catch (err) {
      console.error('Follow error:', err)
    }
  }

  const displayUsers = showAll ? users : users.slice(0, 4)

  return (
    <div className="w-full space-y-4">
      {/* Search */}
      <div className="sticky top-0 z-10 pb-4">
        <Input
          type="text"
          placeholder="Search professionals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {!showAll && (
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Connect & Collaborate
          </h3>
        </div>
      )}

      <div
        className={
          showAll
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'space-y-3'
        }
      >
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : displayUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No users found</p>
          </div>
        ) : (
          displayUsers.map((userItem) => {
            const isFollowing = followingIds.includes(userItem.id)

            return (
              <Card
                key={userItem.id}
                className={`p-4 border border-border hover:border-primary/50 hover:shadow-lg transition-all ${
                  showAll
                    ? 'flex flex-col items-center text-center'
                    : 'flex items-center justify-between'
                }`}
              >
                <div
                  className={
                    showAll
                      ? 'w-full'
                      : 'flex items-center gap-3 flex-1 min-w-0'
                  }
                >
                  <img
                    src="/placeholder.svg"
                    alt={userItem.username}
                    className={`rounded-full object-cover ${
                      showAll ? 'w-16 h-16 mb-3' : 'w-10 h-10'
                    }`}
                  />
                  <div className={showAll ? 'w-full' : 'min-w-0 flex-1'}>
                    <p className="font-semibold text-foreground truncate text-sm">
                      {userItem.username}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      @{userItem.username}
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={() => handleFollow(userItem.id)}
                  disabled={isFollowing}
                  className={`ml-2 h-8 text-xs mt-3 ${
                    isFollowing
                      ? 'bg-green-500 hover:bg-green-500 text-white'
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3 h-3 mr-1" />
                      Follow
                    </>
                  )}
                </Button>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}