// AI Maritime Chief Mate & Harbour Master Advisory (via OpenRouter or Fallback Engine)

const OPENROUTER_API_KEY = (typeof window !== 'undefined' && (window.ENV?.OPENROUTER_API_KEY || localStorage.getItem('seavoyage_openrouter_key'))) || "";

export async function generateCaptainAdvisory(locationName, evaluation, marineData) {
  if (!OPENROUTER_API_KEY) {
    return getFallbackAdvisory(locationName, evaluation, marineData);
  }
  const current = marineData.current || {};
  const waveHeight = current.waveHeight !== null ? `${current.waveHeight.toFixed(1)}m` : 'Undetermined';
  const windSpeed = `${Math.round(current.windSpeed)} knots (${evaluation.beaufort.desc})`;
  const windGusts = `${Math.round(current.windGusts)} knots`;
  const swellPeriod = current.swellPeriod ? `${current.swellPeriod}s` : 'N/A';
  const vesselName = evaluation.vessel.name;

  const prompt = `You are a Veteran Ship Captain and Chief Maritime Safety Officer.
Evaluate this marine voyage request:
- Location: ${locationName}
- Vessel: ${vesselName}
- Wave Height: ${waveHeight} (Sea State: ${evaluation.seaState.name})
- Wind Speed: ${windSpeed}, Gusts: ${windGusts}
- Swell Period: ${swellPeriod}
- Evaluated Safety Score: ${evaluation.score}/100
- Official Verdict: ${evaluation.status} (${evaluation.title})

Provide a concise, professional 3-4 sentence Maritime Briefing covering:
1. Nautical assessment of wave/swell behavior for this specific vessel.
2. Direct go/no-go recommendation with primary operational risks.
3. Crucial safety precaution (e.g. reefing sails, VHF channel 16 watch, harbor bar passage, life jacket rules).
Keep the tone authoritative, maritime, and direct.`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Sea Voyage Advisory App"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: [
          { role: "system", content: "You are a seasoned sea captain providing maritime travel recommendations." },
          { role: "user", content: prompt }
        ],
        max_tokens: 280,
        temperature: 0.6
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter returned status ${response.status}`);
    }

    const json = await response.json();
    const message = json.choices?.[0]?.message?.content;
    if (message && message.trim().length > 20) {
      return message.trim();
    }
    throw new Error("Empty AI message response");
  } catch (err) {
    console.warn("AI Captain Advisory fallback:", err.message);
    return getFallbackAdvisory(locationName, evaluation, marineData);
  }
}

function getFallbackAdvisory(locationName, evaluation, marineData) {
  const vessel = evaluation.vessel.name;
  const current = marineData.current || {};
  const wave = current.waveHeight !== null ? current.waveHeight.toFixed(1) : '1.0';
  const wind = Math.round(current.windSpeed || 0);

  if (evaluation.status === 'GO') {
    return `Captain's Log for ${locationName}: Favorable sea conditions prevailing with moderate ${wave}m seas and steady ${wind} knot winds. Safe for departure with ${vessel}. Maintain standard bridge watch, file your float plan, and monitor VHF Ch 16 for routine coastal updates.`;
  } else if (evaluation.status === 'CAUTION') {
    return `Advisory for ${locationName}: Moderate chop and choppy swell (${wave}m) with winds freshening to ${wind} knots. While operable for ${vessel}, expect uncomfortable roll and pitching. Ensure all deck gear is lashed, crew wear PFDs, and exercise extreme caution near exposed shallow shoals.`;
  } else {
    return `HARBOUR MASTER NO-GO WARNING for ${locationName}: Hazardous sea state with severe ${wave}m waves and gusts exceeding safe limits for ${vessel}. High risk of wave inundation or mechanical distress. Cancel or postpone transit until wave energy subsides.`;
  }
}
