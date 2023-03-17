import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import colors from "../../constant/language-color";
import { Chart, registerables } from "chart.js";
import { lang } from "moment";
Chart.register(...registerables);

const style = {
  card: "bg-white shadow-sm w-[376px] h-[443px] mx-2 my-2 rounded-md overflow-hidden p-6",
  title:
    "text-2xl font-medium text-gray-900 border-b border-dashed  w-fit pb-1",
  chartContainer: "w-full h-full py-4",
};

type reposType = {
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  size: number;
};

export default function Graph({ repos }: { repos: reposType[] }) {
  const languages: string[] = repos
    .filter((repo) => repo.language != null)
    .map((repo) => repo.language);
  //@ts-ignore
  const uniqueLanguages: string[] = [...new Set(languages)];
  const languageCount: number[] = uniqueLanguages.map(
    (language) => languages.filter((lang) => lang == language).length
  );
  const starsPerLanguage: { language: string; stars: number }[] =
    uniqueLanguages.map((language) => {
      const stars = repos
        .filter((repo) => repo.language == language)
        .map((repo) => repo.stargazers_count);
      return {
        language,
        stars: stars.reduce((a, b) => a + b, 0),
      };
    });

  const stars: number[] = starsPerLanguage.map((lang) => lang.stars);
  const mostStaredRepos = repos
    .map((repo) => repo)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .splice(0, 5);
  console.log(mostStaredRepos);
  const topLanguageData = {
    labels: uniqueLanguages,
    datasets: [
      {
        label: "Top Languages",
        data: languageCount,
        backgroundColor: uniqueLanguages.map((language) =>
          //@ts-ignore
          colors[language] ? colors[language] + "aa" : "#999999"
        ),
        borderWidth: 1,
      },
    ],
  };

  const starsPerLanguageData = {
    labels: uniqueLanguages,
    datasets: [
      {
        label: "Top Languages",
        data: stars,
        backgroundColor: uniqueLanguages.map((language) =>
          //@ts-ignore
          colors[language] ? colors[language] + "aa" : "#999999"
        ),
        borderWidth: 1,
      },
    ],
  };

  const mostStaredReposData = {
    labels: mostStaredRepos.map((repo) => repo.name),
    datasets: [
      {
        label: "Stars Per Language",
        data: mostStaredRepos.map((repo) => repo.stargazers_count),
        backgroundColor: mostStaredRepos.map((repo) =>
          //@ts-ignore
          colors[repo.language] ? colors[repo.language] + "aa" : "#999999"
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center -translate-y-20">
        <div className={style.card}>
          <h1 className={style.title}>Top Languages</h1>
          <div className={style.chartContainer}>
            <Pie
              options={{
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
              data={topLanguageData}
            />
          </div>
        </div>
        <div className={style.card}>
          <h1 className={style.title}>Most Starred</h1>
          <div className={style.chartContainer}>
            <Bar
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={mostStaredReposData}
            />
          </div>
        </div>
        <div className={style.card}>
          <h1 className={style.title}>Stars per Language</h1>
          <div className={style.chartContainer}>
            <Pie
              options={{
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
              data={starsPerLanguageData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
