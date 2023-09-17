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
        alert(result.message);
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <Button
      onClick={handleAddFriend}
      className="flex cursor-pointer gap-3 rounded-lg bg-[#404040] px-4 py-2"
    >
      <Image src="/assets/user.svg" alt="add user" width={16} height={16} />
      <p className="text-light-2 max-sm:hidden">Add User</p>
    </Button>
  );
};

export default AddUserButton;
