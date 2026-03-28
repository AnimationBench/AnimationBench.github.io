import { motion } from "framer-motion";
import { Video, ScanSearch, Layers, BarChart3, FileCheck, ArrowRight } from "lucide-react";

const steps = [
  { icon: Layers, title: "Dimension Design", desc: "Define 19 dimensions across three pillars: Disney's 12 Animation Principles, IP/Character Preservation, and Generative Video Quality.", color: "mint" },
  { icon: Video, title: "IP/Image Suite Setup", desc: "Build character assets: existing IPs + self-designed (2D + 3D).", color: "coral" },
  { icon: ScanSearch, title: "Prompt Suite Construction", desc: "Use LLM + human checks to produce 280 customized prompts.", color: "lavender" },
  { icon: BarChart3, title: "Model Evaluation", desc: "Evaluate 7 SOTA video generation models with unified tools and VLM-QA.", color: "peach" },
  { icon: FileCheck, title: "Alignment Verification", desc: "Compare automatic scores with human preference using win-rate correlation.", color: "sky" },
];

const bgMap: Record<string, string> = {
  coral: "gradient-coral",
  lavender: "gradient-lavender",
  mint: "gradient-mint",
  peach: "from-peach to-lemon bg-gradient-to-br",
  sky: "from-sky to-lavender bg-gradient-to-br",
};

const PipelineSection = () => {
  return (
    <section className="py-24 px-4" id="method">
      <div className="container max-w-5xl">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Evaluation <span className="text-gradient">Pipeline</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Our evaluation framework uniquely integrates three pillars:
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card font-display text-sm font-semibold">
              🎞️ Disney's 12 Principles of Animation
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card font-display text-sm font-semibold">
              🎭 IP / Character Preservation
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card font-display text-sm font-semibold">
              ✨ Generative Video Quality
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="flex items-start gap-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              {/* Step number + connector */}
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl ${bgMap[step.color]} flex items-center justify-center text-primary-foreground shadow-lg`}>
                  <step.icon size={24} />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 h-10 bg-border my-1 relative">
                    <motion.div
                      className="absolute inset-x-0 top-0 bg-primary/30"
                      initial={{ height: 0 }}
                      whileInView={{ height: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                    />
                  </div>
                )}
              </div>

              {/* Content card */}
              <div className="glass-card rounded-xl p-5 flex-1 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-display font-bold text-muted-foreground">Step {i + 1}</span>
                  {i < steps.length - 1 && <ArrowRight size={12} className="text-muted-foreground/40" />}
                </div>
                <h3 className="font-display font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
