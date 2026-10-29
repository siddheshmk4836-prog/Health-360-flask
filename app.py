from flask import Flask, render_template, jsonify, request
import csv, os

app = Flask(__name__)

DEMO_DATA = [
 {"age_group":"18–29","condition":"Diabetes","risk_level":"Low","cases":125,"region":"Central"},
 {"age_group":"30–44","condition":"Diabetes","risk_level":"Medium","cases":248,"region":"Central"},
 {"age_group":"45–59","condition":"Diabetes","risk_level":"High","cases":412,"region":"Central"},
 {"age_group":"60+","condition":"Diabetes","risk_level":"High","cases":365,"region":"Central"},
 {"age_group":"18–29","condition":"Cardiovascular","risk_level":"Low","cases":92,"region":"North"},
 {"age_group":"30–44","condition":"Cardiovascular","risk_level":"Medium","cases":186,"region":"North"},
 {"age_group":"45–59","condition":"Cardiovascular","risk_level":"High","cases":331,"region":"North"},
 {"age_group":"60+","condition":"Cardiovascular","risk_level":"High","cases":428,"region":"North"},
 {"age_group":"18–29","condition":"Respiratory","risk_level":"Low","cases":155,"region":"South"},
 {"age_group":"30–44","condition":"Respiratory","risk_level":"Medium","cases":221,"region":"South"},
 {"age_group":"45–59","condition":"Respiratory","risk_level":"High","cases":277,"region":"South"},
 {"age_group":"60+","condition":"Respiratory","risk_level":"Medium","cases":243,"region":"South"},
 {"age_group":"18–29","condition":"Hypertension","risk_level":"Low","cases":178,"region":"West"},
 {"age_group":"30–44","condition":"Hypertension","risk_level":"Medium","cases":293,"region":"West"},
 {"age_group":"45–59","condition":"Hypertension","risk_level":"High","cases":390,"region":"West"},
 {"age_group":"60+","condition":"Hypertension","risk_level":"High","cases":451,"region":"West"},
]

def get_data():
    path = os.path.join(app.root_path, "data", "health_data.csv")
    if os.path.exists(path):
        with open(path, newline="", encoding="utf-8-sig") as f:
            return list(csv.DictReader(f))
    return DEMO_DATA

@app.route("/")
def dashboard():
    return render_template("dashboard.html")

@app.route("/story")
def story():
    return render_template("story.html")

@app.route("/tableau")
def tableau():
    return render_template("tableau.html")

@app.route("/api/health-data")
def health_data():
    rows = get_data()
    for key in ("condition", "region", "risk_level"):
        value = request.args.get(key, "All")
        if value != "All":
            field = "risk_level" if key == "risk_level" else key
            rows = [r for r in rows if r.get(field) == value]
    for row in rows:
        try: row["cases"] = int(float(row.get("cases", 0)))
        except (TypeError, ValueError): row["cases"] = 0
    return jsonify(rows)

if __name__ == "__main__":
    app.run(debug=True)
