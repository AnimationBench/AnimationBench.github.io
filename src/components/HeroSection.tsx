import { motion } from "framer-motion";
import { FileText, Database, Play, Code, Eye, FlaskConical, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const buttons = [
  { label: "PDF", icon: FileText, variant: "default" as const, href: "/paper-assets/animationbench.pdf" },
  { label: "GitHub", icon: Github, variant: "outline" as const, href: "https://github.com/VideoVerses/AnimationBench" },
  { label: "Paper", icon: Globe, variant: "outline" as const, href: "https://arxiv.org/abs/2604.15299", target: "_blank" },
  { label: "Key Findings", icon: Play, variant: "outline" as const, href: "#results" },
  { label: "Model Scores", icon: Code, variant: "outline" as const, href: "#benchmark" },
  { label: "Evaluation Protocol", icon: FlaskConical, variant: "outline" as const, href: "#method" },
  { label: "Visual Comparisons", icon: Eye, variant: "outline" as const, href: "#human-eval" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Animated blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-coral/10 animate-blob blur-3xl" />
      <div
        className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-lavender/10 animate-blob blur-3xl"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full bg-mint/10 animate-blob blur-3xl"
        style={{ animationDelay: "4s" }}
      />

      <div className="container relative z-10 text-center px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
            <span className="text-gradient">AnimationBench</span>
          </h1>
          <p className="text-xl md:text-2xl font-display font-medium text-foreground/80 mb-4 max-w-3xl mx-auto">
            Are Video Models Good at Character-Centric Animation?
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            A real-data project page built from our paper and figures, covering IP Preservation, Animation Principles,
            and Broader Quality Dimensions.
          </p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-10 max-w-3xl mx-auto">
            {[
              { name: "Leyi Wu", aff: "¹˒²", marks: "*" },
              { name: "Pengjun Fang", aff: "¹", marks: "*" },
              { name: "Kai Sun", aff: "¹", marks: "*" },
              { name: "Yazhou Xing", aff: "¹˒⁵", marks: "†‡" },
              { name: "Yinwei Wu", aff: "¹", marks: "" },
              { name: "Songsong Wang", aff: "¹˒⁵", marks: "" },
              { name: "Ziqi Huang", aff: "³", marks: "" },
              { name: "Dan Zhou", aff: "⁴", marks: "" },
              { name: "Yingqing He", aff: "¹˒⁵", marks: "" },
              { name: "Ying-Cong Chen", aff: "¹˒²", marks: "" },
              { name: "Qifeng Chen", aff: "¹˒⁵", marks: "†" },
            ].map((a, i) => (
              <span key={i} className="text-sm text-muted-foreground">
                {a.name}
                <sup>
                  {a.aff}
                  {a.marks}
                </sup>
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mb-10 -mt-6">
            <sup>1</sup>HKUST &nbsp; <sup>2</sup>HKUST(GZ) &nbsp; <sup>3</sup>NTU &nbsp; <sup>4</sup>Pearl Studio &nbsp; <sup>5</sup>New AI Labs
            <br />
            <span className="mt-1 inline-block">
              *Equal Contribution &nbsp; †Corresponding Author &nbsp; ‡Project Lead
            </span>
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {buttons.map((btn) => (
            <Button
              key={btn.label}
              asChild
              variant={btn.variant}
              size="lg"
              className={`rounded-full gap-2 font-display text-base ${
                btn.variant === "default"
                  ? "gradient-coral shadow-lg shadow-coral/25 border-0 text-primary-foreground hover:opacity-90"
                  : "glass-card hover:scale-105 hover:shadow-lg transition-transform"
              }`}
            >
              <a href={btn.href} target={btn.href?.startsWith("#") ? "_self" : "_blank"} rel="noreferrer">
                <btn.icon size={18} />
                {btn.label}
              </a>
            </Button>
          ))}
        </motion.div>

        <motion.p
          className="mt-12 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          🏆 8 SOTA video models evaluated across 19 dimensions with a VLM-based scoring pipeline
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
