import type { KeyStatistics } from "src/types/statistics";

export function generateSEOHTMLTemplatestatistics(statistics: KeyStatistics) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Keyboard Statistics Tracker - Real-time Typing Analytics</title>
        <meta name="description" content="Track your keyboard usage in real-time. View typing statistics, key frequency, and typing speed analytics. Total presses: ${statistics.totalPresses}">
        <style>
            body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
            .stat-card { background: #f8f9fa; padding: 20px; border-radius: 6px; text-align: center; }
            .stat-value { font-size: 2em; font-weight: bold; color: #2563eb; }
            .stat-label { color: #6b7280; margin-top: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Keyboard Statistics Tracker</h1>
                <p>Real-time tracking of keyboard usage and typing analytics</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${statistics.totalPresses}</div>
                    <div class="stat-label">Total Key Presses</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${statistics.pressesPerMinute}</div>
                    <div class="stat-label">Presses Per Minute</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${statistics.uniqueKeys}</div>
                    <div class="stat-label">Unique Keys Used</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${statistics.mostPressedKey || "None"}</div>
                    <div class="stat-label">Most Pressed Key</div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}
