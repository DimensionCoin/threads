"use client";
import { removeFriend } from "@/lib/actions/user.actions";
import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  type?: string;
  id: string;
}

function FriendCard({
  id,
  name,
  username,
  imgUrl,
  accountId,
  authUserId,
  type,
}: Props) {

  const handleRemoveFriend = async () => {
    try {
      const result = await removeFriend(authUserId, id);
      if (result.message) {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  

  return (
    <article
      className="user-card"
      
      style={{ cursor: "pointer" }}
    >
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            layout="fill"
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>
    </article>
  );
}

export default FriendCard;
