import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const chartOptions = [
  {
    id: "combined",
    title: "Overall Radar Comparison",
    description: "Model Comparison",
    src: "/paper-assets/radar_chart_combined.png",
    aspectRatio: "6395/2929",
  },
  {
    id: "separate",
    title: "Per-model Dimension Profiles",
    description: "19-Dim Radar",
    src: "/paper-assets/radar_chart_separate_oneline.png",
    aspectRatio: "8293/1156",
  },
  {
    id: "alignment",
    title: "Human Alignment Plot",
    description: "Spearman Correlation",
    src: "/paper-assets/combined_plot.png",
    aspectRatio: "2187/658",
  },
];

const dimensionInfo: Record<string, string> = {
  "App.": "Appearance Consistency — visual consistency of characters across frames",
  "Beh.": "Behavior Accuracy — correctness of character actions and movements",
  "Pers.": "Personality Preservation — maintaining character personality traits",
  "Sem.": "Semantic Alignment — how well the video matches the text prompt",
  "MR": "Motion Rationality — whether generated motions follow rational, physically plausible patterns",
  "CMC": "Camera Motion Consistency — consistency of camera movement throughout the video",
  "DD": "Dynamic Degree — intensity and range of motion in the animation",
  "Nov.": "Novelty — creativity and originality of the generated content",
};
const dimensions = Object.keys(dimensionInfo);

const models = [
  { name: "Wan2.2", color: "#e06478", scores: [67.69, 80.09, 89.58, 67.86, 57.26, 35.71, 76.67, 15.87], group: "Open-Source" },
  { name: "HunyuanVideo", color: "#9b7ed8", scores: [39.48, 47.91, 86.53, 24.20, 23.42, 51.79, 36.67, 11.91], group: "Open-Source" },
  { name: "Framepack", color: "#50b89e", scores: [33.85, 61.30, 88.33, 33.33, 27.92, 67.86, 41.67, 9.91], group: "Open-Source" },
  { name: "Sora2-Pro", color: "#e8a060", scores: [73.20, 77.31, 86.01, 73.36, 55.86, 64.29, 56.67, 13.53], group: "Proprietary" },
  { name: "Veo3.1", color: "#5eaed6", scores: [72.02, 84.72, 91.61, 89.31, 64.76, 39.29, 75.00, 11.43], group: "Proprietary" },
  { name: "Kling2.6", color: "#d4c25a", scores: [74.09, 83.33, 91.61, 86.11, 72.64, 92.86, 81.67, 18.31], group: "Proprietary" },
  { name: "Seedance-Pro", color: "#f28cab", scores: [74.61, 78.24, 90.91, 69.86, 67.25, 57.14, 88.33, 12.50], group: "Proprietary" },
];

const groups = ["All Models", "Proprietary Models", "Open-Source Models"];

const BenchmarkSection = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState("All Models");
  const [activeChart, setActiveChart] = useState("combined");
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);

  const filteredModels = (activeGroup === "All Models" ? models : models.filter((m) => m.group + " Models" === activeGroup))
    .slice()
    .sort((a, b) => b.scores.reduce((s, v) => s + v, 0) - a.scores.reduce((s, v) => s + v, 0));

  const chartData = dimensions.map((dim, i) => {
    const entry: Record<string, string | number> = { dimension: dim };
    filteredModels.forEach((m) => {
      entry[m.name] = m.scores[i];
    });
    return entry;
  });

  return (
    <section className="py-24 px-4 gradient-hero" id="benchmark">
      <div className="container max-w-6xl">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Real Table <span className="text-gradient">Scores</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Scores are from Table "AnimationBench Overall Evaluation Results" in the paper.
            Dimensions shown: App./Beh./Pers./Sem./MR/CMC/DD/Nov.
          </p>
        </motion.div>

        {/* Group toggle */}
        <div className="flex justify-center gap-2 mb-8">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => { setActiveGroup(g); setSelectedModel(null); }}
              className={`px-5 py-2 rounded-full font-display text-sm font-medium transition-all ${
                activeGroup === g ? "gradient-coral text-primary-foreground shadow-md" : "glass-card text-foreground hover:bg-card/90"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Radar chart */}
          <motion.div
            className="lg:col-span-2 glass-card rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <ResponsiveContainer width="100%" height={420}>
              <RadarChart data={chartData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={(props: any) => {
                    const { x, y, payload } = props;
                    const label = payload.value;
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <title>{dimensionInfo[label]}</title>
                        <text
                          textAnchor="middle"
                          fill="hsl(var(--muted-foreground))"
                          fontSize={12}
                          fontFamily="Fredoka"
                          dy={4}
                          style={{ cursor: "help" }}
                        >
                          {label}
                        </text>
                      </g>
                    );
                  }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontFamily: "Space Grotesk",
                    fontSize: 13,
                  }}
                />
                {filteredModels.map((model) => (
                  <Radar
                    key={model.name}
                    name={model.name}
                    dataKey={model.name}
                    stroke={model.color}
                    fill={model.color}
                    fillOpacity={
                      selectedModel === null ? 0.12 : selectedModel === model.name ? 0.35 : 0.03
                    }
                    strokeOpacity={
                      selectedModel === null ? 0.8 : selectedModel === model.name ? 1 : 0.15
                    }
                    strokeWidth={selectedModel === model.name ? 3 : 1.5}
                    style={{ transition: "all 0.4s ease" }}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Legend + scores panel */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-display font-semibold text-sm text-muted-foreground mb-2">Click a model to highlight</p>
            {filteredModels.map((model) => {
              const isActive = selectedModel === model.name;
              const avg = Math.round(model.scores.reduce((a, b) => a + b, 0) / model.scores.length);
              return (
                <motion.button
                  key={model.name}
                  onClick={() => setSelectedModel(isActive ? null : model.name)}
                  className={`w-full text-left rounded-xl p-4 border transition-all ${
                    isActive
                      ? "glass-card border-ring shadow-md scale-[1.02]"
                      : "bg-card/40 border-border/30 hover:bg-card/60"
                  }`}
                  layout
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: model.color }} />
                      <span className="font-display font-semibold text-sm">{model.name}</span>
                    </div>
                    <span className="font-display font-bold text-lg" style={{ color: model.color }}>{avg}</span>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 pt-3 border-t border-border/30"
                      >
                        {dimensions.map((dim, i) => (
                          <div key={dim} className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{dim}</span>
                            <span className="font-semibold">{model.scores[i]}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Charts from paper */}
        <motion.div className="mt-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-center">
            Paper <span className="text-gradient">Charts</span>
          </h3>
          
          {/* Chart toggle */}
          <div className="flex justify-center gap-2 mb-8">
            {chartOptions.map((chart) => (
              <button
                key={chart.id}
                onClick={() => setActiveChart(chart.id)}
                className={`px-5 py-2 rounded-full font-display text-sm font-medium transition-all ${
                  activeChart === chart.id ? "gradient-coral text-primary-foreground shadow-md" : "glass-card text-foreground hover:bg-card/90"
                }`}
              >
                {chart.title}
              </button>
            ))}
          </div>

          {/* Chart display with animation */}
          <AnimatePresence mode="wait">
            {chartOptions
              .filter((chart) => chart.id === activeChart)
              .map((chart) => (
                <motion.div
                  key={chart.id}
                  className="glass-card rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-background overflow-hidden cursor-pointer" style={{ aspectRatio: chart.aspectRatio }} onClick={() => setPreviewImage({ src: chart.src, alt: chart.title })}>
                    <img
                      src={chart.src}
                      alt={chart.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display font-semibold text-sm mb-2">{chart.title}</h4>
                    <p className="text-xs text-muted-foreground">{chart.description}</p>
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

export default BenchmarkSection;
