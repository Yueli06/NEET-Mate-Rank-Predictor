const scriptURL = 'https://script.google.com/macros/s/AKfycbyFM2N8mVw8esswlJbU3n3onqAtDs6C5J-JiJEsCY7kr0Mr94mouwE0CDF0zcYkHw-m/exec';

const rankTable = {
  720: [1, 1, 1], 715: [10, 15, 20], 710: [50, 80, 100], 700: [150, 200, 300],
  690: [300, 400, 600], 680: [500, 700, 1000], 670: [800, 1200, 1800],
  660: [1200, 1800, 2500], 650: [1800, 2500, 3500], 640: [2500, 3500, 5000],
  630: [3500, 5000, 7000], 620: [5000, 7000, 10000], 610: [7000, 10000, 13000],
  600: [9000, 12000, 15000], 590: [11000, 14000, 18000], 580: [13000, 16000, 21000],
  570: [15000, 18000, 24000], 560: [17000, 20000, 27000], 550: [19000, 22000, 30000],
  540: [21000, 24000, 33000], 530: [23000, 26000, 36000], 520: [25000, 28000, 39000],
  510: [27000, 30000, 42000], 500: [29000, 32000, 45000], 490: [31000, 34000, 48000],
  480: [33000, 36000, 51000], 470: [35000, 38000, 54000], 460: [37000, 40000, 57000],
  450: [39000, 42000, 60000], 440: [41000, 44000, 63000], 430: [43000, 46000, 66000],
  420: [45000, 48000, 69000], 410: [47000, 50000, 72000], 400: [49000, 52000, 75000],
  390: [51000, 54000, 78000], 380: [53000, 56000, 81000], 370: [55000, 58000, 84000],
  360: [57000, 60000, 87000], 350: [59000, 62000, 90000], 340: [61000, 64000, 93000],
  330: [63000, 66000, 96000], 320: [65000, 68000, 99000], 310: [67000, 70000, 102000],
  300: [69000, 72000, 105000], 290: [71000, 74000, 108000], 280: [73000, 76000, 111000],
  270: [75000, 78000, 114000], 260: [77000, 80000, 117000], 250: [79000, 82000, 120000],
  240: [81000, 84000, 123000], 230: [83000, 86000, 126000], 220: [85000, 88000, 129000],
  210: [87000, 90000, 132000], 200: [89000, 92000, 135000], 190: [91000, 94000, 138000],
  180: [93000, 96000, 141000], 170: [95000, 98000, 144000], 160: [97000, 100000, 147000],
  150: [99000, 102000, 150000], 140: [101000, 104000, 153000], 130: [103000, 106000, 156000],
  120: [105000, 108000, 159000], 110: [107000, 110000, 162000], 100: [109000, 112000, 165000]
};

async function submitScore() {
  const name = document.getElementById('name').value.trim();
  const score = parseInt(document.getElementById('score').value.trim(), 10);
  const difficulty = document.getElementById('difficulty').value;
  const rankDiv = document.getElementById('rankDisplay');
  rankDiv.style.display = "none";

  if (!name || isNaN(score) || !difficulty) {
    alert("Please enter all fields correctly.");
    return;
  }

  const clampedScore = Math.max(100, Math.min(720, score));
  const closestScore = Object.keys(rankTable).reverse().find(s => clampedScore >= s);
  let rank = 'N/A';

  if (closestScore) {
    const index = difficulty === 'easy' ? 0 : difficulty === 'moderate' ? 1 : 2;
    rank = rankTable[closestScore][index];
  }

  // Try to send data to Google Sheets (optional)
  try {
    await fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify({ name, score, rank }),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Your rank was predicted, but it couldn't be saved to the sheet.");
  }

  // Show the result even if fetch fails
  rankDiv.style.display = "block";
  rankDiv.innerHTML = `
    <div class="rank-card">
      <h3>Rank Prediction Result</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Score:</strong> ${score}</p>
      <p><strong>Difficulty:</strong> ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
      <p><strong>Predicted Rank:</strong> #${rank}</p>
    </div>
  `;
}
