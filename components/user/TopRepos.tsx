import React from "react";
import colors from "../../constant/language-color";
import { BiBookBookmark } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { BiGitRepoForked } from "react-icons/bi";

type reposType = {
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  size: number;
};

interface TopReposProps {
  repos: reposType[];
}

export default function TopRepos({ repos }: TopReposProps) {
  const [sortType, setSortType] = React.useState<string>("stars");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-row justify-between md:justify-start md:space-x-3 px-2 md:px-0">
        <h1 className="text-2xl mb-8 border-b border-dashed border-gray-400">
          Top Repos
        </h1>
        <div>
          <select
            className="p-2 rounded-md border-none outline-none"
            id="select"
            onChange={() =>
              /* @ts-ignore */
              setSortType(document.getElementById("select")?.value)
            }
          >
            <option value="stars">by stars</option>
            <option value="forks">by forks</option>
            <option value="size">by size</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center">
        {repos
          ?.sort((a, b) =>
            sortType == "size"
              ? b.size - a.size
              : sortType == "forks"
              ? b.forks_count - a.forks_count
              : b.stargazers_count - a.stargazers_count
          )
          .slice(0, 12)
          .map((repo) => (
            <a
              href={repo?.html_url}
              target="_blank"
              className="bg-white w-[386px] h-[176px] p-6 flex flex-col justify-between mx-1 my-1 cursor-pointer"
            >
              <div>
                <div className="flex flex-row space-x-2 items-center text-xl font-medium">
                  <span>
                    <BiBookBookmark />
                  </span>
                  <h1>{repo?.name ? repo.name : "no name"}</h1>
                </div>
                {repo?.description && (
                  <div className="pt-3 text-sm text-gray-600">
                    <p>{repo?.description}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-between text-sm  text-gray-600">
                <div className="flex flex-row justify-center items-center space-x-3">
                  <div className="flex flex-row justify-center items-center space-x-1">
                    {/* <span className='text-yellow-400'><GoPrimitiveDot /></span> */}
                    <span
                      style={{
                        /* @ts-ignore */
                        color: colors[repo?.language]
                          ? /* @ts-ignore */
                            colors[repo?.language]
                          : "grey",
                      }}
                    >
                      <GoPrimitiveDot />
                    </span>

                    <span>{repo?.language ? repo?.language : "EMPTY"}</span>
                  </div>
                  <div className="flex flex-row justify-center items-center space-x-1">
                    <span>
                      <BsFillStarFill />
                    </span>
                    <span>{repo?.stargazers_count}</span>
                  </div>
                  <div className="flex flex-row justify-center items-center space-x-1">
                    <span>
                      <BiGitRepoForked />
                    </span>
                    <span>{repo?.forks_count}</span>
                  </div>
                </div>
                <div>{repo?.size} KB</div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}
