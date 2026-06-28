"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"
import { Loader2, Plus, Heart, Settings, FolderOpen } from "lucide-react"
import type { User } from "@supabase/supabase-js"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [displayName, setDisplayName] = useState("")
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login")
        return
      }
      setUser(user)
      setDisplayName(user.user_metadata?.full_name || user.email?.split("@")[0] || "")
      setLoading(false)
    })
  }, [router])

  async function handleSaveProfile() {
    if (!user) return
    setSaving(true)
    setSaveMsg("")

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      data: { full_name: displayName },
    })

    if (error) {
      setSaveMsg("Error: " + error.message)
    } else {
      setSaveMsg("Profile updated successfully!")
    }
    setSaving(false)
    setTimeout(() => setSaveMsg(""), 3000)
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Navbar />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {displayName}!</h1>
          <p className="text-muted-foreground mt-1">{user?.email}</p>
        </div>
        
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="projects" className="gap-2">
              <FolderOpen className="h-4 w-4" />
              My Projects
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Acme Corp Redesign</CardTitle>
                  <CardDescription>Based on &quot;Acme Corp Corporate&quot;</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 text-sm text-muted-foreground mb-4 items-center">
                    <span className="w-4 h-4 rounded-full bg-indigo-500 shrink-0"></span>
                    Indigo Theme &bull; Inter Font
                  </div>
                  <Button variant="outline" className="w-full">Edit Project</Button>
                </CardContent>
              </Card>
              
              <Card className="flex flex-col items-center justify-center border-dashed text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer min-h-[200px] group">
                <Plus className="h-10 w-10 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Create New Project</span>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="text-center py-20 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg font-medium">No favorite templates yet</p>
              <p className="text-sm mt-1">Browse templates and click the heart icon to save them here.</p>
              <Button variant="link" className="mt-4" onClick={() => router.push("/explore")}>
                Explore Templates &rarr;
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account details and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <Input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your display name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" value={user?.email || ""} disabled className="opacity-60" />
                  <p className="text-xs text-muted-foreground">Email cannot be changed here.</p>
                </div>

                {saveMsg && (
                  <p className={`text-sm ${saveMsg.startsWith("Error") ? "text-destructive" : "text-green-600 dark:text-green-400"}`}>
                    {saveMsg}
                  </p>
                )}

                <Button onClick={handleSaveProfile} disabled={saving}>
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}