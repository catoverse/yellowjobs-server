require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const categoryController = require("./controllers/category");

const categoriesRoutes = require("./routes/category");
const tweetsRoutes = require("./routes/tweets");
const metaRoutes = require("./routes/meta");
const verificationRoutes = require("./routes/verification");
const feedbackRoutes = require("./routes/feedback");

const app = express();

const DB_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

const swaggerDocs = swaggerJsDoc({
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "YellowJobs API",
      description: "YellowJobs API v1",
      contact: {
        name: "API Support",
        url: "",
      },
      servers: ["http://yellowjobs.org"],
    },
  },
  apis: ["routes/*.js"],
});

app.use(morgan(process.env.NODE_ENV == "production" ? "common" : "dev"));
app.use(express.json());

app.options("/volunteer/*", cors());
app.use(cors());

app.use("/api", tweetsRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", metaRoutes);
app.use("/api", verificationRoutes);
app.use("/api", feedbackRoutes);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log(
  "⚠️Starting ",
  process.env.NODE_ENV == "production" ? "prod" : "staging",
  " Environment"
);
mongoose
  .connect(DB_URL, {
    dbName: process.env.NODE_ENV === "production" ? "prod" : "staging",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Database Connected!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("🚀 Server Ready! at port:", PORT);
    });
  });
