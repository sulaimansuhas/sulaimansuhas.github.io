#!/usr/bin/env bash
# Download the latest resume build from the private resume-repo release into
# the places the site reads them from:
#   static/resume.pdf                      -> served at /resume.pdf
#   content/resume/resume.json             -> rendered as HTML on /resume
#
# Needs the gh CLI, authenticated (gh auth login) or with GH_TOKEN set.
# Locally, a failed download is a warning and any previously fetched files are
# kept. In CI (CI=true) a failed download fails the build.
set -euo pipefail
cd "$(dirname "$0")/.."

REPO="${RESUME_REPO:-sulaimansuhas/resume-repo}"
have_all() { [ -f static/resume.pdf ] && [ -f content/resume/resume.json ]; }

fail_or_warn() {
  if [ "${CI:-}" = "true" ]; then echo "fetch-resume: $1" >&2; exit 1; fi
  if have_all; then echo "fetch-resume: $1; keeping existing files" >&2; exit 0; fi
  echo "fetch-resume: $1; resume page will show as unavailable" >&2; exit 0
}

command -v gh >/dev/null 2>&1 || fail_or_warn "gh CLI not installed"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
if ! gh release download latest --repo "$REPO" --dir "$tmp" \
      --pattern resume.pdf --pattern resume.json 2>"$tmp/err"; then
  fail_or_warn "download from $REPO failed: $(cat "$tmp/err")"
fi

mkdir -p static content/resume
cp "$tmp/resume.pdf" static/resume.pdf
cp "$tmp/resume.json" content/resume/resume.json
echo "fetch-resume: updated static/resume.pdf and content/resume/resume.json from $REPO"
