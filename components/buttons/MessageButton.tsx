import React from 'react'
import Image from "next/image";
import Link from 'next/link';

const MessageButton = () => {
  return (
    <div>
      <Link href="/message">
        <Image src="/assets/reply.svg" alt="logo" height={32} width={32} />
      </Link>
    </div>
  );
}

export default MessageButton