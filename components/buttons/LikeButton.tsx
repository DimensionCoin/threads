"use client"
import Image from "next/image";
import { likeThread, fetchLikesCount } from "@/lib/actions/thread.actions";
import React, { useState, useEffect } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
}

function LikeButton({ threadId, currentUserId }: Props) {
  const [likeCount, setLikeCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const count = await fetchLikesCount(threadId);
        setLikeCount(count);
      } catch (error) {
        console.error("Error fetching likes count:", error);
      }
    }

    fetchData();
  }, [threadId]);

  async function handleLikeClick() {
    try {
      await likeThread(threadId, currentUserId);
      // Reload the entire window
      window.location.reload();
    } catch (error) {
      console.error("Error liking the thread:", error);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleLikeClick} className="flex items-center gap-2">
        <Image
          src="/assets/heart-gray.svg"
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer object-contain"
        />
        <div className="text-white text-subtle-medium">{likeCount}</div>
      </button>
    </div>
  );
}

export default LikeButton;
