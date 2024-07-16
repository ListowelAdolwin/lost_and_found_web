const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const lostItemsRoutes = require("./routes/lostItemsRoutes.js");
const foundItemsRoutes = require("./routes/foundItemsRoutes.js");
const claimItemRoutes = require("./routes/claimRoutes.js")
const feedbackRoutes = require("./routes/feedbackRoutes.js");
const reportLostItemsRoutes = require("./routes/ReportFoundRoutes.js")


dotenv.config();

const app = express()

app.use(express.json())

app.use(
	cors({
		origin: [
			"http://127.0.0.1:5173",
      		"https://127.0.0.1:5173",
			'http://localhost:3000',
			'http://127.0.0.1:3000',
		],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use('/api/auth', authRoutes)
app.use('/api/lost-items', lostItemsRoutes)
app.use('/api/found-items', foundItemsRoutes)
app.use('/api/claim', claimItemRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/report-found', reportLostItemsRoutes)

connectDB()

app.listen(3000, () => {
  console.log("App started!")
})
