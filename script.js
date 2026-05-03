/**
 * KALI ASTRO PRO - CORE ENGINE v8.5
 * Features: Bulletproof Switcher, Forensic Seed Logic, 1000+ Variants
 */

// 1. தரவுத் தொகுப்புகள் (Data Pools)
const rasis = ["மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்", "சிம்மம்", "கன்னி", "துலாம்", "விருச்சிகம்", "தனுசு", "மகரம்", "கும்பம்", "மீனம்"];
const stars = ["அசுவினி", "பரணி", "கார்த்திகை", "ரோகிணி", "மிருகசீரிடம்", "திருவாதிரை", "புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்", "பூரம்", "உத்திரம்", "அஸ்தம்", "சித்திரை", "சுவாதி", "விசாகம்", "அனுஷம்", "கேட்டை", "மூலம்", "பூராடம்", "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம்", "பூரட்டாதி", "உத்திரட்டாதி", "ரேவதி"];

const palanPool = [
    "தொழில் ரீதியாக புதிய ஒப்பந்தங்கள் கையெழுத்தாகும்.",
    "குடும்பத்தில் நீண்ட நாள் தடையொன்று விலகும்.",
    "பொருளாதார நிலை உயரும், புதிய சொத்து சேர்க்கை உண்டாகும்.",
    "நண்பர்கள் மற்றும் அதிகாரிகளின் உதவி கிடைக்கும்.",
    "கடன் பிரச்சனைகள் படிப்படியாக குறையத் தொடங்கும்.",
    "சுப காரியங்கள் கைகூடும் இனிய சூழல் நிலவும்.",
    "வெளிநாட்டு பயணம் தொடர்பான முயற்சிகள் கைகூடும்.",
    "ஆரோக்கியத்தில் நல்ல முன்னேற்றம் ஏற்படும்.",
    "குழந்தைகளால் மகிழ்ச்சியும் பெருமையும் உண்டாகும்.",
    "தடைபட்ட காரியங்கள் இன்று வேகம் எடுக்கும்.",
    "உத்தியோகத்தில் பதவி உயர்வு அல்லது இடமாற்றம் உண்டாகும்.",
    "வியாபாரத்தில் எதிர்பார்த்த லாபம் இரட்டிப்பாகும்."
];

// 2. தொடக்கநிலை செயல்பாடு (Initialization)
window.onload = () => {
    document.querySelectorAll('.rasi-list').forEach(select => {
        select.innerHTML = '<option value="">ராசியைத் தேர்வு செய்க</option>';
        rasis.forEach(r => {
            let opt = document.createElement('option');
            opt.value = r; opt.innerText = r;
            select.appendChild(opt);
        });
    });

    document.querySelectorAll('.star-list').forEach(select => {
        select.innerHTML = '<option value="">நட்சத்திரம் தேர்வு</option>';
        stars.forEach(s => {
            let opt = document.createElement('option');
            opt.value = s; opt.innerText = s;
            select.appendChild(opt);
        });
    });
};

// 3. தனித்துவமான எண் உருவாக்கும் கருவி (Forensic Seed Logic)
// இதன் மூலம் பெயர், தேதி மாறும்போது பலன்கள் முற்றிலும் மாறும்.
function generateSeed(name, dob, rasi, star = "") {
    let combined = (name + dob + rasi + star).toLowerCase().replace(/\s/g, '');
    let seed = 0;
    for (let i = 0; i < combined.length; i++) {
        seed = ((seed << 5) - seed) + combined.charCodeAt(i);
        seed |= 0; 
    }
    return Math.abs(seed);
}

// 4. புல்லட்ப்ரூப் சுவிட்சர் (Bulletproof Switcher)
function switchMode(mode) {
    // அனைத்து செக்ஷன்களையும் மறைக்கவும்
    const sections = ['dailySection','matchSection','numSection','tarotSection','panchaSection','yearlySection','prasannamSection','horaSection'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.classList.add('hidden');
    });

    // பட்டன்களை ரீசெட் செய்யவும்
    document.querySelectorAll('.m-btn').forEach(b => b.classList.remove('active'));
    
    // ரிசல்ட் ஏரியாவை ரீசெட் செய்யவும்
    document.getElementById('resultArea').classList.add('hidden');
    document.getElementById('yearlyContent').classList.add('hidden');

    // தேர்வு செய்த மோடை காட்டவும்
    const config = {
        'daily': { s: 'dailySection', b: 'm1' },
        'match': { s: 'matchSection', b: 'm2' },
        'num': { s: 'numSection', b: 'm3' },
        'tarot': { s: 'tarotSection', b: 'm4' },
        'pancha': { s: 'panchaSection', b: 'm5' },
        'yearly': { s: 'yearlySection', b: 'm6' },
        'prasannam': { s: 'prasannamSection', b: 'm7' },
        'hora': { s: 'horaSection', b: 'm9' }
    };

    const target = config[mode];
    if(target) {
        document.getElementById(target.s).classList.remove('hidden');
        document.getElementById(target.b).classList.add('active');
    }

    if(mode === 'hora') calculateDetailedHora();
    if(mode === 'pancha') loadDetailedPanchangam();
}

// 5. தினசரி பலன் (Daily Palan) - Personalized
function analyzeAstro() {
    const name = document.getElementById('fullName').value;
    const rasi = document.getElementById('rasi').value;
    const today = new Date().toDateString(); // ஒவ்வொரு நாளும் பலன் மாற

    if (!name || !rasi) return alert("விவரங்களை உள்ளிடவும்");

    let seed = generateSeed(name, today, rasi);
    const index = seed % palanPool.length;
    
    showOutput(name + " - இன்றைய பலன்", "ராசி: " + rasi, palanPool[index]);
}

// 6. திருமண பொருத்தம் (Marriage Match)
function checkCompatibility() {
    const bName = document.getElementById('boyName').value;
    const gName = document.getElementById('girlName').value;
    const bStar = document.getElementById('boyStar').value;
    const gStar = document.getElementById('girlStar').value;

    if (!bName || !gName || !bStar || !gStar) {
        alert("அனைத்து விவரங்களையும் பூர்த்தி செய்யவும்.");
        return;
    }

    const poruthams = ["தின", "கண", "மகேந்திர", "ஸ்த்ரீ தீர்க்க", "யோனி", "ராசி", "ராசியதிபதி", "வசிய", "ரஜ்ஜு", "வேதை"];
    
    let seed = 0;
    const combo = bName + gName + bStar + gStar;
    for (let i = 0; i < combo.length; i++) seed += combo.charCodeAt(i);

    let matchCount = 0;
    let reportHtml = "<div style='text-align:left; margin-top:15px; border:1px solid #ddd; padding:10px; border-radius:10px; background:#fff;'>";
    reportHtml += "<h4 style='text-align:center; color:#0a192f;'>10 பொருத்தங்கள் விவரம்</h4>";
    
    poruthams.forEach((p, i) => {
        const isMatch = (seed + i) % 2 !== 0;
        if (isMatch) matchCount++;
        reportHtml += `<div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding:5px 0;">
            <span>${i+1}. ${p} பொருத்தம்</span>
            <span style="color:${isMatch ? 'green' : 'red'}; font-weight:bold;">${isMatch ? '✅ உண்டு' : '❌ இல்லை'}</span>
        </div>`;
    });
    reportHtml += "</div>";

    const bDosham = (seed % 7 === 0) ? "செவ்வாய் தோஷம்" : "தோஷம் இல்லை";
    const gDosham = (seed % 5 === 0) ? "நாக தோஷம்" : "தோஷம் இல்லை";

    document.getElementById('resTitle').innerText = "திருமண பொருத்தம் அறிக்கை";
    document.getElementById('resStats').innerHTML = `
        <div class="stat">பொருத்தம்: ${matchCount}/10</div>
        <div class="stat">நிலை: ${matchCount >= 7 ? 'உத்தமம்' : 'மத்திமம்'}</div>
        <div class="stat">ஆண் தோஷம்: ${bDosham}</div>
        <div class="stat">பெண் தோஷம்: ${gDosham}</div>
    `;

    document.getElementById('resPara').innerHTML = reportHtml;
    document.getElementById('resultArea').classList.remove('hidden');
    document.getElementById('resultArea').scrollIntoView({ behavior: 'smooth' });
}




// 7. வருடாந்திர பலன் (Yearly Palan) - Forensic Analysis
function calculateYearly() {
    const name = document.getElementById('yName').value;
    const dob = document.getElementById('yDob').value;
    const rasi = document.getElementById('yRasi').value;
    const star = document.getElementById('yStar').value;

    if (!name || !dob || !rasi || !star) return alert("அனைத்து விவரங்களையும் அளிக்கவும்");

    let seed = generateSeed(name, dob, rasi, star);
    const months = ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"];
    
    let html = "";
    months.forEach((m, i) => {
        const gIdx = (seed + (i * 17)) % palanPool.length;
        const cIdx = (seed + (i * 11)) % palanPool.length;

        html += `
            <div class="month-row" style="border-bottom:1.5px solid #eee; padding:12px 0;">
                <b style="color:#d4af37; font-size:15px; display:block; margin-bottom:5px;">${m}:</b> 
                <div style="font-size:13px; line-height:1.5;">
                    <span style="color:#15803d;">✅ நன்மை: ${palanPool[gIdx]}</span><br>
                    <span style="color:#b91c1c;">⚠️ எச்சரிக்கை: ${palanPool[cIdx].split('.')[0]} கவனமாக கையாளவும்.</span>
                </div>
            </div>
        `;
    });

    document.getElementById('resTitle').innerText = name + " - 2026 விரிவான பலன்";
    document.getElementById('resStats').innerHTML = `<div class="stat">ராசி: ${rasi}</div><div class="stat">நட்சத்திரம்: ${star}</div>`;
    document.getElementById('monthlyBreakdown').innerHTML = html;
    document.getElementById('yearlyContent').classList.remove('hidden');
    document.getElementById('resPara').innerText = "";
    document.getElementById('resultArea').classList.remove('hidden');
    document.getElementById('resultArea').scrollIntoView({ behavior: 'smooth' });
}

// 8. டாரோட் ரீடிங் (Fixed Tarot)
function pullTarot() {
    const card = document.getElementById('tarotCard');
    const result = document.getElementById('tarotResult');
    const img = document.getElementById('tarotImg');
    
    card.style.transform = "rotateY(180deg)";
    
    const deck = [
        {name: "சூரியன்", desc: "வெற்றி நிச்சயம்.", img: "https://www.sacred-texts.com/tarot/pkt/img/ar19.jpg"},
        {name: "சக்கரம்", desc: "நல்ல மாற்றம் வரும்.", img: "https://www.sacred-texts.com/tarot/pkt/img/ar10.jpg"},
        {name: "நட்சத்திரம்", desc: "புதிய விடியல்.", img: "https://www.sacred-texts.com/tarot/pkt/img/ar17.jpg"}
    ];
    
    setTimeout(() => {
        const res = deck[Math.floor(Math.random() * deck.length)];
        img.src = res.img;
        document.getElementById('tarotName').innerText = res.name;
        document.getElementById('tarotDesc').innerText = res.desc;
        result.classList.remove('hidden');
        card.style.transform = "rotateY(0deg)";
    }, 600);
}

// 9. சுப & அசுப நேரம் (Hora - High Visibility)
function calculateDetailedHora() {
    document.getElementById('horaDisplay').innerHTML = `
        <h4 style="color:#0a192f; margin-bottom:10px;">சுப நேரங்கள்:</h4>
        <div class="stats-grid" style="display:grid; grid-template-columns:1fr; gap:8px;">
            <div class="stat" style="background:#e2e8f0; color:#0a192f; border:1px solid #0a192f;">நல்ல நேரம்: 09:15 AM - 10:15 AM</div>
            <div class="stat" style="background:#e2e8f0; color:#0a192f; border:1px solid #0a192f;">கௌரி நல்ல நேரம்: 10:45 AM - 11:45 AM</div>
        </div>
        <h4 style="color:#991b1b; margin:15px 0 10px;">அசுப நேரங்கள்:</h4>
        <div class="stats-grid" style="display:grid; grid-template-columns:1fr; gap:8px;">
            <div class="stat" style="background:#fecaca; color:#991b1b; border:1px solid #991b1b;">ராகு காலம்: 04:30 PM - 06:00 PM</div>
            <div class="stat" style="background:#fecaca; color:#991b1b; border:1px solid #991b1b;">எமகண்டம்: 12:00 PM - 01:30 PM</div>
        </div>
    `;
}

// 10. இதர வசதிகள்
function loadDetailedPanchangam() {
    document.getElementById('panData').innerHTML = `
        <div class="stats-grid">
            <div class="stat">திதி: விதியை</div>
            <div class="stat">நட்சத்திரம்: விசாகம்</div>
            <div class="stat">சந்திராஷ்டமம்: அசுவினி</div>
        </div>
    `;
}

function calculateNumerology() {
    const d = document.getElementById('numDob').value;
    if(!d) return alert("தேதியை தேர்வு செய்யவும்");
    const n = d.replace(/-/g, '').split('').reduce((a, b) => a + parseInt(b), 0) % 9 || 9;
    showOutput("எண் கணிதம்", "எண்: " + n, "இந்த எண்ணில் பிறந்த நீங்கள் ஆளுமைத் திறன் மிக்கவர்.");
}

function getPrasannamAnswer() {
    const q = document.getElementById('prasannamQ').value;
    if(!q) return alert("கேள்வியை உள்ளிடவும்");
    const ans = ["ஆம்!", "இப்போது வேண்டாம்.", "வெற்றி நிச்சயம்.", "பொறுமை அவசியம்."];
    showOutput("பிரசன்னம்", "பதில்", ans[new Date().getSeconds() % 4]);
}

function showOutput(title, stat, para) {
    document.getElementById('resTitle').innerText = title;
    document.getElementById('resStats').innerHTML = `<div class="stat" style="grid-column:span 2; background:#e2e8f0; color:#0a192f; border:1px solid #0a192f;">${stat}</div>`;
    document.getElementById('resPara').innerText = para;
    document.getElementById('resultArea').classList.remove('hidden');
    document.getElementById('resultArea').scrollIntoView({ behavior: 'smooth' });
}
