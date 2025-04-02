import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/topics": {};
  "/topics/:topicId": {
    "topicId": string;
  };
  "/newTopic/:topicId?": {
    "topicId"?: string;
  };
  "/newEntry/:topicId/:entryId?": {
    "topicId": string;
    "entryId"?: string;
  };
};