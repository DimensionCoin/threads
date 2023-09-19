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
    <Button
      onClick={handleAddFriend}
      className="flex cursor-pointer gap-3 bg-[#D82CFB] px-4 py-2 rounded-full hover:bg-[#d82cfbda]"
    >
      <Image
        src="/assets/adduser.svg"
        alt="add user"
        width={30}
        height={30}
        className=""
      />
      <p className="max-sm:hidden text-black">Follow</p>
    </Button>
  );
};

export default AddUserButton;
