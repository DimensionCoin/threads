"use client"
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  threadId: string;
};

const ShareButton: React.FC<Props> = ({ threadId }) => {
  const copyToClipboard = () => {
    const threadURL = `${window.location.origin}/thread/${threadId}`;
    navigator.clipboard
      .writeText(threadURL)
      .then(() => {
        toast.success("Thread URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy thread URL: ", err);
        toast.error("Failed to copy thread URL.");
      });
  };

  return (
    <div onClick={copyToClipboard}>
      <Image
        src="/assets/share.svg"
        alt="share"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
      />
    </div>
  );
};

export default ShareButton;
