require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { authors, books } = require("./db");
const { schema } = require("./schema");
const { PubSub } = require("graphql-subscriptions");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const { createServer } = require("http");
const express = require("express");
const pubsub = new PubSub();

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "subscriptions",
});

const serverCleanup = useServer(
  {
    schema,
    context: {
      pubsub,
    },
  },
  wsServer
);

async function startApolloServer() {
  const server = new ApolloServer({
    schema: schema,
    context: async ({ req, res }) => ({
      authors,
      books,
      pubsub,
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

startApolloServer();

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is listening on: ${process.env.PORT}`);
});
