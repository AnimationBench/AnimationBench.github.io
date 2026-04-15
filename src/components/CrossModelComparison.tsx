import { useState } from "react";
import { motion } from "framer-motion";


interface IpDescription {
  appearance: string;
  motionLogic: string;
  personality: string;
}

interface ComparisonSet {
  id: string;
  character: string;
  prompt: string;
  ipDescription?: IpDescription;
  videos: { model: string; src: string }[];
}

interface Category {
  id: string;
  label: string;
  sets: ComparisonSet[];
}

const categories: Category[] = [
  {
    id: "novel",
    label: "Novel",
    sets: [
      {
        id: "fly-bird",
        character: "Fly Bird",
        prompt: "Flocks of birds constantly change formations in the sky, creating various patterns.",
        videos: [
          { model: "Seedance-Pro", src: "/dataset-videos/seedance_bird.mp4" },
          { model: "Veo 3.1", src: "/dataset-videos/veo_bird.mp4" },
          { model: "Kling 2.6", src: "/dataset-videos/kling_bird.mp4" },
          { model: "Sora 2 Pro", src: "/dataset-videos/sora_bird.mp4" },
          { model: "Framepack", src: "/dataset-videos/fp_bird.mp4" },
          { model: "HunyuanVideo", src: "/dataset-videos/hy_bird.mp4" },
          { model: "Wan 2.2", src: "/dataset-videos/wan_bird.mp4" },
          { model: "Seedance2.0", src: "/dataset-videos/seedance2.0_bird.mp4" },
        ],
      },
      {
        id: "white-fox",
        character: "White Fox",
        prompt: "Skiers performed a series of complex and thrilling skiing stunts on the steep slopes.",
        videos: [
          { model: "Seedance-Pro", src: "/dataset-videos/seedance_skiing.mp4" },
          { model: "Veo 3.1", src: "/dataset-videos/veo_skiing.mp4" },
          { model: "Kling 2.6", src: "/dataset-videos/kling_skiing.mp4" },
          { model: "Sora 2 Pro", src: "/dataset-videos/sora_skiing.mp4" },
          { model: "Framepack", src: "/dataset-videos/fp_skiing.mp4" },
          { model: "HunyuanVideo", src: "/dataset-videos/hy_skiing.mp4" },
          { model: "Wan 2.2", src: "/dataset-videos/wan_skiing.mp4" },
          { model: "Seedance2.0", src: "/dataset-videos/seedance2.0_skiing.mp4" },
        ],
      },
    ],
  },
  {
    id: "ip-presentation",
    label: "IP-Presentation",
    sets: [
      {
        id: "chomp",
        character: "Chomp",
        prompt: "Shark Chomp plays with a blue and yellow striped ball, with a small brown box nearby.",
        ipDescription: {
          appearance: "Has a dorsal fin on the back; uses fins instead of hands to interact with objects; no fingers.",
          motionLogic: "Interacts with objects using fins — touching, pushing, and gripping; moves by hopping forward.",
          personality: "Cheerful and always grinning wide; upbeat and positive; expresses joy through bouncy, hopping movements.",
        },
        videos: [
          { model: "Seedance-Pro", src: "/dataset-videos/seedance_chomp.mp4" },
          { model: "Veo 3.1", src: "/dataset-videos/veo_chomp.mp4" },
          { model: "Kling 2.6", src: "/dataset-videos/kling_chomp.mp4" },
          { model: "Sora 2 Pro", src: "/dataset-videos/sora_chomp.mp4" },
          { model: "Framepack", src: "/dataset-videos/fp_chomp.mp4" },
          { model: "HunyuanVideo", src: "/dataset-videos/hy_chomp.mp4" },
          { model: "Wan 2.2", src: "/dataset-videos/wan_chomp.mp4" },
          { model: "Seedance2.0", src: "/dataset-videos/seedance2.0_chomp.mp4" },
        ],
      },
    ],
  },
  {
    id: "distinctive",
    label: "Distinctive",
    sets: [
      {
        id: "fox-explorer",
        character: "Fox Explorer",
        prompt: "The character instantly shifts from 3D to a 2D paper figure, then sticks to the ground and moves.",
        videos: [
          { model: "Seedance-Pro", src: "/dataset-videos/seedance_common14.mp4" },
          { model: "Veo 3.1", src: "/dataset-videos/veo_common14.mp4" },
          { model: "Kling 2.6", src: "/dataset-videos/kling_common14.mp4" },
          { model: "Sora 2 Pro", src: "/dataset-videos/sora_common14.mp4" },
          { model: "Framepack", src: "/dataset-videos/fp_common14.mp4" },
          { model: "HunyuanVideo", src: "/dataset-videos/hy_common14.mp4" },
          { model: "Wan 2.2", src: "/dataset-videos/wan_common14.mp4" },
          { model: "Seedance2.0", src: "/dataset-videos/seedance2.0_common14.mp4" },
        ],
      },
      {
        id: "rope-gan",
        character: "Rope Gan",
        prompt: "The barrel of the rifle held by the character becomes pliable, dangling like a rope.",
        videos: [
          { model: "Seedance-Pro", src: "/dataset-videos/seedance_gun2.mp4" },
          { model: "Veo 3.1", src: "/dataset-videos/veo_gun2.mp4" },
          { model: "Kling 2.6", src: "/dataset-videos/kling_gun2.mp4" },
          { model: "Sora 2 Pro", src: "/dataset-videos/sora_gun2.mp4" },
          { model: "Framepack", src: "/dataset-videos/fp_gun2.mp4" },
          { model: "HunyuanVideo", src: "/dataset-videos/hy_gun2.mp4" },
          { model: "Wan 2.2", src: "/dataset-videos/wan_gun2.mp4" },
          { model: "Seedance2.0", src: "/dataset-videos/seedance2.0_gun2.mp4" },
        ],
      },
      {
        id: "cat-pool",
        character: "Cat Pool",
        prompt: "The character dives from the pool, but the water in the pool turns solid, causing them to crash heavily into it.",
        videos: [
          { model: "Seedance-Pro", src: "/dataset-videos/seedance_pool1.mp4" },
          { model: "Veo 3.1", src: "/dataset-videos/veo_pool1.mp4" },
          { model: "Kling 2.6", src: "/dataset-videos/kling_pool1.mp4" },
          { model: "Sora 2 Pro", src: "/dataset-videos/sora_pool1.mp4" },
          { model: "Framepack", src: "/dataset-videos/fp_pool1.mp4" },
          { model: "HunyuanVideo", src: "/dataset-videos/hy_pool1.mp4" },
          { model: "Wan 2.2", src: "/dataset-videos/wan_pool1.mp4" },
          { model: "Seedance2.0", src: "/dataset-videos/seedance2.0_pool1.mp4" },
        ],
      },
    ],
  },
  {
    id: "motion-rationality",
    label: "Motion Rationality",
    sets: [
      {
        id: "pip-the-pebble",
        character: "Pip The Pebble",
        prompt: "The character walks on a path with grass and gravel.",
        videos: [
          { model: "Seedance-Pro", src: "/dataset-videos/seedance_pebble.mp4" },
          { model: "Veo 3.1", src: "/dataset-videos/veo_pebble.mp4" },
          { model: "Kling 2.6", src: "/dataset-videos/kling_pebble.mp4" },
          { model: "Sora 2 Pro", src: "/dataset-videos/sora_pebble.mp4" },
          { model: "Framepack", src: "/dataset-videos/fp_pebble.mp4" },
          { model: "HunyuanVideo", src: "/dataset-videos/hy_pebble.mp4" },
          { model: "Wan 2.2", src: "/dataset-videos/wan_pebble.mp4" },
          { model: "Seedance2.0", src: "/dataset-videos/seedance2.0_PipThePebble_motion_rationality.mp4" },
        ],
      },
    ],
  },
  {
    id: "siso",
    label: "SISO",
    sets: [
      {
        id: "blue-bird",
        character: "Blue Bird",
        prompt: "The bird flies in a straight line from left to right and then stopped, hovering in the air.",
        videos: [
          { model: "Seedance-Pro", src: "/dataset-videos/seedance_bird2.mp4" },
          { model: "Veo 3.1", src: "/dataset-videos/veo_bird2.mp4" },
          { model: "Kling 2.6", src: "/dataset-videos/kling_bird2.mp4" },
          { model: "Sora 2 Pro", src: "/dataset-videos/sora_bird2.mp4" },
          { model: "Framepack", src: "/dataset-videos/fp_bird2.mp4" },
          { model: "HunyuanVideo", src: "/dataset-videos/hy_bird2.mp4" },
          { model: "Wan 2.2", src: "/dataset-videos/wan_bird2.mp4" },
          { model: "Seedance2.0", src: "/dataset-videos/seedance2.0_bird2.mp4" },
        ],
      },
    ],
  },
];

const CrossModelComparison = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const category = categories.find((c) => c.id === activeCategory)!;
  const [activeSetId, setActiveSetId] = useState<string>(category.sets[0]?.id ?? "");

  const currentSet = category.sets.find((s) => s.id === activeSetId);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const cat = categories.find((c) => c.id === catId)!;
    setActiveSetId(cat.sets[0]?.id ?? "");
  };

  return (
    <section className="py-24 px-4" id="cross-model">
      <div className="container max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Cross-Model <span className="text-gradient">Visual Comparison</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The same prompt, same character — compare how different models handle identical inputs side by side.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2.5 rounded-full font-display text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "glass-card hover:bg-card/90"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category description for Novel */}
        {activeCategory === "novel" && (
          <motion.p
            key="novel-desc"
            className="text-center text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-8 italic"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-semibold text-foreground">Novelty</span> — Measures deviation from common patterns via V-JEPA2 feature similarity. Higher scores indicate more creative, less predictable outputs.
          </motion.p>
        )}
        {/* Category description for Distinctive */}
        {activeCategory === "distinctive" && (
          <motion.p
            key="distinctive-desc"
            className="text-center text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-8 italic"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-semibold text-foreground">Distinctive Content</span> — Evaluates whether the model produces novel, animation-characteristic elements while staying faithful to the prompt.
          </motion.p>
        )}
        {/* Category description for IP-Presentation */}
        {activeCategory === "ip-presentation" && (
          <motion.p
            key="ip-desc"
            className="text-center text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-8 italic"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-semibold text-foreground">IP-Presentation</span> — Evaluates whether generated outputs faithfully follow the IP itself — iconic characters, signature designs, and recognizable personalities.
          </motion.p>
        )}
        {activeCategory === "motion-rationality" && (
          <motion.p
            key="mr-desc"
            className="text-center text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-8 italic"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-semibold text-foreground">Motion Rationality</span> — Evaluates whether motion is coherent, natural, and context-appropriate, assessing action-level plausibility and interaction logic.
          </motion.p>
        )}
        {activeCategory === "siso" && (
          <motion.p
            key="siso-desc"
            className="text-center text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-8 italic"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-semibold text-foreground">Slow In and Slow Out</span> — Evaluates natural motion easing: gradual acceleration, peak speed, and smooth deceleration, tracked via CoTracker trajectory analysis.
          </motion.p>
        )}

        {category.sets.length === 0 ? (
          <motion.div
            className="text-center py-20 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-lg">Coming soon — data for <strong>{category.label}</strong> will be added shortly.</p>
          </motion.div>
        ) : (
          <>
            {/* Character selector */}
            {category.sets.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {category.sets.map((set) => (
                  <button
                    key={set.id}
                    onClick={() => setActiveSetId(set.id)}
                    className={`px-4 py-2 rounded-full font-display text-sm font-medium transition-all ${
                      activeSetId === set.id
                        ? "gradient-lavender text-secondary-foreground shadow-md"
                        : "glass-card hover:bg-card/90"
                    }`}
                  >
                    {set.character}
                  </button>
                ))}
              </div>
            )}

            {currentSet && (
              <>
                {/* Prompt display */}
                <motion.p
                  key={currentSet.id}
                  className="text-center text-muted-foreground text-sm max-w-2xl mx-auto mb-4 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  The same <strong>{currentSet.character}</strong> prompt: {currentSet.prompt}
                </motion.p>

                {/* IP Description */}
                {currentSet.ipDescription && (
                  <motion.div
                    key={currentSet.id + "-ip"}
                    className="glass-card rounded-2xl p-5 max-w-3xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className="font-display font-semibold text-sm mb-3 text-center">IP Character Sheet — {currentSet.character}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-display font-semibold text-foreground block mb-1">🦈 Appearance</span>
                        {currentSet.ipDescription.appearance}
                      </div>
                      <div>
                        <span className="font-display font-semibold text-foreground block mb-1">🏃 Motion Logic</span>
                        {currentSet.ipDescription.motionLogic}
                      </div>
                      <div>
                        <span className="font-display font-semibold text-foreground block mb-1">😄 Personality</span>
                        {currentSet.ipDescription.personality}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Video grid */}
                <motion.div
                  key={currentSet.id + "-grid"}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentSet.videos.map((v) => (
                    <div
                      key={v.model}
                      className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="relative aspect-square bg-muted/30">
                        <video
                          src={v.src}
                          className="h-full w-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                        />
                        <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-foreground/60 backdrop-blur-sm text-background text-xs font-display font-semibold">
                          {v.model}
                        </div>
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-display font-semibold text-sm">{v.model}</h3>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CrossModelComparison;
