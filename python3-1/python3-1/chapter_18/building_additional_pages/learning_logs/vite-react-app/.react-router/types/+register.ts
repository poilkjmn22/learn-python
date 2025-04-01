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
};