"use client";
import Image from "next/image";
import { fetchUser, addFriend, removeFriend } from "@/lib/actions/user.actions";
import { Button } from "../ui/button";

interface Props {
  accountId: string;
  authUserId: string;
}

const UnfollowButton: React.FC<Props> = ({ accountId, authUserId }) => {
  const handleRemoveFriend = async () => {
    try {
      const result = await removeFriend(authUserId, accountId);
      if (result.message) {
        
        window.location.reload(); // Reload the page
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };


  return (
    <Button
      onClick={handleRemoveFriend}
      className="flex cursor-pointer gap-3 bg-[#D82CFB] px-4 py-2 rounded-full hover:bg-[#d82cfbda]"
    >
      <Image src="/assets/unfollow.svg" alt="add user" width={30} height={30} />
      <p className="text-black max-sm:hidden">Unfollow</p>
    </Button>
  );
};

export default UnfollowButton;
