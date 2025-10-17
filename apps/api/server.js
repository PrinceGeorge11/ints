import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const WEB_ORIGIN = process.env.WEB_ORIGIN || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: WEB_ORIGIN, credentials: true }));

const users = [
  { id: "u1", email: "student@hawk.illinoistech.edu", passwordHash: bcrypt.hashSync("Passw0rd!", 10) }
];
const tasks = [
  { id: "t1", userId: "u1", name: "Upload Passport & I-20", due: "Nov 10", status: "In Progress" },
  { id: "t2", userId: "u1", name: "SEVIS Fee Payment", due: "Nov 12", status: "Not Started" }
];

function sign(user){ return jwt.sign({ uid:user.id, email:user.email }, JWT_SECRET, { expiresIn: "7d" }); }
function auth(req,res,next){
  const token = req.cookies?.token;
  if(!token) return res.status(401).json({ error: "Unauthorized" });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); }
  catch { res.status(401).json({ error: "Unauthorized" }); }
}

app.get("/api/health", (_req,res)=>res.json({ ok:true }));

app.post("/api/auth/login", async (req,res)=>{
  const { email, password } = req.body || {};
  const user = users.find(u=>u.email===email);
  if(!user) return res.status(401).json({ error:"Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(401).json({ error:"Invalid credentials" });
  const token = sign(user);
  res.cookie("token", token, { httpOnly:true, sameSite:"lax", secure:true, maxAge:7*24*60*60*1000 });
  res.json({ ok:true, email:user.email });
});

app.post("/api/auth/logout", (_req,res)=>{ res.clearCookie("token"); res.json({ ok:true }); });
app.get("/api/auth/me", auth, (req,res)=>{ res.json({ ok:true, user:{ id:req.user.uid, email:req.user.email } }); });

app.get("/api/tasks", auth, (req,res)=>{ const userTasks = tasks.filter(t=>t.userId===req.user.uid); res.json({ ok:true, tasks:userTasks }); });
app.post("/api/tasks", auth, (req,res)=>{ const { name, due } = req.body || {}; const t = { id:"t"+(tasks.length+1), userId:req.user.uid, name, due, status:"Not Started" }; tasks.push(t); res.json({ ok:true, task:t }); });

app.use((_req,res)=>res.status(404).json({ error:"Not Found" }));

app.listen(PORT, ()=>console.log("API listening on :"+PORT));
