import React from "react";
import { searchQuery } from "../service/searchQuery";

export function GithubLogin() {
  const access_token = searchQuery("token");
  localStorage.setItem("ACCESS_TOKEN", access_token);
  window.location.href = "/main";
}
