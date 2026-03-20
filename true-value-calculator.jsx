import { useState } from "react";

const CHF_PER_VOLUNTEER_HOUR = 16;
const EXERCISE_SAVING_PER_WEEK_HOUR = 35;
const CO2_PER_SECONDHAND_ITEM_KG = 10;
const CHF_PER_TON_CO2 = 130;

const categories = [
  {
    id: "body", label: "Body & Health", emoji: "🫀", color: "#e85d4a",
    description: "Investing in your physical vessel",
    research: "Physical inactivity costs $117B/yr in healthcare (CDC). Regularly active people save $500–$2,500/yr in medical costs (JAMA 2023, Baptist Health). High-fit adults have 40% lower average healthcare costs after 65 (JACC).",
    activities: [
      { id: "exercise", label: "Exercise / Movement", unit: "hrs/week", max: 20, tip: "Running, yoga, cycling, hiking...",
        monetaryFn: v => Math.round(v * EXERCISE_SAVING_PER_WEEK_HOUR * 52),
        monetaryLabel: v => `≈ CHF ${Math.round(v * EXERCISE_SAVING_PER_WEEK_HOUR * 52).toLocaleString("de-CH")}/yr healthcare savings avoided` },
      { id: "sleep", label: "Quality Sleep", unit: "hrs/night avg", max: 10, tip: "7–9h optimal — poor sleep costs ~$411B/yr (RAND)",
        monetaryFn: null, monetaryLabel: () => "Poor sleep costs ~$411B/yr in lost productivity (RAND Europe)" },
      { id: "cooking", label: "Home cooking", unit: "meals/week", max: 21, tip: "Fresh, whole-food meals vs. processed / takeaway",
        monetaryFn: v => Math.round(v * 8 * 52),
        monetaryLabel: v => `≈ CHF ${Math.round(v * 8 * 52).toLocaleString("de-CH")}/yr saved vs. eating out` },
      { id: "medical", label: "Preventive care", unit: "appts/year", max: 12, tip: "Checkups, therapy, physio, dentist...",
        monetaryFn: null, monetaryLabel: () => "Prevention saves 10–100× treatment costs (WHO)" },
    ],
  },
  {
    id: "mind", label: "Mind & Soul", emoji: "🧠", color: "#5b8dee",
    description: "Nurturing your inner life",
    research: "Mindfulness reduces anxiety & depression risk by 30–50% (Lancet Psychiatry 2021). Burnout costs CHF 10k–50k per episode in lost productivity (SECO). Lifelong learning adds years of cognitive health (Lancet Commission on Dementia 2020).",
    activities: [
      { id: "meditation", label: "Mindfulness / Meditation", unit: "min/day", max: 60, tip: "Presence, breathing, journaling",
        monetaryFn: null, monetaryLabel: () => "Reduces anxiety risk by up to 30% (Lancet Psychiatry 2021)" },
      { id: "learning", label: "Learning something new", unit: "hrs/week", max: 15, tip: "Books, courses, languages, skills",
        monetaryFn: v => Math.round(v * 50 * 52),
        monetaryLabel: v => `≈ CHF ${Math.round(v * 50 * 52).toLocaleString("de-CH")}/yr in skill value (avg course cost proxy)` },
      { id: "creativity", label: "Creative expression", unit: "hrs/week", max: 20, tip: "Art, music, writing, crafts, gardening",
        monetaryFn: null, monetaryLabel: () => "Proven to reduce cortisol & boost life satisfaction (APA)" },
      { id: "therapy", label: "Therapy / Self-reflection", unit: "sessions/month", max: 8, tip: "Intentional inner work",
        monetaryFn: null, monetaryLabel: () => "Prevents burnout worth CHF 10k–50k/episode (SECO)" },
    ],
  },
  {
    id: "community", label: "Community", emoji: "🤝", color: "#f0a500",
    description: "Freiwilligen-Arbeit & care",
    research: "Switzerland leads Europe in volunteering: 590M hours/yr (Freiwilligen-Monitor 2025, SGG). Replacement value: CHF 13.90–18.80/hr (SRF/SGG 2025). BFS 2024: 376M hrs informal care given — 200M hrs just for children.",
    activities: [
      { id: "volunteer", label: "Freiwilligen-Arbeit (Verein etc.)", unit: "hrs/week", max: 20, tip: "Feuerwehr, Elternrat, charity, sport...",
        monetaryFn: v => Math.round(v * CHF_PER_VOLUNTEER_HOUR * 52),
        monetaryLabel: v => `≈ CHF ${Math.round(v * CHF_PER_VOLUNTEER_HOUR * 52).toLocaleString("de-CH")}/yr replacement value (BFS/SGG 2025)` },
      { id: "informal_help", label: "Informal help / Nachbarschaft", unit: "hrs/week", max: 20, tip: "Neighbors, childcare, elder care",
        monetaryFn: v => Math.round(v * CHF_PER_VOLUNTEER_HOUR * 52),
        monetaryLabel: v => `≈ CHF ${Math.round(v * CHF_PER_VOLUNTEER_HOUR * 52).toLocaleString("de-CH")}/yr (CH: 376M such hrs given in 2024)` },
      { id: "mentoring", label: "Mentoring / Teaching", unit: "hrs/week", max: 10, tip: "Sharing skills, coaching, tutoring",
        monetaryFn: v => Math.round(v * 80 * 52),
        monetaryLabel: v => `≈ CHF ${Math.round(v * 80 * 52).toLocaleString("de-CH")}/yr (market rate CHF 80+/hr)` },
      { id: "community_org", label: "Community / Gemeinde work", unit: "hrs/month", max: 30, tip: "Local politics, associations, initiatives",
        monetaryFn: v => Math.round(v * CHF_PER_VOLUNTEER_HOUR * 12),
        monetaryLabel: v => `≈ CHF ${Math.round(v * CHF_PER_VOLUNTEER_HOUR * 12).toLocaleString("de-CH")}/yr` },
    ],
  },
  {
    id: "planet", label: "Planet & Ecology", emoji: "🌱", color: "#3dba6f",
    description: "Acts that heal the earth",
    research: "Second-hand clothing: up to 42% lower CO2 per use vs. new (Circular Economy Journal 2024). A used sofa saves ~131 kg CO2 (Carousell/Vaayu 2022). Extending garment life by 9 months cuts carbon footprint by 20–30% (EEA 2022). Switzerland CO2 levy: CHF 130/tonne.",
    activities: [
      { id: "secondhand", label: "Buying second-hand clothing", unit: "items/month", max: 20, tip: "Brocki, Vinted, Ricardo, swaps...",
        monetaryFn: v => Math.round(v * 12 * CO2_PER_SECONDHAND_ITEM_KG),
        monetaryLabel: v => `≈ ${Math.round(v * 12 * CO2_PER_SECONDHAND_ITEM_KG)} kg CO₂ avoided/yr (Circular Economy Journal 2024)` },
      { id: "gardening", label: "Gardening / Native plants", unit: "hrs/week", max: 15, tip: "Wildflowers, food, compost, rewilding",
        monetaryFn: null, monetaryLabel: () => "Biodiversity + food + wellbeing — value beyond metrics" },
      { id: "repair", label: "Repairing instead of buying", unit: "items/month", max: 10, tip: "Fixing clothes, electronics, bikes",
        monetaryFn: v => Math.round(v * 50 * 12),
        monetaryLabel: v => `≈ CHF ${Math.round(v * 50 * 12).toLocaleString("de-CH")}/yr production cost avoided` },
      { id: "lowimpact", label: "Low-impact daily choices", unit: "choices/day", max: 10, tip: "Bike instead of car, plant-based meals...",
        monetaryFn: null, monetaryLabel: () => "1 plant meal = ~1.5 kg CO₂ saved vs. beef meal (PLOS ONE)" },
    ],
  },
  {
    id: "relations", label: "Relationships", emoji: "💛", color: "#d97ae8",
    description: "Tending to meaningful connections",
    research: "Strong social ties = 50% better survival odds — equivalent to quitting smoking (Holt-Lunstad et al. 2010, PLOS Medicine). Loneliness costs EU €40B/yr (EU Commission 2023). Each act of kindness measurably boosts giver wellbeing (PNAS 2022).",
    activities: [
      { id: "deepconv", label: "Deep conversations", unit: "hrs/week", max: 15, tip: "Real talk with people you trust",
        monetaryFn: null, monetaryLabel: () => "Social bonds = 50% better survival odds (Holt-Lunstad 2010)" },
      { id: "friendship", label: "Nurturing friendships", unit: "meetups/week", max: 14, tip: "Showing up for others",
        monetaryFn: null, monetaryLabel: () => "Loneliness costs ~$6,700/yr per isolated person (CIGNA)" },
      { id: "acts_kindness", label: "Acts of kindness", unit: "per week", max: 20, tip: "Small gestures that ripple outward",
        monetaryFn: null, monetaryLabel: () => "Measurably boosts giver wellbeing (PNAS 2022)" },
      { id: "caregiving", label: "Caregiving (children/elders)", unit: "hrs/week", max: 40, tip: "Unpaid care work — the backbone of society",
        monetaryFn: v => Math.round(v * CHF_PER_VOLUNTEER_HOUR * 52),
        monetaryLabel: v => `≈ CHF ${Math.round(v * CHF_PER_VOLUNTEER_HOUR * 52).toLocaleString("de-CH")}/yr (ILO: unpaid care = 9% global GDP)` },
    ],
  },
];

const weights = { body: 22, mind: 20, community: 22, planet: 20, relations: 16 };

function scoreAct(value, max) { return !value ? 0 : Math.min(1, value / (max * 0.6)); }
function catScore(cat, values) {
  const s = cat.activities.map(a => scoreAct(values[a.id] || 0, a.max));
  return s.reduce((a, b) => a + b, 0) / s.length;
}
function totalScore(values) {
  return Math.round(categories.reduce((t, c) => t + catScore(c, values) * weights[c.id] / 100, 0) * 100);
}
function computeMonetary(values) {
  let total = 0;
  for (const cat of categories)
    for (const act of cat.activities)
      if (act.monetaryFn) total += act.monetaryFn(values[act.id] || 0);
  return total;
}
function getVerdict(score) {
  if (score >= 80) return { label: "Thriving Contributor", msg: "You're living a life that genuinely enriches the world.", color: "#3dba6f" };
  if (score >= 60) return { label: "Meaningful Life", msg: "Strong foundations — a few areas could bloom further.", color: "#f0a500" };
  if (score >= 40) return { label: "Growing Awareness", msg: "You're building something real. Keep going.", color: "#5b8dee" };
  if (score >= 20) return { label: "Seeds Planted", msg: "Small acts matter. Every step counts.", color: "#e85d4a" };
  return { label: "Begin Anywhere", msg: "One tiny act today changes tomorrow.", color: "#555" };
}

const Ring = ({ pct, color, size = 52 }) => {
  const r = size * 0.38, circ = 2 * Math.PI * r, dash = (pct / 100) * circ, cx = size / 2, cy = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1a1a" strokeWidth={size * 0.1} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={size * 0.1}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }} />
      <text x={cx} y={cy + 4} textAnchor="middle" fill={color} fontSize={size * 0.18}
        fontWeight="700" fontFamily="'DM Mono',monospace">{pct}</text>
    </svg>
  );
};

export default function App() {
  const [values, setValues] = useState({});
  const [activeTab, setActiveTab] = useState("body");
  const [showResearch, setShowResearch] = useState(null);

  const score = totalScore(values);
  const verdict = getVerdict(score);
  const monetary = computeMonetary(values);
  const activeCat = categories.find(c => c.id === activeTab);

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e0e", color: "#e8e8e8", fontFamily: "'DM Sans', sans-serif", paddingBottom: 60 }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      <div style={{ padding: "36px 22px 0", maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#444", marginBottom: 10 }}>True Value Calculator</div>
        <h1 style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.25, margin: "0 0 8px",
          background: "linear-gradient(130deg, #e8e8e8 0%, #777 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Your life's work<br /><em style={{ fontStyle: "italic" }}>beyond income</em>
        </h1>
        <p style={{ color: "#444", fontSize: 12, lineHeight: 1.7, maxWidth: 340, margin: "0 auto" }}>
          Research-backed estimates of the real value you create — for yourself, your community &amp; the planet.
        </p>
      </div>

      <div style={{ maxWidth: 540, margin: "0 auto", padding: "0 22px" }}>

        {/* Big ring */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "24px 0 16px" }}>
          <div style={{ position: "relative", width: 150, height: 150 }}>
            {(() => {
              const r = 60, circ = 2 * Math.PI * r, dash = (score / 100) * circ;
              return (
                <svg width="150" height="150" viewBox="0 0 150 150">
                  <circle cx="75" cy="75" r={r} fill="none" stroke="#1a1a1a" strokeWidth="11" />
                  <circle cx="75" cy="75" r={r} fill="none" stroke={verdict.color} strokeWidth="11"
                    strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 75 75)"
                    style={{ transition: "stroke-dasharray 1s cubic-bezier(.4,0,.2,1)" }} />
                </svg>
              );
            })()}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 38, fontWeight: 800, color: verdict.color, fontFamily: "'DM Mono',monospace", lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: 10, color: "#444", letterSpacing: 2, textTransform: "uppercase" }}>/100</span>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: verdict.color, fontFamily: "'Playfair Display',serif" }}>{verdict.label}</div>
            <div style={{ fontSize: 12, color: "#555", marginTop: 3 }}>{verdict.msg}</div>
          </div>
        </div>

        {/* Monetary banner */}
        {monetary > 0 && (
          <div style={{ background: "#111", border: "1px solid #3dba6f2a", borderRadius: 12,
            padding: "12px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#3dba6f66", marginBottom: 3 }}>Estimated annual real value</div>
              <div style={{ fontSize: 22, fontFamily: "'DM Mono',monospace", color: "#3dba6f", fontWeight: 700 }}>
                CHF {monetary.toLocaleString("de-CH")}
              </div>
            </div>
            <div style={{ fontSize: 10, color: "#333", maxWidth: 130, textAlign: "right", lineHeight: 1.5 }}>
              Swiss replacement costs &amp; research benchmarks
            </div>
          </div>
        )}

        {/* Mini category rings */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, background: "#111", borderRadius: 14, padding: "10px 8px" }}>
          {categories.map(cat => {
            const s = Math.round(catScore(cat, values) * 100);
            return (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)}
                style={{ flex: 1, background: "none", border: "none", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 2px",
                  borderRadius: 8, outline: activeTab === cat.id ? `2px solid ${cat.color}` : "2px solid transparent",
                  transition: "outline 0.2s" }}>
                <Ring pct={s} color={cat.color} size={50} />
                <span style={{ fontSize: 14, lineHeight: 1 }}>{cat.emoji}</span>
              </button>
            );
          })}
        </div>

        {/* Active category */}
        <div style={{ background: "#111", borderRadius: 16, border: `1px solid ${activeCat.color}1a`, marginBottom: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid #1a1a1a",
            display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{activeCat.emoji}</span>
              <div>
                <div style={{ fontWeight: 600, color: activeCat.color, fontSize: 13 }}>{activeCat.label}</div>
                <div style={{ fontSize: 10, color: "#3a3a3a" }}>{activeCat.description}</div>
              </div>
            </div>
            <button onClick={() => setShowResearch(r => r === activeCat.id ? null : activeCat.id)}
              style={{ background: "none", border: `1px solid ${activeCat.color}44`, borderRadius: 6,
                padding: "3px 8px", fontSize: 9, color: activeCat.color + "cc", cursor: "pointer",
                letterSpacing: 1.5, textTransform: "uppercase" }}>
              {showResearch === activeCat.id ? "Hide" : "Sources"}
            </button>
          </div>

          {showResearch === activeCat.id && (
            <div style={{ padding: "10px 16px", background: `${activeCat.color}06`,
              borderBottom: "1px solid #1a1a1a", fontSize: 11, color: "#666",
              lineHeight: 1.7, fontStyle: "italic" }}>
              {activeCat.research}
            </div>
          )}

          <div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
            {activeCat.activities.map(act => {
              const val = values[act.id] || 0;
              const pct = Math.min(100, Math.round((val / (act.max * 0.6)) * 100));
              return (
                <div key={act.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div style={{ flex: 1, paddingRight: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "#ccc" }}>{act.label}</div>
                      <div style={{ fontSize: 10, color: "#2f2f2f", marginTop: 1 }}>{act.tip}</div>
                      {val > 0 && (
                        <div style={{ fontSize: 10, color: act.monetaryFn ? activeCat.color : "#3a3a3a",
                          marginTop: 3, opacity: act.monetaryFn ? 0.85 : 0.6 }}>
                          {act.monetaryFn ? "≈ " : ""}{act.monetaryLabel(val)}
                        </div>
                      )}
                    </div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11,
                      color: pct > 0 ? activeCat.color : "#2a2a2a", minWidth: 30, textAlign: "right" }}>
                      {val > 0 ? val : "—"}
                    </div>
                  </div>
                  <div style={{ height: 4, background: "#1a1a1a", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99,
                      background: `linear-gradient(90deg, ${activeCat.color}55, ${activeCat.color})`,
                      transition: "width 0.4s cubic-bezier(.4,0,.2,1)" }} />
                  </div>
                  <input type="range" min={0} max={act.max} step={act.max > 10 ? 1 : 0.5}
                    value={val}
                    onChange={e => setValues(v => ({ ...v, [act.id]: parseFloat(e.target.value) }))}
                    style={{ width: "100%", marginTop: 4, accentColor: activeCat.color, cursor: "pointer" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#222" }}>
                    <span>0</span><span style={{ color: "#2a2a2a" }}>{act.unit}</span><span>{act.max}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nav pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)}
              style={{ padding: "6px 12px", borderRadius: 99, fontSize: 11, fontWeight: 500,
                border: `1px solid ${activeTab === cat.id ? cat.color : "#1e1e1e"}`,
                background: activeTab === cat.id ? `${cat.color}14` : "transparent",
                color: activeTab === cat.id ? cat.color : "#3a3a3a",
                cursor: "pointer", transition: "all 0.2s" }}>
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: 10, color: "#222", padding: "20px 0 40px", lineHeight: 1.7 }}>
          Built with care in Switzerland
        </div>
      </div>
    </div>
  );
}
