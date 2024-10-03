import React from "react";
import InfiniteScrollBlogs from "../components/InfiniteScrollBlogs";
import BlogSearch from "../components/BlogSearch";

export default function BlogsRead() {

  return (
    <div id="blog-list-page">
      <BlogSearch />                {/* Search bar for blogs */}
      <InfiniteScrollBlogs />       {/* Display blogs with infinite scrolling */}
    </div>
  )
}
