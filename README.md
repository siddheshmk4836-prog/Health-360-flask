# Health360 Flask Website

Responsive healthcare analytics prototype built with Python, Flask, HTML/CSS and Plotly.js.

## Run locally
1. Install Python 3.10+.
2. Open a terminal in this folder.
3. Run `py -m venv .venv` and `.venv\\Scripts\\activate` on Windows (or `python3 -m venv .venv` and `source .venv/bin/activate` on macOS/Linux).
4. Run `pip install -r requirements.txt`.
5. Run `python app.py`.
6. Open http://127.0.0.1:5000.

## Included
- `/` interactive dashboard with KPIs, filters and charts
- `/story` guided narrative page
- `/tableau` links and embedded Tableau dashboard
- `/api/health-data` JSON endpoint

## Use your own data
Add `data/health_data.csv` with exact columns:
`age_group,condition,risk_level,cases,region`

Example row:
`45–59,Diabetes,High,412,Central`

**Important:** The built-in data is illustrative only and must not be presented as real clinical findings. Replace it with the dataset behind your Tableau project. Adjust filter options in `templates/dashboard.html` if your actual categories differ.

The charts load Plotly.js from a CDN and need internet access. Tableau embedding may be restricted by the source view; direct links are also provided.

## Tableau Public dashboard
[Health360 Comprehensive Healthcare Risk & Disease Analytics](https://public.tableau.com/views/Health360_ComprehensiveHealthcareRiskDiseaseAnalytics/SmartHealthcareAnalyticsPatientRiskLifestyleInsights?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link)
