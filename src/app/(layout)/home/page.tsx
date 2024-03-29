import { Suspense } from "react";
import { fetchTweetsAction } from "@/actions/tweet-actions";
import Loading from "./loading";
import { auth } from "@/auth";
import DisplayTweet from "@/components/Home/DisplayTweet";

export default async function Home() {
 const userInfo = await auth();
 const user = userInfo?.user;
 const tweets = await fetchTweetsAction();
 return (
  <>
   <Suspense fallback={<Loading />}>
    {Array.isArray(tweets) && tweets.length > 0 && (
     <div className="pb-48">
      {tweets.map((tweet) => (
       <DisplayTweet
        key={tweet.id}
        tweet={tweet}
        user={user}
        repliesLength={(tweet as any).repliesLength}
       />
      ))}
     </div>
    )}
    {Array.isArray(tweets) && tweets.length === 0 && (
     <div className="border-b dark:border-b-white/25 py-5 text-center text-xl font-bold">
      No tweets yet!
     </div>
    )}
   </Suspense>
  </>
 );
}
