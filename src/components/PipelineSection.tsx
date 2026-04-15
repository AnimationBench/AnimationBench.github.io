import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, MessageSquareText, FlaskConical, RefreshCw, Users, ChevronDown, Play, Tag, Video, X, FileText, ClipboardCheck } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const suites = [
  {
    icon: ImageIcon,
    title: "Image Suite",
    color: "peach",
    steps: [
      "Collect existing IPs & create self-designed IPs (2D + 3D)",
      "Apply image editing models to adapt characters",
      "Produce suitable first frames for video generation",
    ],
  },
  {
    icon: MessageSquareText,
    title: "Prompt Suite",
    color: "coral",
    steps: [
      "Analyze evaluation dimension principles & requirements",
      "Use VLM to generate prompt proposals",
      "Human checkers verify and refine into final prompts",
    ],
  },
  {
    icon: FlaskConical,
    title: "Close-Set Evaluation Pipeline",
    color: "lavender",
    steps: [
      "Feed image suite + prompt suite samples to video generation models (Open-Source: Framepack, WanX 2.2, Hunyuan Video; Closed-Source: Seedance 2.0, Seedance Pro, Sora 2 Pro, Veo 3.1, Kling 2.6)",
      "Generate videos and apply evaluation tools",
      "Produce scores & rankings across all dimensions",
    ],
  },
  {
    icon: RefreshCw,
    title: "Open-Set Refinement Pipeline",
    color: "sky",
    steps: [
      "Input arbitrary animation video + target dimension to our judger",
      "Judger identifies specific issues in the video",
      "Prompt refiner improves instructions, then re-generate improved video",
    ],
  },
];

const bgMap: Record<string, string> = {
  coral: "gradient-coral",
  lavender: "gradient-lavender",
  peach: "from-peach to-lemon bg-gradient-to-br",
  sky: "from-sky to-lavender bg-gradient-to-br",
  mint: "gradient-mint",
};

const galleryCategories = ["Videos", "Characters (partial)"];

const mediaItems = [
  { id: 1, title: "Rex the Red Fox - Sora2-Pro", category: "Videos", type: "video", model: "Sora2-Pro", character: "RexTheRedFox", dimension: "Action", media: "/dataset-videos/sora2_RexTheRedFox_action.mp4" },
  { id: 2, title: "Milo Finch - Sora2-Pro", category: "Videos", type: "video", model: "Sora2-Pro", character: "MiloFinch", dimension: "Action", media: "/dataset-videos/sora2_MiloFinch_action.mp4" },
  { id: 5, title: "Fred Flintstone - Wan2.2", category: "Videos", type: "video", model: "Wan2.2", character: "FredFlintstone", dimension: "Action", media: "/dataset-videos/wan2.2_FredFlintstone_action.mp4" },
  { id: 6, title: "Circuit - Wan2.2", category: "Videos", type: "video", model: "Wan2.2", character: "Circuit", dimension: "Action", media: "/dataset-videos/wan2.2_Circuit_action.mp4" },
  { id: 9, title: "Ignis The Armored Wyrm - Kling2.6", category: "Videos", type: "video", model: "Kling2.6", character: "IgnisTheArmoredWyrm", dimension: "Action", media: "/dataset-videos/kiling_IgnisTheArmoredWyrm_action.mp4" },
  { id: 10, title: "Obsidian - Kling2.6", category: "Videos", type: "video", model: "Kling2.6", character: "Obsidian", dimension: "Action", media: "/dataset-videos/kiling_Obsidian_action.mp4" },
  { id: 13, title: "Puffball - Seedance-Pro", category: "Videos", type: "video", model: "Seedance-Pro", character: "Puffball", dimension: "Action", media: "/dataset-videos/seedancepro_Puffball_action.mp4" },
  { id: 14, title: "Slick Squirrel - Seedance-Pro", category: "Videos", type: "video", model: "Seedance-Pro", character: "SlickSquirrel", dimension: "Action", media: "/dataset-videos/seedancepro_SlickSquirrel_action.mp4" },
  { id: 17, title: "Rex the Red Fox - Veo3.1", category: "Videos", type: "video", model: "Veo3.1", character: "RexTheRedFox", dimension: "Action", media: "/dataset-videos/google-veo_RexTheRedFox_action.mp4" },
  { id: 18, title: "Milo Finch - Veo3.1", category: "Videos", type: "video", model: "Veo3.1", character: "MiloFinch", dimension: "Action", media: "/dataset-videos/google-veo_MiloFinch_action.mp4" },
  { id: 21, title: "Fred Flintstone - HunyuanVideo", category: "Videos", type: "video", model: "HunyuanVideo", character: "FredFlintstone", dimension: "Action", media: "/dataset-videos/hunyuan_i2v_FredFlintstone_action.mp4" },
  { id: 22, title: "Circuit - HunyuanVideo", category: "Videos", type: "video", model: "HunyuanVideo", character: "Circuit", dimension: "Action", media: "/dataset-videos/hunyuan_i2v_Circuit_action.mp4" },
  { id: 25, title: "Ignis The Armored Wyrm - Framepack", category: "Videos", type: "video", model: "Framepack", character: "IgnisTheArmoredWyrm", dimension: "Action", media: "/dataset-videos/framepack_IgnisTheArmoredWyrm_action.mp4" },
  { id: 26, title: "Obsidian - Framepack", category: "Videos", type: "video", model: "Framepack", character: "Obsidian", dimension: "Action", media: "/dataset-videos/framepack_Obsidian_action.mp4" },
  { id: 48, title: "Cartoon Ball Video - Framepack", category: "Videos", type: "video", model: "Framepack", character: "Cartoon Ball", dimension: "Squash & Stretch", media: "/dataset-videos/framepack_cartoon_ball_000_seed114514.mp4" },
  { id: 29, title: "Biomimetic Robot", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Robot", dimension: "3D Style", media: "/ip-characters/A_boimimetic_robot,_with_complex_structure_and_circuits._3D_style,_in_cartoon_movie_style._0.png" },
  { id: 30, title: "British Shorthair Cat", category: "Characters (partial)", type: "image", model: "IP Suite", character: "British Shorthair", dimension: "3D Style", media: "/ip-characters/british-shorthair-foxy.png" },
  { id: 31, title: "Anthropoid Lizard", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Lizard", dimension: "3D Style", media: "/ip-characters/A_cartoon_anthropoid_lizard,_in_orange_and_white_color,_is_riding_a_bike,_in_plain_background._3D_style._2.png" },
  { id: 32, title: "Cartoon Crab", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Crab", dimension: "3D Style", media: "/ip-characters/A_cartoon_crab_with_big_eyes,_on_a_sandbeach,_and_the_background_is_sea._3D_style,_no_bokeh._0.png" },
  { id: 33, title: "Spider Robot", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Spider Robot", dimension: "3D Style", media: "/ip-characters/araneid-robot-camera-eyes.png" },
  { id: 34, title: "Animated Shark", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Shark", dimension: "3D Style", media: "/ip-characters/An_animated_shark_with_sharp_teeth_and_two_feet_and_long_leg_is_smiling._0.png" },
  { id: 35, title: "Cartoon Owl", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Owl", dimension: "3D Style", media: "/ip-characters/Create_a_cartoon_owl_character,_in_dark_brown_color,_with_adorable_expression,_is_running_on_the_ground._3D_style,_plain_background._0.png" },
  { id: 36, title: "80s Retro Anime Style", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", media: "/ip-characters/80s-Retro-Anime2.png" },
  { id: 37, title: "Classic French Animation", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", media: "/ip-characters/Classic-French-Animation.png" },
  { id: 38, title: "Disney Renaissance Style", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", media: "/ip-characters/Disney-Renaissance-Animation2.png" },
  { id: 39, title: "Golden Age American Animation", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", media: "/ip-characters/Golden-Age-of-American-Animation.png" },
  { id: 41, title: "Limited Animation Style", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", media: "/ip-characters/Limited-Animation.png" },
  { id: 42, title: "Limited Animation Style 2", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", media: "/ip-characters/Limited-Animation2.png" },
  { id: 43, title: "Modern CalArts Style", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", media: "/ip-characters/Modern-CalArts-Animation2.png" },
  { id: 44, title: "Studio Ghibli Style", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", media: "/ip-characters/Studio-Ghibli2.png" },
];

const typeColors: Record<string, string> = {
  video: "bg-coral/20 text-coral",
  image: "bg-mint/20 text-mint",
};

const chompGeneration = {
  appearance: {
    summary: "A cheerful, anthropomorphic shark character with a blue and white color scheme, large expressive eyes, and a wide, toothy grin. It stands on two legs and has a rounded, cartoonish body with a prominent dorsal fin and a large tail fin.",
    details: {
      front: "The character is viewed from the front, standing upright on two legs. It has a large, round head with a prominent dorsal fin on top. Its eyes are enormous, round, and white with black pupils and red irises, conveying a friendly and excited expression. The mouth is wide open in a grin, revealing a full set of sharp, white, triangular teeth and a red tongue. The body is a smooth, rounded blue on top, transitioning to a white underside. It has two small, stubby legs ending in three-toed feet, and two pectoral fins that function as arms. The tail fin is large and curves upward.",
      side: "The character is viewed from the side, showcasing its profile. The large dorsal fin is visible on the top of its head. Its body is a smooth, curved blue, tapering from a wide torso to a narrow tail. The pectoral fin is extended forward, and the tail fin is large and fanned out. The legs are straight, supporting the character's weight. The eye is large and round, and the mouth is open in a wide, friendly grin, showing the teeth and tongue. The white underbelly is visible along the side of the body.",
      back: "The character is viewed from the back, showing its rounded blue body and large tail fin. The dorsal fin is visible on the top of its head, and the pectoral fins are positioned at its sides. The legs are visible, supporting the character's weight. The tail fin is large and curves upward, with a smooth, rounded shape. The character's back is a smooth, continuous blue surface, with no visible markings or textures.",
    },
  },
  behavior: {
    Personality: "Energetic, friendly, and perpetually cheerful. The character's posture is upright and confident, with a wide, open-mouthed smile that is always present, conveying an attitude of excitement and approachability.",
    "Action Logic": "The character solves problems through direct, physical action. It uses its large tail fin for propulsion and balance, and its pectoral fins for manipulation and support. It moves with a confident, slightly bouncy gait, using its legs to walk or run.",
    "Atmosphere/Vibe": "Bright, clean, and playful. The lighting is soft and even, creating a friendly and inviting atmosphere. The character exists in a simple, uncluttered environment, emphasizing its form and actions.",
    Signature: "The character has a heavy, grounded gait with a slight bounce, moving with a sense of weight and momentum. Its animation style is smooth and fluid, with a focus on exaggerated, expressive movements.",
    "Facial Acting": "The character's facial expression is static but highly expressive due to its large eyes and wide grin. The eyes are always wide and bright, and the mouth is always open in a smile. The character's reactions are conveyed through its body language and eye movement.",
    "Environmental Interaction": "The character interacts with its environment by walking, running, and using its fins to grasp objects. It moves through the world with confidence and purpose, leaving a slight shadow behind it.",
  },
};

const chompEvaluation = {
  appearance: {
    summary: "A cheerful, anthropomorphic shark character with a blue and white color scheme, large expressive eyes, and a wide, toothy grin. It stands on two legs and has a rounded, cartoonish body with a prominent dorsal fin and a large tail fin.",
    details: {
      front: [
        "Does the character stand upright on two legs with a large, round head and prominent dorsal fin on top?",
        "Are the eyes enormous, round, white with black pupils and red irises, conveying a friendly and excited expression?",
        "Is the mouth wide open in a grin, revealing sharp, white, triangular teeth and a red tongue?",
        "Is the body smooth and rounded, with blue color on top transitioning to white underside?",
        "Are the two legs small and stubby, ending in three-toed feet?",
        "Are the two pectoral fins functioning as arms, and is the tail fin large and curving upward?",
      ],
      side: [
        "Is the large dorsal fin visible on top of the head from the side profile?",
        "Is the body smooth and curved blue, tapering from wide torso to narrow tail?",
        "Is the pectoral fin extended forward and the tail fin large and fanned out?",
        "Are the legs straight, supporting the character's weight?",
        "Is the eye large and round, and the mouth open in a wide, friendly grin showing teeth and tongue?",
        "Is the white underbelly visible along the side of the body?",
      ],
      back: [
        "Is the rounded blue body clearly visible from the back view?",
        "Is the large tail fin prominent and curving upward with a smooth, rounded shape?",
        "Is the dorsal fin visible on top of the head from behind?",
        "Are the pectoral fins positioned at the sides when viewed from the back?",
        "Are the legs visible, supporting the character's weight?",
        "Is the character's back a smooth, continuous blue surface with no visible markings or textures?",
      ],
    },
  },
  behavior: {
    Personality: [
      "Is the character's overall posture upright and able to reflect a confident state?",
      "Does the character maintain a wide, open-mouthed smile consistently across different segments of the video?",
      "From the character's movement range and energetic demeanor, can it intuitively convey the trait of being energetic?",
      "Does the character's overall performance give people a friendly and approachable impression?",
      "Does the character maintain a perpetually cheerful tone throughout the entire video?",
      "Can the character effectively convey the core attitudes of excitement and approachability?",
    ],
    "Action Logic": [
      "Does the character solve problems through direct, physical action rather than indirect or passive methods?",
      "Is the character's large tail fin consistently used for propulsion and balance throughout the video?",
      "Are the pectoral fins used for manipulation and support of objects?",
      "Does the character move with a confident, slightly bouncy gait?",
      "Are walking or running actions performed using the character's legs?",
      "Is the overall action logic consistent with a character that relies on physical engagement?",
    ],
    "Atmosphere/Vibe": [
      "Is the overall atmosphere bright, clean, and playful?",
      "Is the lighting soft and even, creating a friendly and inviting feel?",
      "Does the character exist in a simple, uncluttered environment?",
      "Does the environment emphasize the character's form and actions?",
      "Does the overall vibe feel friendly and inviting?",
      "Is there a consistent playful tone throughout the video?",
    ],
    Signature: [
      "Does the character exhibit a heavy, grounded gait with a slight bounce?",
      "Does the character move with a sense of weight and momentum?",
      "Is the animation style smooth and fluid?",
      "Are the character's movements exaggerated and expressive?",
      "Does the character's movement style feel consistent throughout?",
      "Does the overall motion convey the character's signature movement style?",
    ],
    "Facial Acting": [
      "Are the character's large eyes always wide and bright?",
      "Is the mouth always open in a smile?",
      "Are the character's reactions conveyed through body language and eye movement?",
      "Is the facial expression static but highly expressive?",
      "Do the eyes and mouth work together to create a consistent expression?",
      "Does the facial acting effectively communicate the character's emotions?",
    ],
    "Environmental Interaction": [
      "Does the character interact with its environment by walking and running?",
      "Does the character use its fins to grasp objects when interacting with the environment?",
      "Does the character move through the world with confidence and purpose?",
      "Does the character leave a slight shadow behind it?",
      "Are the character's interactions with objects consistent with using fins for grasping?",
      "Does the overall environmental interaction demonstrate confident and purposeful movement?",
    ],
  },
};

const characterItems = mediaItems.filter((v) => v.category === "Characters (partial)");

const PipelineSection = () => {
  const [promptTab, setPromptTab] = useState<"generation" | "evaluation">("generation");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [chompOpen, setChompOpen] = useState(false);
  const [charactersOpen, setCharactersOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Videos");
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);

  const filtered = mediaItems.filter((v) => v.category === activeCategory);

  const handlePlayClick = (itemId: number) => {
    setPlayingVideos((prev) => new Set(prev).add(itemId));
    const video = videoRefs.current[itemId];
    if (video) {
      video.play().catch((err) => console.error("Error playing video:", err));
    }
  };

  return (
    <section className="py-24 px-4" id="method">
      <div className="container max-w-6xl">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Evaluation <span className="text-gradient">Protocol</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our framework consists of four complementary suites covering data preparation, prompt design, closed-set benchmarking, and open-set refinement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {suites.map((suite, i) => (
            <motion.div
              key={suite.title}
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-shadow flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${bgMap[suite.color]} flex items-center justify-center text-primary-foreground shadow-lg shrink-0`}>
                  <suite.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-lg">{suite.title}</h3>
              </div>
              <ol className="space-y-2 flex-1">
                {suite.steps.map((step, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="font-display font-bold text-foreground/60 mt-0.5 shrink-0">{j + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {suite.title === "Image Suite" && (
                <div className="mt-5 border-t border-border/30 pt-4">
                  <button
                    onClick={() => setCharactersOpen(!charactersOpen)}
                    className="w-full flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg gradient-lavender flex items-center justify-center text-primary-foreground shadow-md shrink-0">
                        <ImageIcon size={16} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-display font-bold text-sm text-foreground">Characters (partial)</h4>
                        <p className="text-xs text-muted-foreground">Sample characters from the IP suite</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full gradient-coral flex items-center justify-center shadow-md transition-transform duration-300 ${charactersOpen ? "rotate-180" : ""}`}>
                      <ChevronDown size={16} className="text-primary-foreground" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {charactersOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {characterItems.map((item) => (
                            <div key={item.id} className="glass-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setPreviewImage({ src: item.media, alt: item.title })}>
                              <div className="relative aspect-square bg-muted/30 p-3">
                                <img src={item.media} alt={item.title} className="h-full w-full object-contain" />
                              </div>
                              <div className="p-2">
                                <h5 className="font-display font-semibold text-xs truncate">{item.title}</h5>
                                <span className="text-xs text-muted-foreground">{item.dimension}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              {suite.title === "Prompt Suite" && (
                <div className="mt-5 border-t border-border/30 pt-4">
                  <button
                    onClick={() => setChompOpen(!chompOpen)}
                    className="w-full flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg gradient-lavender flex items-center justify-center text-primary-foreground shadow-md shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-display font-bold text-sm text-foreground">Chomp — Example Prompts</h4>
                        <p className="text-xs text-muted-foreground">Generation & evaluation prompt examples</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full gradient-coral flex items-center justify-center shadow-md transition-transform duration-300 ${chompOpen ? "rotate-180" : ""}`}>
                      <ChevronDown size={16} className="text-primary-foreground" />
                    </div>
                  </button>
                  <AnimatePresence>
                  {chompOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <div className="pt-4">
                  {/* Tabs */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setPromptTab("generation")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all ${
                        promptTab === "generation"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "glass-card hover:bg-card/90"
                      }`}
                    >
                      <FileText size={14} />
                      Generation Prompt
                    </button>
                    <button
                      onClick={() => setPromptTab("evaluation")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all ${
                        promptTab === "evaluation"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "glass-card hover:bg-card/90"
                      }`}
                    >
                      <ClipboardCheck size={14} />
                      Evaluation Prompt
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {promptTab === "generation" ? (
                      <motion.div key="gen" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4 text-sm">
                        <div>
                          <h5 className="font-display font-bold text-foreground mb-2 text-xs">📐 Canonical Appearance</h5>
                          <p className="text-muted-foreground mb-3 italic text-xs">{chompGeneration.appearance.summary}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {Object.entries(chompGeneration.appearance.details).map(([view, desc]) => (
                              <div key={view} className="bg-muted/30 rounded-xl p-3">
                                <span className="font-display font-semibold text-foreground text-xs uppercase block mb-1">{view}</span>
                                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-display font-bold text-foreground mb-2 text-xs">🎭 Canonical Behavior</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(chompGeneration.behavior).map(([key, val]) => (
                              <div key={key} className="bg-muted/30 rounded-xl p-3">
                                <span className="font-display font-semibold text-foreground text-xs block mb-1">{key}</span>
                                <p className="text-muted-foreground text-xs leading-relaxed">{val}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="eval" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4 text-sm">
                        <div>
                          <h5 className="font-display font-bold text-foreground mb-2 text-xs">📐 Appearance Evaluation</h5>
                          <p className="text-muted-foreground mb-3 italic text-xs">{chompEvaluation.appearance.summary}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {Object.entries(chompEvaluation.appearance.details).map(([view, questions]) => (
                              <div key={view} className="bg-muted/30 rounded-xl p-3">
                                <span className="font-display font-semibold text-foreground text-xs uppercase block mb-2">{view}</span>
                                <ul className="space-y-1">
                                  {questions.map((q, qi) => (
                                    <li key={qi} className="text-muted-foreground text-xs leading-relaxed flex items-start gap-1.5">
                                      <span className="text-primary shrink-0 mt-0.5">•</span>{q}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-display font-bold text-foreground mb-2 text-xs">🎭 Behavior Evaluation</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(chompEvaluation.behavior).map(([key, questions]) => (
                              <div key={key} className="bg-muted/30 rounded-xl p-3">
                                <span className="font-display font-semibold text-foreground text-xs block mb-2">{key}</span>
                                <ul className="space-y-1">
                                  {questions.map((q, qi) => (
                                    <li key={qi} className="text-muted-foreground text-xs leading-relaxed flex items-start gap-1.5">
                                      <span className="text-primary shrink-0 mt-0.5">•</span>{q}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>
                  </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          ))}
        </div>


        {/* Human Alignment Study */}
        <motion.div
          className="mt-12 glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl ${bgMap.mint} flex items-center justify-center text-primary-foreground shadow-lg shrink-0`}>
              <Users size={22} />
            </div>
            <h3 className="font-display font-bold text-lg">Human Alignment Study</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Simulating the paper's human preference study: annotators compared paired outputs from four closed-source models using win-ratio metrics. AnimationBench scores show strong Spearman correlation with human judgments.
          </p>
        </motion.div>

        {/* Dataset Gallery - Collapsible */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setGalleryOpen(!galleryOpen)}
            className="w-full glass-card rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-lavender flex items-center justify-center text-primary-foreground shadow-lg shrink-0">
                <Video size={22} />
              </div>
              <div className="text-left">
                <h3 className="font-display font-bold text-lg">Dataset Gallery</h3>
                <p className="text-sm text-muted-foreground">Sample videos and characters from the benchmark dataset</p>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-full gradient-coral flex items-center justify-center shadow-md transition-transform duration-300 ${galleryOpen ? "rotate-180" : ""}`}>
              <ChevronDown size={20} className="text-primary-foreground" />
            </div>
          </button>

          <AnimatePresence>
            {galleryOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6">
                  {/* Category filters */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {galleryCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full font-display text-sm font-medium transition-all ${
                          activeCategory === cat ? "gradient-lavender text-secondary-foreground shadow-md" : "glass-card hover:bg-card/90"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Media grid */}
                  <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" layout>
                    <AnimatePresence mode="popLayout">
                      {filtered.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="group glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                        >
                          <div className={`relative aspect-square bg-muted/30 ${item.category === "Characters (partial)" ? "p-4" : ""}`}>
                            {item.type === "video" ? (
                              <>
                                <video
                                  ref={(el) => { videoRefs.current[item.id] = el; }}
                                  src={item.media}
                                  className="h-full w-full object-cover"
                                  controls={playingVideos.has(item.id)}
                                  onPlay={() => setPlayingVideos((prev) => new Set(prev).add(item.id))}
                                  onPause={() => setPlayingVideos((prev) => { const s = new Set(prev); s.delete(item.id); return s; })}
                                  autoPlay muted loop playsInline
                                />
                                {!playingVideos.has(item.id) && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 group-hover:bg-foreground/10 transition-colors cursor-pointer z-10" onClick={() => handlePlayClick(item.id)}>
                                    <div className="w-16 h-16 rounded-full bg-card/90 flex items-center justify-center shadow-lg">
                                      <Play size={24} className="text-primary ml-1" />
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <img src={item.media} alt={item.title} className={`h-full w-full cursor-pointer ${item.category === "Characters (partial)" ? "object-contain" : "object-cover"}`} onClick={() => setPreviewImage({ src: item.media, alt: item.title })} />
                            )}
                            <div className="absolute top-2 right-2">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[item.type]}`}>
                                {item.type === "video" ? <Video size={12} className="inline mr-1" /> : <Tag size={12} className="inline mr-1" />}
                                {item.type}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-display font-semibold mb-2 text-sm">{item.title}</h3>
                            <div className="flex flex-wrap gap-1.5">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{item.model}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-lavender/15 text-foreground">{item.character}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-peach/15 text-foreground">{item.dimension}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Image Preview Dialog */}
        <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-0">
            {previewImage && (
              <div className="relative w-full h-full flex items-center justify-center">
                <img src={previewImage.src} alt={previewImage.alt} className="max-w-full max-h-[95vh] object-contain rounded-lg" />
                <button onClick={() => setPreviewImage(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PipelineSection;
