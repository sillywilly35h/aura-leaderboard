import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = "https://cekpoajhzniogdbxabll.supabase.co";
const supabaseKey = "sb_publishable_40u7YDQNPSYhhU5Z6ZOOXA_ytkzUYnQ";

const supabase = createClient(supabaseUrl, supabaseKey);
<h1>🔥 Aura Leaderboard</h1>

<div id="auth">
  <input id="email" placeholder="email">
  <input id="password" placeholder="password" type="password">

  <button onclick="signUp()">Sign Up</button>
  <button onclick="signIn()">Sign In</button>
</div>

<hr>

<button onclick="gainAura()">+1 Aura</button>

<h2>🏆 Leaderboard</h2>
<div id="leaderboard"></div>
// 🔥 Gain aura button
async function gainAura() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    alert("You need to log in first");
    return;
  }

  const { data } = await supabase
    .from("profiles")
    .select("aura")
    .eq("id", userData.user.id)
    .single();

  await supabase
    .from("profiles")
    .update({ aura: data.aura + 1 })
    .eq("id", userData.user.id);

  loadLeaderboard();
}

// 🏆 Load leaderboard
async function loadLeaderboard() {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("aura", { ascending: false });

  const board = document.getElementById("leaderboard");

  board.innerHTML = data
    .map((u, i) => `<p>#${i + 1} ${u.username} — ${u.aura}</p>`)
    .join("");
}

loadLeaderboard();
