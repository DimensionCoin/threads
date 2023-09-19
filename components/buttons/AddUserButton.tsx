"use client"
import Image from "next/image";
import { fetchUser, addFriend, removeFriend } from "@/lib/actions/user.actions";
import { Button } from "../ui/button";


interface Props {
  accountId: string;
  authUserId: string;
}

const AddUserButton: React.FC<Props> = ({ accountId, authUserId }) => {
  
    const handleAddFriend = async () => {
      try {
        const result = await addFriend(authUserId, accountId);
        if (result.message) {
          
          window.location.reload(); // Reload the page
        }
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    };

  return (
    <button
      onClick={handleAddFriend}
      className="flex items-center gap-1 bg-[#D82CFB] px-4 py-2 rounded-full hover:bg-[#d82cfbda] min-w-[100px] text-center justify-center"
    >
      <Image
        src="/assets/adduser.svg"
        alt="add user"
        width={20}
        height={20}
        className="max-sm:hidden"
      />
      <p className="text-black">Follow</p>
    </button>
  );
};

export default AddUserButton;
