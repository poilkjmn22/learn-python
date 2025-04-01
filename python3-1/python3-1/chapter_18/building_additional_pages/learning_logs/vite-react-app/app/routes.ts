import { type RouteConfig, layout} from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        {
            index: true,
            file: "routes/home.tsx"
        },
        {
            path: "topics",
            file: "routes/topics.tsx",
        },
        {
            path: "topics/:topicId",
            file: "routes/topics.$topicId.tsx",
            // loader: loader
        },
    ])
] satisfies RouteConfig;
