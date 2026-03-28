import { motion } from "framer-motion";
import { Shield, Clapperboard, Globe } from "lucide-react";

/* ───────── taxonomy data ───────── */
const taxonomy = [
  {
    id: "ip",
    label: "IP Preservation",
    icon: Shield,
    color: "coral" as const,
    description: "Ensures that generated characters maintain their visual identity, signature behaviours, and personality across different prompts and scenes.",
    children: ["Appearance Consistency", "Behavior Consistency", "Personality Consistency"],
    tags: {
      "Appearance Consistency": ["Canonical visual identity", "Multi-view consistency", "Stability under motion"],
      "Behavior Consistency": ["Signature traits", "Environmental interaction", "Action logic"],
      "Personality Consistency": ["Facial acting", "Posture and attitude", "Presence and body language"],
    },
  },
  {
    id: "anim",
    label: "Animation Principles",
    icon: Clapperboard,
    color: "lavender" as const,
    description: "Evaluates classical animation quality through motion, deformation, expressiveness, and human-judged preference.",
    children: ["Motion Dynamics", "Deformation", "Expressiveness", "Human Preference"],
    tags: {
      "Motion Dynamics": ["Anticipation", "Follow Through", "Slow In/Out"],
      Deformation: ["Squash & Stretch"],
      Expressiveness: ["Distinctive Content", "Novelty", "Solid Drawing"],
      "Human Preference": ["Dynamic Degree", "Diversity", "Semantic Extension"],
    },
  },
  {
    id: "quality",
    label: "Broader Quality Dimensions",
    icon: Globe,
    color: "mint" as const,
    description: "Captures semantic fidelity, motion rationality, and camera behaviour beyond character-centric animation.",
    children: ["Semantic Consistency", "Motion Rationality", "Camera Motion Consistency"],
    tags: {
      "Semantic Consistency": ["Object", "Action", "Color", "Scene"],
      "Motion Rationality": ["Structural Integrity", "Motion Coherence", "Action Plausibility", "Environment Fit"],
      "Camera Motion Consistency": ["Pan", "Tilt", "Zoom", "Static"],
    },
  },
];

const metaChips = ["19 dimensions", "Close-set + open-set", "VLM-based evaluation"];

const colorAccent: Record<string, { bg: string; border: string; text: string; pill: string }> = {
  coral: {
    bg: "bg-[hsl(350_75%_62%/0.06)]",
    border: "border-[hsl(350_75%_62%/0.18)]",
    text: "text-coral",
    pill: "bg-[hsl(350_75%_62%/0.10)] text-[hsl(350_75%_50%)]",
  },
  lavender: {
    bg: "bg-[hsl(260_50%_72%/0.06)]",
    border: "border-[hsl(260_50%_72%/0.18)]",
    text: "text-lavender",
    pill: "bg-[hsl(260_50%_72%/0.10)] text-[hsl(260_50%_58%)]",
  },
  mint: {
    bg: "bg-[hsl(165_50%_55%/0.06)]",
    border: "border-[hsl(165_50%_55%/0.18)]",
    text: "text-mint",
    pill: "bg-[hsl(165_50%_55%/0.10)] text-[hsl(165_50%_40%)]",
  },
};

/* ───────── component ───────── */
const OverviewSection = () => {
  return (
    <section className="py-24 px-4" id="overview">
      <div className="container max-w-6xl">
        {/* ── intro ── */}
        <motion.div
          className="mb-14 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-3">
            A benchmark built for character-centric animation, not generic video realism
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-5">
            Why <span className="text-gradient">AnimationBench</span>?
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            AnimationBench reorganizes animation evaluation into a three-level hierarchy:
            IP&nbsp;Preservation, Animation&nbsp;Principles, and Broader&nbsp;Quality&nbsp;Dimensions.
          </p>
        </motion.div>

        {/* ── video panel ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden max-w-4xl mx-auto">
            <div className="px-6 pt-5 pb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                Paper Demo
              </span>
              <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-medium">
                Full paper walkthrough
              </span>
            </div>

            <div className="px-6">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  src="https://cdn-dev.newai.land/audios/827ea15b-3e39-4494-bafb-4db2f5ceb20e.mp4"
                />
              </div>
            </div>

            <div className="px-6 pt-4 pb-2 space-y-1">
              <h4 className="text-sm font-semibold text-foreground">AnimationBench Paper Demo</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A complete overview of AnimationBench, including its hierarchy, evaluation dimensions, benchmark design, and qualitative examples.
              </p>
            </div>

            <div className="px-6 pb-5 pt-2 flex flex-wrap gap-2">
              {metaChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── taxonomy 3-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {taxonomy.map((group, gi) => {
            const c = colorAccent[group.color];
            return (
              <motion.div
                key={group.id}
                className={`rounded-2xl border ${c.border} ${c.bg} p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.1, duration: 0.45 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-card flex items-center justify-center shadow-sm ${c.text}`}>
                    <group.icon size={18} />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{group.label}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {group.description}
                </p>

                <div className="space-y-3">
                  {group.children.map((child) => {
                    const tags = (group as any).tags?.[child] as string[] | undefined;
                    return (
                      <div key={child}>
                        <span className="text-sm font-medium text-foreground/85">{child}</span>
                        {tags && tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {tags.map((t) => (
                              <span
                                key={t}
                                className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${c.pill}`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
