import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import UserInfo from "../components/user/UserInfo";
import TopRepos from "../components/user/TopRepos";
import Graph from "../components/user/Graph";
import ErrorComp from "../components/error";

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

type reposType = {
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  size: number;
};

export default function Home() {
  const [user, setUser] = useState<userType>({});
  const [rateLimit, setRateLimit] = useState<rateLimitType>({});
  const [repos, setRepos] = React.useState<reposType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.user) return;
    if (user?.login) return;
    setLoading(true);
    fetch(`https://api.github.com/users/${router.query.user}`).then((res) => {
      if (res.status == 404) {
        setError(true);
      } else {
        res.json().then((data) => {
          setUser(data);
          console.log(data);
        });
      }
    });
    fetch("https://api.github.com/rate_limit").then((res) => {
      res.json().then((data) => {
        setRateLimit(data.rate);
      });
    });
    fetch(
      `https://api.github.com/users/${router.query.user}/repos?per_page=1000`
    ).then((res) => {
      res.json().then((data) => {
        setRepos(data);
      });
    });
    setLoading(false);
  }, [router.query.user]);

  if (!user?.login) return <ErrorComp loading={loading} error={error} />;

  return (
    <>
      <UserInfo user={user} rateLimit={rateLimit} />
      <Graph repos={repos} />
      <TopRepos repos={repos} />
    </>
  );
}
