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
    print(f"DEBUG: GITHUB_TOKEN loaded: {'*' * len(token) if token else 'None'}") # Mask token for security
    return token

def github_api_get(endpoint: str, params: dict = None) -> dict:
    """Make an authenticated GET request to the GitHub API."""
    headers = {"Authorization": f"token {get_github_token()}", "Accept": "application/vnd.github.v3+json"}
    print(f"DEBUG: Making GET request to {GITHUB_API_URL}{endpoint} with params {params}")
    response = requests.get(f"{GITHUB_API_URL}{endpoint}", headers=headers, params=params)
    response.raise_for_status()
    print(f"DEBUG: Response status: {response.status_code}")
    return response.json()

def fetch_contributors() -> List[Dict]:
    """Fetch contributors for the repository."""
    contributors = github_api_get(f"/repos/{REPO}/contributors")
    print(f"DEBUG: Fetched {len(contributors)} contributors.")
    # print(f"DEBUG: Contributors data: {contributors}") # Uncomment for full data inspection
    return contributors

def fetch_pull_requests() -> List[Dict]:
    """Fetch all pull requests for the repository (open and closed)."""
    prs = []
    page = 1
    while True:
        params = {"state": "all", "per_page": 100, "page": page}
        print(f"DEBUG: Fetching PR page {page}...")
        batch = github_api_get(f"/repos/{REPO}/pulls", params=params)
        if not batch:
            print(f"DEBUG: No more PRs found after page {page}.")
            break
        prs.extend(batch)
        print(f"DEBUG: Added {len(batch)} PRs from page {page}. Total PRs so far: {len(prs)}")
        page += 1
    print(f"DEBUG: Fetched {len(prs)} total pull requests.")
    # print(f"DEBUG: PRs data: {prs}") # Uncomment for full data inspection
    return prs

def build_contributor_table(contributors: List[Dict], prs: List[Dict]) -> str:
    """Build the markdown table for contributors."""
    rows = []
    for contrib in contributors:
        name = contrib.get("login", "-")
        handle = f"@{name}"
        user_prs = [pr for pr in prs if pr.get("user", {}).get("login") == name]
        pr_links = ", ".join(f"[#{pr['number']}]({pr['html_url']})" for pr in user_prs) or "-"
        score = len(user_prs)
        rows.append(f"| {name} | {handle} | {pr_links} | {score} |")
        print(f"DEBUG: Processed contributor {name}. PRs: {len(user_prs)}, Score: {score}")

    table_header = "# Contributors\n\n| Name | GitHub Handle | PR Link | Score |\n|------|---------------|---------|-------|\n"
    table_content = "\n".join(rows)
    
    print(f"DEBUG: Generated Markdown Table Content:\n{table_content}")
    
    return table_header + table_content + "\n"

def update_contributor_md(table_md: str):
    """Write the contributor table to the markdown file."""
    print(f"DEBUG: Writing content to {CONTRIB_FILE}")
    with open(CONTRIB_FILE, "w", encoding="utf-8") as f:
        f.write(table_md)
    print(f"DEBUG: Finished writing to {CONTRIB_FILE}.")

def main():
    """Main function to update Contributor-data.md with GitHub contributors and PRs."""
    try:
        print("Fetching contributors...")
        contributors = fetch_contributors()
        print(f"Found {len(contributors)} contributors.")
        
        print("Fetching pull requests...")
        prs = fetch_pull_requests()
        print(f"Found {len(prs)} pull requests.")
        
        table_md = build_contributor_table(contributors, prs)
        update_contributor_md(table_md)
        print(f"Successfully updated {CONTRIB_FILE} with contributor data.")
    except EnvironmentError as e:
        print(f"Error: {e}")
    except requests.exceptions.RequestException as e:
        print(f"API Request Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()