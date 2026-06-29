#!/bin/bash
# Optimize hero/state/guide JPGs into WebP at multiple sizes.
# Outputs to /public/img/ with the same basename but .webp suffix + size suffix.

set -e

cd /workspace/sunledger-site/public/img

# Sizes for srcset. Hero uses 1920w max, content cards use 1024w max.
# We produce 480 / 1024 / 1920 variants for hero/large, 480 / 768 for cards.
declare -A TARGETS
# name:width_heights
TARGETS["hero-home"]="1920 1024 640"
TARGETS["hero-guides"]="1920 1024 640"
TARGETS["hero-states-west"]="1920 1024 640"
TARGETS["hero-states-south"]="1920 1024 640"
TARGETS["hero-states-midwest"]="1920 1024 640"
TARGETS["hero-states-northeast"]="1920 1024 640"
TARGETS["pillar-how-solar-works"]="1920 1024 640"
TARGETS["pillar-costs"]="1920 1024 640"
TARGETS["pillar-incentives"]="1920 1024 640"
TARGETS["pillar-equipment"]="1920 1024 640"
TARGETS["pillar-battery"]="1920 1024 640"
TARGETS["pillar-going-solar"]="1920 1024 640"
TARGETS["pillar-default"]="1920 1024 640"
TARGETS["state-california"]="1920 1024 640"
TARGETS["state-texas"]="1920 1024 640"
TARGETS["state-florida"]="1920 1024 640"
TARGETS["state-arizona"]="1920 1024 640"
TARGETS["state-new-york"]="1920 1024 640"
TARGETS["state-massachusetts"]="1920 1024 640"
TARGETS["state-default"]="1920 1024 640"
TARGETS["guide-ev-charging"]="1200 768 480"
TARGETS["guide-utility-bill"]="1200 768 480"
TARGETS["guide-inverter"]="1200 768 480"
TARGETS["guide-battery"]="1200 768 480"
TARGETS["guide-installation"]="1200 768 480"
TARGETS["guide-ground-mount"]="1200 768 480"
TARGETS["guide-finance"]="1200 768 480"
TARGETS["guide-lease-ppa"]="1200 768 480"
TARGETS["guide-tax-credit"]="1200 768 480"
TARGETS["about-cta"]="1920 1024 640"
TARGETS["hero-cta"]="1920 1024 640"
TARGETS["og-default"]="1200 640"

mkdir -p optimized

count=0
for name in "${!TARGETS[@]}"; do
  sizes="${TARGETS[$name]}"
  for w in $sizes; do
    # 16:9 default aspect
    h=$(( w * 9 / 16 ))
    out="optimized/${name}-${w}w.webp"
    if [ ! -f "$out" ] && [ -f "${name}.jpg" ]; then
      convert "${name}.jpg" -resize "${w}x${h}" -quality 78 -define webp:method=6 -strip "$out"
      count=$((count + 1))
    fi
  done
done

# Also produce a JPG version at the largest size (for browsers without WebP fallback).
for name in "${!TARGETS[@]}"; do
  sizes=(${TARGETS[$name]})
  max_w=${sizes[0]}
  out="optimized/${name}-${max_w}w.jpg"
  if [ ! -f "$out" ] && [ -f "${name}.jpg" ]; then
    h=$(( max_w * 9 / 16 ))
    convert "${name}.jpg" -resize "${max_w}x${h}" -quality 78 -strip "$out"
  fi
done

echo "optimized $count webp files"
ls -la optimized/ | head -20
echo "---"
echo "total optimized:"
du -sh optimized/