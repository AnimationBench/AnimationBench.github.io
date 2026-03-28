import { motion } from "framer-motion";
import { Medal, ShieldCheck, GitCompare, Target, Sparkles, Box } from "lucide-react";

const findings = [
  {
    icon: Medal,
    title: "Overall Ranking",
    value: "#1",
    unit: "Kling2.6",
    desc: "Across all 19 dimensions, Kling2.6 ranks first overall, followed by Veo3.1 and Seedance-Pro. Commercial models consistently outperform open-source alternatives.",
    color: "coral",
  },
  {
    icon: ShieldCheck,
    title: "IP Consistency Gap",
    value: "~15%",
    unit: "gap",
    desc: "All models struggle with IP/character preservation—appearance consistency is moderate, but behavior and personality retention remain significantly weaker, especially for complex 3D characters.",
    color: "lavender",
  },
  {
    icon: GitCompare,
    title: "Open vs Closed Source",
    value: "20+pt",
    unit: "avg gap",
    desc: "Closed-source models (Kling2.6, Veo3.1) lead open-source (Wan2.2, HunyuanVideo) by 20+ points on average. Wan2.2 is the strongest open-source option but still lags on motion and semantics.",
    color: "mint",
  },
  {
    icon: Target,
    title: "Solved vs Unsolved",
    value: "92+",
    unit: "solved",
    desc: "Camera motion consistency and basic semantic alignment are largely solved (scores >90). However, motion rationality, dynamic expressiveness, and fine-grained IP behavior remain challenging across all models.",
    color: "peach",
  },
  {
    icon: Sparkles,
    title: "Standout Specialists",
    value: "3",
    unit: "models",
    desc: "Seedance-Pro leads Dynamic Degree (88.33); Veo3.1 excels in semantic consistency and IP personality; Kling2.6 dominates camera and motion quality—each model has a distinct strength profile.",
    color: "sky",
  },
  {
    icon: Box,
    title: "2D vs 3D Character Gap",
    value: "Notable",
    unit: "diff",
    desc: "Models generally perform better on 2D characters than 3D ones. 3D characters exhibit more noticeable degradation in appearance consistency, pose accuracy, and fine-grained detail preservation.",
    color: "coral",
  },
];

const bgMap: Record<string, string> = {
  coral: "from-coral/15 to-coral/5",
  lavender: "from-lavender/15 to-lavender/5",
  peach: "from-peach/15 to-peach/5",
  mint: "from-mint/15 to-mint/5",
  sky: "from-sky/15 to-sky/5",
};

const iconMap: Record<string, string> = {
  coral: "text-coral",
  lavender: "text-lavender",
  peach: "text-peach",
  mint: "text-mint",
  sky: "text-sky",
};

const ResultsSection = () => {
  return (
    <section className="py-24 px-4 gradient-hero" id="results">
      <div className="container max-w-6xl">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Paper <span className="text-gradient">Findings</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Quantitative highlights extracted from the paper's official experiment table.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {findings.map((f, i) => (
            <motion.div
              key={f.title}
              className={`rounded-2xl bg-gradient-to-br ${bgMap[f.color]} border border-border/30 p-6 hover:shadow-lg hover:-translate-y-1 transition-all`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-card flex items-center justify-center shadow-sm ${iconMap[f.color]}`}>
                  <f.icon size={20} />
                </div>
                <div className="text-right">
                  <span className="font-display font-bold text-2xl">{f.value}</span>
                  <span className="text-xs text-muted-foreground ml-1">{f.unit}</span>
                </div>
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
