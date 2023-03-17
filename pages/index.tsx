import react, { useState } from "react";
import { useRouter } from "next/router";
import { AiFillGithub } from "react-icons/ai";

export default function Home() {
  const router = useRouter();
  const [username, setUserName] = useState("");
  return (
    <div className="h-[100vh] bg-[#1a1e22] w-full">
      <div className="container mx-auto flex h-full justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-8">
          <AiFillGithub size={80} color="#0070f3" />
          <p className="text-4xl font-medium text-white text-center">
            Find Your GitHub Profile
          </p>
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-[#24292e] rounded-md py-4 px-4 lg:w-[40vw] md:w-[60vw] w-[90vw] outline-none text-[#79b8ff] text-xl text-center"
            placeholder="Enter your GitHub username"
          />
          <button
            className="bg-[#0070f3] text-white rounded-sm outline-none py-2 px-4 w-64"
            onClick={() => {
              router.push(`/${username}`);
            }}
          >
            find
          </button>
        </div>
      </div>
    </div>
  );
}
