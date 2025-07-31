import os
import requests
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()
GITHUB_API_URL = "https://api.github.com"
REPO = "Adarsh-Chaubey03/TravelGrid"
CONTRIB_FILE = "Contributor-data.md"

def get_github_token() -> str:
    """Fetch the GitHub token from environment variables."""
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        raise EnvironmentError("GITHUB_TOKEN not found in environment variables.")
    return token

def github_api_get(endpoint: str, params: dict = None) -> dict:
    """Make an authenticated GET request to the GitHub API."""
    headers = {"Authorization": f"token {get_github_token()}", "Accept": "application/vnd.github.v3+json"}
    response = requests.get(f"{GITHUB_API_URL}{endpoint}", headers=headers, params=params)
    response.raise_for_status()
    return response.json()

def fetch_contributors() -> List[Dict]:
    """Fetch contributors for the repository."""
    contributors = github_api_get(f"/repos/{REPO}/contributors")
    return contributors

def fetch_pull_requests() -> List[Dict]:
    """Fetch all pull requests for the repository (open and closed)."""
    prs = []
    page = 1
    while True:
        params = {"state": "all", "per_page": 100, "page": page}
        batch = github_api_get(f"/repos/{REPO}/pulls", params=params)
        if not batch:
            break
        prs.extend(batch)
        page += 1
    return prs

def build_contributor_table(contributors: List[Dict], prs: List[Dict]) -> str:
    """Build the markdown table for contributors."""
    rows = []
    for contrib in contributors:
        name = contrib.get("login", "-")
        handle = f"@{name}"
        # Find PRs by this contributor
        user_prs = [pr for pr in prs if pr.get("user", {}).get("login") == name]
        pr_links = ", ".join(f"[#${pr['number']}]({pr['html_url']})" for pr in user_prs) or "-"
        score = len(user_prs)
        rows.append(f"| {name} | {handle} | {pr_links} | {score} |")
    return "# Contributors\n\n| Name | GitHub Handle | PR Link | Score |\n|------|---------------|---------|-------|\n" + "\n".join(rows) + "\n"

def update_contributor_md(table_md: str):
    """Write the contributor table to the markdown file."""
    with open(CONTRIB_FILE, "w", encoding="utf-8") as f:
        f.write(table_md)

def main():
    """Main function to update Contributor-data.md with GitHub contributors and PRs."""
    print("Fetching contributors...")
    contributors = fetch_contributors()
    print(f"Found {len(contributors)} contributors.")
    print("Fetching pull requests...")
    prs = fetch_pull_requests()
    print(f"Found {len(prs)} pull requests.")
    table_md = build_contributor_table(contributors, prs)
    update_contributor_md(table_md)
    print(f"Updated {CONTRIB_FILE} with contributor data.")

if __name__ == "__main__":
    main()