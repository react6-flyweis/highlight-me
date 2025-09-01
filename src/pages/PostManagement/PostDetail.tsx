import { useParams } from "react-router";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function PostDetail() {
  const { id } = useParams();

  // Mock data for now — you can replace this with a fetch later
  const post = {
    id: id ?? "1",
    title: "The Subtle Art of Time Management in a Digital World",
    hero: "https://picsum.photos/seed/post-detail/1200/420",
    intro:
      "In an age brimming with digital distractions and endless notifications, mastering time management has become less about rigid schedules and more about conscious choice.",
    body: "The traditional paradigms of productivity, often rooted in industrial-era efficiency, struggle to keep pace with the dynamic, interconnected nature of today's work environment. This article delves into contemporary strategies that transcend mere task completion, focusing instead on cultivating sustained focus and meaningful output.",
    author: {
      name: "Aisha Rahman",
      handle: "@Sarac_l",
      avatar: "/assets/icons/upload-cloud.png",
    },
  };

  return (
    <PageLayout title={post.title || "Post"}>
      <div className="overflow-hidden">
        <img
          src={post.hero}
          alt={post.title}
          className="w-full h-64 object-cover rounded"
        />
        <div className="mt-6">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
            <p className="text-sm text-slate-600">{post.intro}</p>
          </div>

          <div className="prose max-w-none mb-6 text-slate-800">
            <h3>Introduction: The Modern Productivity Paradox</h3>
            <p>{post.body}</p>
            <p>
              In an age brimming with digital distractions and endless
              notifications, mastering time management has become less about
              rigid schedules and more about conscious choice. The traditional
              paradigms of productivity, often rooted in industrial-era
              efficiency, struggle to keep pace with the dynamic, interconnected
              nature of today's work environment.
            </p>
          </div>
          {/* Separator between article content and author */}
          <div className="border-t mt-6 mb-6" />

          <div className="mt-2">
            <div className="border rounded p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">
                      {post.author.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {post.author.handle}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </div>

              <div className="mt-3 text-sm text-slate-600">
                Aisha is a productivity consultant and digital strategist with
                over a decade of experience helping professionals optimize their
                workflows and achieve work-life harmony.
              </div>
            </div>
          </div>

          {/* Engagement section  */}
          <div className="border rounded p-4 mt-5 bg-white">
            <h4 className="mb-4 text-sm font-medium">Engagement</h4>
            <div className="grid grid-cols-3 gap-6 items-center text-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto text-rose-500 mb-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21s-7.534-4.873-10-8.06C-1.118 7.68 3.31 3 8.001 6.06 9.78 7.22 12 9.02 12 9.02s2.22-1.8 3.999-2.96C20.69 3 25.118 7.68 22 12.94 19.534 16.127 12 21 12 21z" />
                </svg>
                <div className="text-lg font-semibold">8,512</div>
                <div className="text-xs text-slate-500">Likes</div>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto text-sky-600 mb-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="text-lg font-semibold">125,333</div>
                <div className="text-xs text-slate-500">Impressions</div>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto text-emerald-600 mb-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 6l-4-4-4 4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v13"
                  />
                </svg>
                <div className="text-lg font-semibold">8,555</div>
                <div className="text-xs text-slate-500">Shares</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h4 className="mb-4 text-lg font-medium">Comments (3)</h4>
        <div className="space-y-4">
          <div className="border rounded p-4 bg-white">
            <div>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">Aisha Rahman</div>
                  <div className="text-xs text-slate-500">
                    {post.author.handle}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-sm text-slate-700">
                This article resonated so much with me! The 'Myth of
                Multitasking' really hit home.
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
