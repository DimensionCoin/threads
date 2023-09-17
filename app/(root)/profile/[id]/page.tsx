import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import Link from "next/link";
import FriendCard from "@/components/cards/FriendCard";
import UserCard from "@/components/cards/UserCard";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id, true);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  const isViewingOwnProfile = user.id === userInfo.id;
  const filteredProfileTabs = isViewingOwnProfile
    ? profileTabs
    : profileTabs.filter((tab) => tab.label !== "Activity");

  const loggedInUserInfo = await fetchUser(user.id, true);
  const loggedInUserFriends =
    loggedInUserInfo && loggedInUserInfo.friends
      ? loggedInUserInfo.friends.map((friend: { id: any }) => friend.id)
      : [];

  console.log(userInfo.friends);

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        friends={loggedInUserFriends}
      />

      <div className="mt-9">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="tab">
            {filteredProfileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Posts" && (
                  <p className="ml-1 rounded-sm bg-[#49ECAD] px-2 py-1 !text-tiny-medium text-black ">
                    {userInfo.threads.length}
                  </p>
                )}

                {tab.label === "Friends" && (
                  <p className="ml-1 rounded-sm bg-[#49ECAD] px-2 py-1 !text-tiny-medium text-black">
                    {userInfo.friends.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {filteredProfileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              {tab.label === "Activity" && isViewingOwnProfile ? (
                activity.length > 0 ? (
                  activity.map((activityItem) => (
                    <Link
                      key={activityItem._id}
                      href={`/thread/${activityItem.parentId}`}
                    >
                      <article className="activity-card">
                        <Image
                          src={activityItem.author.image}
                          alt="user_logo"
                          width={35}
                          height={35}
                          className="rounded-full object-cover"
                        />
                        <p className="!text-small-regular text-light-1">
                          <span className="mr-1 text-[#D82CFB]">
                            {activityItem.author.name}
                          </span>{" "}
                          replied to your thread
                        </p>
                      </article>
                    </Link>
                  ))
                ) : (
                  <p className="!text-base-regular text-light-3">
                    No activity yet
                  </p>
                )
              ) : tab.label === "Friends" ? (
                userInfo.friends && userInfo.friends.length > 0 ? (
                  userInfo.friends.map(
                    (friend: {
                      id: string;
                      name: string;
                      username: string;
                      image: string;
                    }) => (
                      <div className="mt-10">
                        <FriendCard
                          key={friend.id}
                          id={friend.id}
                          name={friend.name}
                          username={friend.username}
                          imgUrl={friend.image}
                          personType={""}
                        />
                      </div>
                    )
                  )
                ) : (
                  <p className="!text-base-regular text-light-3">
                    No friends yet
                  </p>
                )
              ) : (
                <ThreadsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
