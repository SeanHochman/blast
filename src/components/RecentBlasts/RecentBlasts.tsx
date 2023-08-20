import React from "react";
import { InfiniteBlastList } from "../InfiniteBlastList";
import { api } from "~/utils/api";

export const RecentBlasts = () => {
  const blasts = api.blast.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteBlastList
      blasts={blasts.data?.pages.flatMap((page) => page.blasts)}
      error={blasts.error}
      isLoading={blasts.isLoading}
      hasMore={blasts.hasNextPage}
      fetchNewBlasts={blasts.fetchNextPage}
    />
  );
};
