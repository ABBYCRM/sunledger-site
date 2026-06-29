#!/bin/bash
# Post-build cleanup: delete unused master JPGs from /public/img so the static deploy
# only ships optimized responsive variants. The masters remain in our local source tree
# (re-generatable) but the deployed artifact stays lean.

set -e

cd /workspace/sunledger-site

# Remove masters from both source and built output
echo "removing unused master JPGs from public/img and out/img..."
find public/img -maxdepth 1 -name "*.jpg" -delete
find out/img -maxdepth 1 -name "*.jpg" -delete 2>/dev/null || true

# Confirm
echo "remaining under public/img:"
ls public/img/
echo "---"
echo "remaining under out/img:"
ls out/img/
echo "---"
echo "total size:"
du -sh out/