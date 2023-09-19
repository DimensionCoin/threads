import Link from "next/link";
import Image from "next/image";
import AddUserButton from "../buttons/AddUserButton";
import UnfollowButton from "../buttons/UnfollowButton";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  friends: Array<string>;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  friends,
}: Props) {
  const isFriend = friends.includes(accountId);

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
        <div className="space-y-5 flex flex-col items-start justify-end">
          {accountId === authUserId && type !== "Community" && (
            <Link href="/profile/edit">
              <div className="flex cursor-pointer gap-3 rounded-lg bg-[#404040] px-4 py-2 justify-end ml-40 ">
                <Image
                  src="/assets/edit.svg"
                  alt="logout"
                  width={16}
                  height={16}
                />
                <p className="text-light-2 max-sm:hidden text-center flex justify-center">
                  Edit Account
                </p>
              </div>
            </Link>
          )}
          <div className="ml-40 md:w-auto">
            {accountId === authUserId && type !== "Community" && (
              <OrganizationSwitcher
                appearance={{
                  baseTheme: dark,
                  elements: {
                    organizationSwitcherTrigger: "py-2 px-1",
                  },
                }}
              />
            )}
          </div>
        </div>

        {accountId !== authUserId &&
          type !== "Community" &&
          (isFriend ? (
            <UnfollowButton accountId={accountId} authUserId={authUserId} />
          ) : (
            <AddUserButton accountId={accountId} authUserId={authUserId} />
          ))}
      </div>

      {type !== "Community" && (
        <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
      )}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default ProfileHeader;
