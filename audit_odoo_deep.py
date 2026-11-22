import os
import re
import urllib.request
from html.parser import HTMLParser

BASE = "https://senecarte1.odoo.com"
TEAM_DIR = r"c:\Users\hp\Downloads\SEN-E-AGENCE\projets\sen-e-carte-saas\public\images\team"
os.makedirs(TEAM_DIR, exist_ok=True)


class DeepParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.texts = []
        self.imgs = []
        self.iframes = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag in ("script", "style", "noscript", "svg", "header", "nav", "footer"):
            self.skip += 1
        if self.skip == 0:
            if tag == "img" and d.get("src"):
                self.imgs.append((d.get("src"), d.get("alt", "")))
            if tag == "iframe" and d.get("src"):
                self.iframes.append(d.get("src"))

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg", "header", "nav", "footer"):
            self.skip = max(0, self.skip - 1)

    def handle_data(self, data):
        if self.skip == 0:
            s = " ".join(data.split())
            if s and len(s) > 1:
                self.texts.append(s)


def fetch(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=15).read().decode("utf-8", errors="ignore")


report = []
for path in ["/", "/a-propos-de-nous", "/plans-tarifaires", "/comment-ca-marche"]:
    html = fetch(path)
    p = DeepParser()
    p.feed(html)
    yt = sorted(set(re.findall(r"https?://(?:www\.)?(?:youtube\.com|youtu\.be)[^\"'<>\\\s]+", html)))
    report.append(f"=== {path} ===")
    report.append("YOUTUBE: " + ", ".join(yt))
    report.append("IFRAMES: " + ", ".join(p.iframes))
    report.append("TEXT:\n" + " | ".join(p.texts[:120]))
    report.append("IMGS:\n" + "\n".join(f"  {src} ({alt})" for src, alt in p.imgs[:20]))
    report.append("")

out_path = r"c:\Users\hp\Downloads\SEN-E-AGENCE\projets\sen-e-carte-saas\audit_odoo_deep.txt"
with open(out_path, "w", encoding="utf-8") as f:
    f.write("\n".join(report))

print("Deep audit saved ->", out_path)
for block in report:
    if block.startswith(("=== ", "YOUTUBE:", "IFRAMES:")):
        print(block[:300])
