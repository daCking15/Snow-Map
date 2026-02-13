# US Ski Resorts Snow Forecast

An interactive map showing ski resorts across the United States with their 7-day snow forecast.

## Features

- **All US ski resorts** — 300+ resorts from the North American Ski Resorts dataset
- **State filter** — Select by state; map auto-zooms to fit selected resorts with padding
- **Pass filter** — Filter by Epic, Ikon, Indy, or Independent resorts
- **7-day snow forecast** — Daily snowfall totals via Open-Meteo API (loaded when state is selected)
- **Clickable markers** — Popup with day-by-day forecast and pass info

## Running Locally

```bash
# From the project directory
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

## Data Sources

- **Resort data:** [North American Ski Resorts](https://github.com/bryanparthum/north-american-ski-resorts) (GitHub)
- **Weather:** [Open-Meteo](https://open-meteo.com/) (free, no API key)
- **Map:** OpenStreetMap via CARTO Light
