const express = require("express")
const connectTOMongoDB = require("./db/connectToDB")
const userRouter = require("./routes/user.router")
const authRouter = require("./auth/auth.router")
const postsRouter = require("./routes/posts.router")
const isAuth = require("./middlewares/isAuth.middleware")

const app = express()
app.use(express.json())
connectTOMongoDB()

app.use("/users",userRouter)
app.use("/auth",authRouter)
app.use("/posts",isAuth,postsRouter)

app.get("/",(req,res) => {
    res.send('this is / route')
})

app.listen(3030,() => {
    console.log("server running on http://localhost:3030")
})