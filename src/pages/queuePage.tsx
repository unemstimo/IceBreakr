import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Advertisement from "~/components/advertisement";
import GameCardHorizontal from "~/components/GameCardHorizontal";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import { api } from "~/utils/api";
import MyFriendsBar from "~/components/myFriendsBar";

import ListPage from "./playlistPage";

export default function QueuePage() {
  return <ListPage></ListPage>;
}
