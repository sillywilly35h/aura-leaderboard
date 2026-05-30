import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔑 YOU MUST REPLACE THESE LATER
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";

const supabase = createClient(supabaseUrl, supabaseKey);

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
