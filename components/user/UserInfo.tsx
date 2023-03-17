import Image from "next/image";
import React, { useEffect } from "react";
import { HiBuildingOffice2, HiOutlineCalendarDays } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import moment from "moment";

type userType = {
  name?: string;
  avatar_url?: string;
  bio?: string;
  company?: string;
  location?: string;
  created_at?: string;
  html_url?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  login?: string;
};
type rateLimitType = {
  remaining?: number;
  limit?: number;
};

export default function UserInfo({
  user,
  rateLimit,
}: {
  user: userType;
  rateLimit: rateLimitType;
}) {
  console.log(user);
  return (
    <div className="bg-[#1a1e22]">
      <div className="p-4 absolute">
        <div className="text-xl text-[#6a737d]">
          <span>{rateLimit?.remaining}</span>
          <span> / </span>
          <span>{rateLimit?.limit}</span>
        </div>
        <span className="text-[#586069] text-xs">REQUESTS LEFT</span>
      </div>
      <div className="pt-16 pb-32">
        <div className="flex flex-col justify-center items-center">
          <div className="rounded-full overflow-hidden w-auto h-auto border-[6px] border-[#0070f3]">
            <Image
              // @ts-ignore
              src={user.avatar_url}
              width={120}
              height={120}
              alt="User Avatar"
            />
          </div>
          <div className="py-4 flex flex-col space-y-1 justify-center items-center">
            <h1 className="text-4xl text-white font-medium text-center">
              {user?.name}
            </h1>
            <a
              href={user?.html_url}
              target={"_blank"}
              className="text-xl text-[#0070f3] text-center hover:underline"
            >
              @{user?.login}
            </a>
          </div>
          <div className="flex flex-wrap justify-center items-center text-[#f0eeff]">
            {user?.company && (
              <div className="flex flex-row justify-center items-center space-x-2 mx-2 my-1">
                <span>
                  <HiBuildingOffice2 />
                </span>
                <span>{user.company}</span>
              </div>
            )}
            {user?.location && (
              <div className="flex flex-row justify-center items-center space-x-2 mx-2 my-1">
                <span>
                  <HiLocationMarker />
                </span>
                <span>{user.location}</span>
              </div>
            )}
            {user?.created_at && (
              <div className="flex flex-row justify-center items-center space-x-2 mx-2 my-1">
                <span>
                  <HiOutlineCalendarDays />
                </span>
                <span>
                  Joined {moment(user?.created_at).format("MMMM D, YYYY")}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center py-6">
            <div className="text-white flex flex-col justify-center items-center space-y-2 mx-1 my-1 bg-[#24292e] px-12 py-3 rounded-md ">
              <h3 className="text-2xl">{user?.public_repos}</h3>
              <span className="uppercase text-xs">Repositories</span>
            </div>
            <div className="text-white flex flex-col justify-center items-center space-y-2 mx-1 my-1 bg-[#24292e] px-12 py-3 rounded-md ">
              <h3 className="text-2xl">{user?.followers}</h3>
              <span className="uppercase text-xs">Followers</span>
            </div>
            <div className="text-white flex flex-col justify-center items-center space-y-2 mx-1 my-1 bg-[#24292e] px-12 py-3 rounded-md ">
              <h3 className="text-2xl">{user?.following}</h3>
              <span className="uppercase text-xs">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
