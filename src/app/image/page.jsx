"use client";
import CreatePost from "@/components/CreatePost";
import "src/app/globals.css";
import React from "react";

const image = () => {
  return (
    <main className="min-h-[calc(100vh-73px)] w-full bg-[#171b29] px-4 py-8 sm:p-8">
      <CreatePost />
    </main>
  );
};

export default image;
