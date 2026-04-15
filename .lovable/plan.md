

## Plan: Restructure Cross-Model Visual Comparison with Category Tabs

### Overview
Restructure the Cross-Model Visual Comparison section to support 4 categories (Novel, IP-Presentation, Distinctive, SISO) as top-level tabs, with character groups inside each category. The uploaded 7 videos (Fly Bird) will be the first group under "Novel".

### Structure

```text
Cross-Model Visual Comparison
├── [Novel] [IP-Presentation] [Distinctive] [SISO]  ← top-level tabs
│
└── Novel (active)
    ├── Character selector: [Fly Bird] [Character 2] ...
    └── Video grid (7 models side by side)
```

### Steps

1. **Copy 7 uploaded videos** to `public/dataset-videos/` with appropriate names (e.g., `fp_bird.mp4`, `seedance_bird.mp4`, etc.)

2. **Restructure `CrossModelComparison.tsx`**:
   - Add a top-level category selector with 4 tabs: Novel, IP-Presentation, Distinctive, SISO
   - Each category contains its own list of comparison sets (character groups)
   - Move existing Rex/Obsidian/Milo data as placeholder entries (or remove them for now)
   - Add "Fly Bird" as the first group under Novel with 7 videos:
     - Seedance-Pro → `seedance_bird.mp4`
     - Veo 3.1 → `veo_bird.mp4`
     - Kling 2.6 → `kling_bird.mp4`
     - Sora 2 Pro → `sora_bird.mp4`
     - Framepack → `fp_bird.mp4`
     - HunyuanVideo → `hy_bird.mp4`
     - Wan 2.2 → `wan_bird.mp4`
   - Keep existing video grid layout and styling

3. **UI Layout**: Category tabs (styled as pill buttons or tab bar) above the character selector, maintaining the current visual style.

### Technical Details
- Data structure changes from flat `ComparisonSet[]` to `Category → ComparisonSet[]` mapping
- Two levels of state: `activeCategory` and `activeSet`
- Categories with no data yet (IP-Presentation, Distinctive, SISO) will show a placeholder message

