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
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import PitBull from "~/assets/images/pitbull.jpeg";
import { SignedIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListPage from "./playlistPage";

export default function QueuePage() {
  return <ListPage></ListPage>;
}
