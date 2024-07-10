"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  
  const [userPosts, setUserPosts] = useState([]);
  const [username, setUsername] = useState("")
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    const fetchUsername = async () => {
      const response = await fetch(`/api/users/${params?.id}`);
      const data = await response.json();

      setUsername(data.username);
    };

    if (params?.id) {
      fetchPosts();
      fetchUsername();
    }
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts.`}
      data={userPosts}
    />
  )
}

export default UserProfile