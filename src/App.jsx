import { useState } from "react";
import "./App.css";
import { useGetPostsQuery, useCretePostsMutation } from "./services/jsonPlaceholderApi";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MessageSquare, Loader2 } from "lucide-react";

function App() {
  const { data, error, isLoading, refetch } = useGetPostsQuery();
  const [createPost, { isLoading: isCreating, error: createError }] = useCretePostsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCreatePost = async (formData) => {
    await createPost({ ...formData, id: Date.now() });
    reset();
    refetch();
  };

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
            <CardContent>
              <form onSubmit={handleSubmit(handleCreatePost)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title..."
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Content</Label>
                  <Input
                    id="body"
                    placeholder="Enter post content..."
                    {...register("body", {
                      required: "Content is required",
                      minLength: {
                        value: 10,
                        message: "Content must be at least 10 characters long",
                      },
                    })}
                  />
                  {errors.body && (
                    <p className="text-sm text-red-600">{errors.body.message}</p>
                  )}
                </div>
                <CardFooter>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isCreating}
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
              </form>
            </CardContent>
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
                  {/* {data?.map((post) => (
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
                  ))} */}
                  {data
                    ?.filter((post) => post.id >= 60 && post.userId == 10)
                    .slice(0, 5)
                    .map((post) => (
                      <Card key={post.id}>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">{post.title}</CardTitle>
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
