import { useState } from "react";
import "./App.css";
import { useGetPostsQuery, useCretePostsMutation } from "./services/jsonPlaceholderApi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MessageSquare, Loader2 } from "lucide-react";

function App() {
  const [newPost, setNewPost] = useState({ title: "", body: "", id: 99999 });
  const { data, error, isLoading, refetch } = useGetPostsQuery();
  const [createPost, { isLoading: isCreating, error: createError }] = useCretePostsMutation();

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

  if (createError || error) return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-red-600">Error Occurred</CardTitle>
          <CardDescription>
            {createError ? "Error creating post" : "Error fetching posts"}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );

  const handleCreatePost = async () => {
    await createPost(newPost);
    setNewPost({ title: "", body: "", id: 99999 });
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 w-screen">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-blue-600">
              Social Posts
            </CardTitle>
            <CardDescription className="text-center">
              Share your thoughts with the community
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Post Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Create New Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  placeholder="Enter post title..."
                  onChange={(e) =>
                    setNewPost((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Content</Label>
                <Input
                  id="body"
                  value={newPost.body}
                  placeholder="Enter post content..."
                  onChange={(e) =>
                    setNewPost((prev) => ({ ...prev, body: e.target.value }))
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleCreatePost}
                disabled={isCreating || !newPost.title || !newPost.body}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Post"
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Posts List Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Recent Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {data?.map((post) => (
                    <Card key={post.id}>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-xs line-clamp-2">
                          {post.body}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;