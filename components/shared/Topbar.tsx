"use client";

import {
  OrganizationSwitcher,
  SignedIn,
  SignOutButton,
  useUser,

} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

function Topbar() {
  const user = useUser();

  const userId = user.isLoaded && user.user ? user.user.id : null;
    const userProfileImage =
      user.isLoaded && user.user ? user.user.imageUrl : null;


  console.log(user)
  return (
    <nav className="topbar">
      {userId ? (
        <Link href={`/profile/${userId}`} className="flex items-center gap-4 ">
          {userProfileImage ? (
            <Image
              src={userProfileImage}
              alt="User Profile"
              width={28}
              height={28}
              className="rounded-full"
            />
          ) : (
            <Image src="/solana.svg" alt="logo" width={28} height={28} />
          )}
          <p className="text-heading3-bold text-[#49ECAD] max-xs:hidden">
            Sol Social
          </p>
        </Link>
      ) : (
        <div>Loading...</div>
      )}

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <div className="bg-[#D82CFB] rounded-md"></div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;
