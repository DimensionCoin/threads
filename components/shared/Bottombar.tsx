"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";

function Bottombar() {
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          const isCreatePost =
            link.route === "create-post" || link.label === "Create Post";
          const iconSize = isCreatePost ? 44 : 16;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-[#D82CFB]"}`}
            >
              {isCreatePost ? (
                <div className="create-post-wrapper">
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={iconSize}
                    height={iconSize}
                    className="object-contain mb-1"
                  />
                </div>
              ) : (
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={iconSize}
                  height={iconSize}
                  className="object-contain"
                />
              )}

              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
export default Bottombar