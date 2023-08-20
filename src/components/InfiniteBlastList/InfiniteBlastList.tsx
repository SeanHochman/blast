import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileImage } from "../ProfileImage/ProfileImage";
import Link from "next/link";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { useSession } from "next-auth/react";

type BlastType = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; name: string; image: string };
};

type InfiniteBlastListType = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNewBlasts: () => Promise<unknown>;
  blasts: BlastType[];
};

export const InfiniteBlastList = ({
  isError,
  isLoading,
  hasMore,
  fetchNewBlasts,
  blasts,
}: InfiniteBlastListType) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  if (!blasts || blasts.length === 0) {
    return (
      <div className="text-2x1 my-4 text-center text-gray-500">No Blasts</div>
    );
  }

  {
    return (
      <ul>
        <InfiniteScroll
          dataLength={blasts.length}
          next={fetchNewBlasts}
          hasMore={hasMore}
          loader={"loading..."}
        >
          {blasts.map((blast) => {
            return <BlastCard key={blast.id} {...blast} />;
          })}
        </InfiniteScroll>
      </ul>
    );
  }
};

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

type HeartButtonProps = {
  likedByMe: boolean;
  likeCount: number;
};

const HeartButton = ({ likedByMe, likeCount }: HeartButtonProps) => {
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;
  if (session.status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-300">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    );
  }
  return (
    <button
      className={`group flex items-center gap-1 self-start transition-colors duration-200 ${
        likedByMe
          ? "text-red-500"
          : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
      }`}
    >
      <HeartIcon
        className={`transition-colors duration-200 ${
          likedByMe
            ? "fill-red-500"
            : "fill-gray-500 fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
        }`}
      />
      <span>{likeCount}</span>
    </button>
  );
};

const BlastCard = ({
  id,
  user,
  content,
  createdAt,
  likedByMe,
  likeCount,
}: BlastType) => {
  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${user.id}`}
            className="font-bold hover:underline focus-visible:underline"
          >
            {user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateTimeFormatter.format(createdAt)}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <HeartButton likedByMe={likedByMe} likeCount={likeCount} />
      </div>
    </li>
  );
};
