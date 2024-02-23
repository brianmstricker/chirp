"use client";
import { useEffect, useState } from "react";
import DisplayTweet from "./DisplayTweet";
import { User } from "next-auth";

type DisplayTweetWrapperProps = {
 tweets: {
  id: string;
  text: string | null;
  createdAt: Date;
  updatedAt: Date;
  reply?: boolean;
  replyToId?: string | null;
  userId: string;
  repliesLength?: number;
  user: {
   handle: string | null;
   username: string | null;
   image: string | null;
  };
  media:
   | {
      id: string;
      tweetId: string;
      url: string;
      width: string;
      height: string;
      aspectRatio: string;
     }[]
   | [];
  likes: {
   id: string;
   userId: string;
   tweetId: string;
   createdAt: Date;
  }[];
  bookmarks: {
   id: string;
   userId: string;
   tweetId: string;
   createdAt: Date;
  }[];
 }[];
 user: User | undefined;
};

const DisplayTweetWrapper = ({ tweets, user }: DisplayTweetWrapperProps) => {
 const [usersLikedTweets, setUsersLikedTweets] = useState<string[]>([]);
 const [usersBookmarks, setUsersBookmarks] = useState<string[]>([]);
 const [likesInfo, setLikesInfo] = useState(
  tweets.map((tweet) => ({ id: tweet.id, numberOfLikes: tweet.likes.length }))
 );
 const [bookmarkInfo, setBookmarkInfo] = useState(
  tweets.map((tweet) => ({
   id: tweet.id,
   numberOfBookmarks: tweet.bookmarks.length,
  }))
 );
 useEffect(() => {
  if (user) {
   const likes = tweets.map((tweet) => {
    return tweet.likes.filter((like) => like.userId == user.id);
   });
   const flatLikes = likes.flat().map((like) => like.tweetId);
   setUsersLikedTweets(flatLikes);
   const bookmarks = tweets.map((tweet) => {
    return tweet.bookmarks.filter((bookmark) => bookmark.userId == user.id);
   });
   const flatBookmarks = bookmarks.flat().map((bookmark) => bookmark.tweetId);
   setUsersBookmarks(flatBookmarks);
  }
 }, [user, tweets]);
 return (
  <div className="pb-48">
   {tweets.map((tweet) => (
    <DisplayTweet
     key={tweet.id}
     tweet={tweet}
     user={user}
     usersLikedTweets={usersLikedTweets}
     likesInfo={likesInfo}
     setLikesInfo={setLikesInfo}
     setUsersLikedTweets={setUsersLikedTweets}
     usersBookmarks={usersBookmarks}
     setUsersBookmarks={setUsersBookmarks}
     bookmarkInfo={bookmarkInfo}
     setBookmarkInfo={setBookmarkInfo}
    />
   ))}
  </div>
 );
};
export default DisplayTweetWrapper;