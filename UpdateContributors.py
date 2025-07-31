import os
import requests
from typing import List, Dict
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "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")
GITHUB_API_URL = "https://api.github.com"
REPO = "Adarsh-Chaubey03/TravelGrid"
CONTRIB_FILE = "Contributor-data.md"

def get_github_token() -> str:
    """Retrieve GitHub token from environment or fallback value."""
    token = GITHUB_TOKEN
    if not token or token.startswith("github_pat_"):
        print("Warning: Using hardcoded token or no token found. Set GITHUB_TOKEN in .env for security.")
    return token

def github_api_get(endpoint: str, params: dict = None) -> dict:
    """Perform an authenticated GET request to the GitHub API with error handling."""
    headers = {"Authorization": f"token {get_github_token()}", "Accept": "application/vnd.github.v3+json"}
    try:
        response = requests.get(f"{GITHUB_API_URL}{endpoint}", headers=headers, params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        raise

def fetch_contributors() -> List[Dict]:
    """Fetch the list of contributors from the repository."""
    try:
        contributors = github_api_get(f"/repos/{REPO}/contributors")
        if not contributors:
            print("No contributors found.")
        return contributors
    except Exception as e:
        print(f"Error fetching contributors: {e}")
        return []

def fetch_pull_requests() -> List[Dict]:
    """Fetch all pull requests (open and closed) with pagination."""
    prs = []
    page = 1
    while True:
        params = {"state": "all", "per_page": 100, "page": page}
        try:
            batch = github_api_get(f"/repos/{REPO}/pulls", params=params)
            if not batch:
                break
            prs.extend(batch)
            page += 1
        except Exception:
            break
    return prs

def build_contributor_table(contributors: List[Dict], prs: List[Dict]) -> str:
    """Generate a markdown table of contributors with PR details."""
    rows = []
    for contrib in contributors:
        name = contrib.get("login", "-")
        handle = f"@{name}"
        user_prs = [pr for pr in prs if pr.get("user", {}).get("login") == name]
        pr_links = ", ".join(f"[#{pr['number']}]({pr['html_url']})" for pr in user_prs) if user_prs else "-"
        score = len(user_prs)
        rows.append(f"| {name} | {handle} | {pr_links} | {score} |")
    
    table_header = "# Contributors\n\n| Name | GitHub Handle | PR Link | Score |\n|------|---------------|---------|-------|\n"
    return table_header + "\n".join(rows) + "\n"

def update_contributor_md(table_md: str):
    """Update the contributor markdown file with the generated table."""
    try:
        with open(CONTRIB_FILE, "w", encoding="utf-8") as f:
            f.write(table_md)
        print(f"Successfully updated {CONTRIB_FILE}.")
    except IOError as e:
        print(f"Error writing to {CONTRIB_FILE}: {e}")

def main():
    """Main function to fetch and update contributor data."""
    print("Starting contributor update process...")
    contributors = fetch_contributors()
    prs = fetch_pull_requests()
    table_md = build_contributor_table(contributors, prs)
    update_contributor_md(table_md)
    print("Contributor update process completed.")

if __name__ == "__main__":
    main()
