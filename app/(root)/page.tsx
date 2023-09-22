import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchFriendPosts } from "@/lib/actions/thread.actions";
import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import ThreadsTab from "@/components/shared/ThreadsTab";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const followedUsers = userInfo?.friends || [];
  const friendPostsResult = await fetchFriendPosts(
    followedUsers,
    searchParams.page ? +searchParams.page : 1,
    30
  );

  const userPostsResult = await fetchUserPosts(user.id);
  const userPosts = userPostsResult.threads || [];

  // Combine and sort posts from both sources
  const allPosts = [...friendPostsResult.posts, ...userPosts];
  const sortedAllPosts = allPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {sortedAllPosts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          sortedAllPosts.map((post) => (
            <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={user.id}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
            />
          ))
        )}
        
      </section>
      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={friendPostsResult.isNext}
      />
    </>
  );
}

export default Home;
