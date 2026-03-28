import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, Tag, Video } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const categories = ["Videos", "Characters (partial)"];

const mediaItems = [
  // 15 sample videos — ~2 per model + 1 squash&stretch
  { id: 1, title: "Rex the Red Fox - Sora2-Pro", category: "Videos", type: "video", model: "Sora2-Pro", character: "RexTheRedFox", dimension: "Action", source: "anibench_dataset/sora2", media: "/dataset-videos/sora2_RexTheRedFox_action.mp4" },
  { id: 2, title: "Milo Finch - Sora2-Pro", category: "Videos", type: "video", model: "Sora2-Pro", character: "MiloFinch", dimension: "Action", source: "anibench_dataset/sora2", media: "/dataset-videos/sora2_MiloFinch_action.mp4" },
  { id: 5, title: "Fred Flintstone - Wan2.2", category: "Videos", type: "video", model: "Wan2.2", character: "FredFlintstone", dimension: "Action", source: "anibench_dataset/wan2.2", media: "/dataset-videos/wan2.2_FredFlintstone_action.mp4" },
  { id: 6, title: "Circuit - Wan2.2", category: "Videos", type: "video", model: "Wan2.2", character: "Circuit", dimension: "Action", source: "anibench_dataset/wan2.2", media: "/dataset-videos/wan2.2_Circuit_action.mp4" },
  { id: 9, title: "Ignis The Armored Wyrm - Kling2.6", category: "Videos", type: "video", model: "Kling2.6", character: "IgnisTheArmoredWyrm", dimension: "Action", source: "anibench_dataset/kiling", media: "/dataset-videos/kiling_IgnisTheArmoredWyrm_action.mp4" },
  { id: 10, title: "Obsidian - Kling2.6", category: "Videos", type: "video", model: "Kling2.6", character: "Obsidian", dimension: "Action", source: "anibench_dataset/kiling", media: "/dataset-videos/kiling_Obsidian_action.mp4" },
  { id: 13, title: "Puffball - Seedance-Pro", category: "Videos", type: "video", model: "Seedance-Pro", character: "Puffball", dimension: "Action", source: "anibench_dataset/seedancepro", media: "/dataset-videos/seedancepro_Puffball_action.mp4" },
  { id: 14, title: "Slick Squirrel - Seedance-Pro", category: "Videos", type: "video", model: "Seedance-Pro", character: "SlickSquirrel", dimension: "Action", source: "anibench_dataset/seedancepro", media: "/dataset-videos/seedancepro_SlickSquirrel_action.mp4" },
  { id: 17, title: "Rex the Red Fox - Veo3.1", category: "Videos", type: "video", model: "Veo3.1", character: "RexTheRedFox", dimension: "Action", source: "anibench_dataset/google-veo", media: "/dataset-videos/google-veo_RexTheRedFox_action.mp4" },
  { id: 18, title: "Milo Finch - Veo3.1", category: "Videos", type: "video", model: "Veo3.1", character: "MiloFinch", dimension: "Action", source: "anibench_dataset/google-veo", media: "/dataset-videos/google-veo_MiloFinch_action.mp4" },
  { id: 21, title: "Fred Flintstone - HunyuanVideo", category: "Videos", type: "video", model: "HunyuanVideo", character: "FredFlintstone", dimension: "Action", source: "anibench_dataset/hunyuan", media: "/dataset-videos/hunyuan_i2v_FredFlintstone_action.mp4" },
  { id: 22, title: "Circuit - HunyuanVideo", category: "Videos", type: "video", model: "HunyuanVideo", character: "Circuit", dimension: "Action", source: "anibench_dataset/hunyuan", media: "/dataset-videos/hunyuan_i2v_Circuit_action.mp4" },
  { id: 25, title: "Ignis The Armored Wyrm - Framepack", category: "Videos", type: "video", model: "Framepack", character: "IgnisTheArmoredWyrm", dimension: "Action", source: "anibench_dataset/framepack", media: "/dataset-videos/framepack_IgnisTheArmoredWyrm_action.mp4" },
  { id: 26, title: "Obsidian - Framepack", category: "Videos", type: "video", model: "Framepack", character: "Obsidian", dimension: "Action", source: "anibench_dataset/framepack", media: "/dataset-videos/framepack_Obsidian_action.mp4" },
  { id: 48, title: "Cartoon Ball Video - Framepack", category: "Videos", type: "video", model: "Framepack", character: "Cartoon Ball", dimension: "Squash & Stretch", source: "roll_ball_output/videos", media: "/dataset-videos/framepack_cartoon_ball_000_seed114514.mp4" },
  // 15 sample characters (partial)
  { id: 29, title: "Biomimetic Robot", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Robot", dimension: "3D Style", source: "IP_can_be_used", media: "/ip-characters/A_boimimetic_robot,_with_complex_structure_and_circuits._3D_style,_in_cartoon_movie_style._0.png" },
  { id: 30, title: "British Shorthair Cat", category: "Characters (partial)", type: "image", model: "IP Suite", character: "British Shorthair", dimension: "3D Style", source: "IP_can_be_used", media: "/ip-characters/british-shorthair-foxy.png" },
  { id: 31, title: "Anthropoid Lizard", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Lizard", dimension: "3D Style", source: "IP_can_be_used", media: "/ip-characters/A_cartoon_anthropoid_lizard,_in_orange_and_white_color,_is_riding_a_bike,_in_plain_background._3D_style._2.png" },
  { id: 32, title: "Cartoon Crab", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Crab", dimension: "3D Style", source: "IP_can_be_used", media: "/ip-characters/A_cartoon_crab_with_big_eyes,_on_a_sandbeach,_and_the_background_is_sea._3D_style,_no_bokeh._0.png" },
  { id: 33, title: "Spider Robot", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Spider Robot", dimension: "3D Style", source: "IP_can_be_used", media: "/ip-characters/araneid-robot-camera-eyes.png" },
  { id: 34, title: "Animated Shark", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Shark", dimension: "3D Style", source: "IP_can_be_used", media: "/ip-characters/An_animated_shark_with_sharp_teeth_and_two_feet_and_long_leg_is_smiling._0.png" },
  { id: 35, title: "Cartoon Owl", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Owl", dimension: "3D Style", source: "IP_can_be_used", media: "/ip-characters/Create_a_cartoon_owl_character,_in_dark_brown_color,_with_adorable_expression,_is_running_on_the_ground._3D_style,_plain_background._0.png" },
  { id: 36, title: "80s Retro Anime Style", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", source: "IP_can_be_used", media: "/ip-characters/80s Retro Anime2.png" },
  { id: 37, title: "Classic French Animation", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", source: "IP_can_be_used", media: "/ip-characters/Classic French Animation.png" },
  { id: 38, title: "Disney Renaissance Style", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", source: "IP_can_be_used", media: "/ip-characters/Disney Renaissance Animation2.png" },
  { id: 39, title: "Golden Age American Animation", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", source: "IP_can_be_used", media: "/ip-characters/Golden Age of American Animation.png" },
  { id: 41, title: "Limited Animation Style", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", source: "IP_can_be_used", media: "/ip-characters/Limited Animation.png" },
  { id: 42, title: "Limited Animation Style 2", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", source: "IP_can_be_used", media: "/ip-characters/Limited Animation2.png" },
  { id: 43, title: "Modern CalArts Style", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", source: "IP_can_be_used", media: "/ip-characters/Modern CalArts Animation2.png" },
  { id: 44, title: "Studio Ghibli Style", category: "Characters (partial)", type: "image", model: "IP Suite", character: "Style Reference", dimension: "Animation Style", source: "IP_can_be_used", media: "/ip-characters/Studio Ghibli2.png" },
];

const typeColors: Record<string, string> = {
  video: "bg-coral/20 text-coral",
  image: "bg-mint/20 text-mint",
};

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("Videos");
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);

  const filtered = mediaItems.filter((v) => v.category === activeCategory);

  const handlePlayClick = (itemId: number) => {
    setPlayingVideos((prev) => new Set(prev).add(itemId));
    const video = videoRefs.current[itemId];
    if (video) {
      video.play().catch((err) => {
        console.error("Error playing video:", err);
      });
    }
  };

  return (
    <section className="py-24 px-4" id="gallery">
      <div className="container max-w-6xl">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Dataset <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Sample videos and characters from the benchmark dataset. Showing a curated subset — see the paper for the full collection.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
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
                <div className={`relative aspect-square bg-muted/30 ${item.category === "Characters" ? "p-4" : ""}`}>
                  {item.type === "video" ? (
                    <>
                      <video
                        ref={(el) => {
                          videoRefs.current[item.id] = el;
                        }}
                        src={item.media}
                        className="h-full w-full object-cover"
                        controls={playingVideos.has(item.id)}
                        onPlay={() => setPlayingVideos((prev) => new Set(prev).add(item.id))}
                        onPause={() => setPlayingVideos((prev) => {
                          const newSet = new Set(prev);
                          newSet.delete(item.id);
                          return newSet;
                        })}
                        autoPlay
                        muted
                        loop
                        playsInline
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
                    <img 
                      src={item.media} 
                      alt={item.title} 
                      className={`h-full w-full cursor-pointer ${item.category === "Characters" ? "object-contain" : "object-cover"}`}
                      onClick={() => setPreviewImage({ src: item.media, alt: item.title })}
                    />
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
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {item.model}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-lavender/15 text-foreground">
                      {item.character}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-peach/15 text-foreground">
                      {item.dimension}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Image Preview Dialog */}
        <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-0">
            {previewImage && (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={previewImage.src}
                  alt={previewImage.alt}
                  className="max-w-full max-h-[95vh] object-contain rounded-lg"
                />
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                >
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

export default GallerySection;
