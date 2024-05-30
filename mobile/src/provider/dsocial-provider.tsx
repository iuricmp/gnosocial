import { createContext, useContext, useEffect, useState } from "react";

import * as Grpc from "@gno/grpc/client";
import { PromiseClient } from "@connectrpc/connect";

export interface IndexerContextProps {
  getHomePosts: (userPostAddr: string, startIndex: bigint, endIndex: bigint) => Promise<[number, string]>;
  hello: (name: string) => Promise<HelloResponse>;
  helloStream: (name: string) => Promise<AsyncIterable<HelloStreamResponse>>;
}

interface DsocialProviderProps {
  config: ConfigProps;
  children: React.ReactNode;
}

const IndexerContext = createContext<IndexerContextProps | null>(null);

type BackendMode = 'local' | 'remote';

const DsocialProvider: React.FC<DsocialProviderProps> = ({ children }) => {

	const [backendMode, setBackendMode] = useState<string>("");


  const getClient = () => {
    if (!clientInstance) {
      throw new Error("Indexer client instance not initialized.");
    }

    return clientInstance;
  };

  const formatHomePost = (homePosts: UserAndPostID[]): string => {
    let result = "[]UserAndPostID{";
    for (const homePost of homePosts) {
      result += `{"${homePost.userPostAddr}", ${homePost.postID}},`;
    }
    result += "}";

    return result;
  };

  // Call getHomePosts and return [nHomePosts, addrAndIDs] where nHomePosts is the
  // total number of home posts and addrAndIDs is a Go string of the slice of
  // UserAndPostID which to use in qEval `GetJsonTopPostsByID(${addrAndIDs})`.
  const getHomePosts = async (userPostAddr: string, startIndex: bigint, endIndex: bigint): Promise<[number, string]> => {
    const client = getClient();

    const homePostsResult = await client.getHomePosts({
      userPostAddr,
      startIndex,
      endIndex,
    });
    const homePosts = formatHomePost(homePostsResult.homePosts);

    return [Number(homePostsResult.nPosts), homePosts];
  };

  const hello = async (name: string) => {
    const client = getClient();
    return client.hello({ name });
  };

  const helloStream = async (name: string) => {
    const client = getClient();
    return client.helloStream({ name });
  };

  if (!clientInstance) {
    return null;
  }

  const value = {
    getHomePosts,
    hello,
    helloStream,
  };

  return <IndexerContext.Provider value={value}>{children}</IndexerContext.Provider>;
};

function useDsocialContext() {
  const context = useContext(IndexerContext) as IndexerContextProps;

  if (context === undefined) {
    throw new Error("useDsocialContext must be used within a DsocialProvider");
  }
  return context;
}

export { DsocialProvider, useDsocialContext };
