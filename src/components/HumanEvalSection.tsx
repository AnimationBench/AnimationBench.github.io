import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trophy, RotateCcw } from "lucide-react";

interface Trial {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  videoA: string;
  videoB: string;
  modelA: string;
  modelB: string;
  benchmarkPreference: "A" | "B";
}

const trials: Trial[] = [
  {
    id: 1,
    question: "Which video better preserves IP appearance consistency during a 360° rotation?",
    optionA: "Character maintains canonical visual features across views",
    optionB: "Character appearance drifts significantly during rotation",
    videoA: "/videos/trial1_a.mp4",
    videoB: "/videos/trial1_b.mp4",
    modelA: "Sora2-Pro",
    modelB: "HunyuanVideo",
    benchmarkPreference: "A",
  },
  {
    id: 2,
    question: "Which output better demonstrates anticipation before the main action?",
    optionA: "Clear preparatory motion (crouch before jump)",
    optionB: "Action starts abruptly without anticipation",
    videoA: "/videos/trial2_a.mp4",
    videoB: "/videos/trial2_b.mp4",
    modelA: "Veo3.1",
    modelB: "Framepack",
    benchmarkPreference: "A",
  },
  {
    id: 3,
    question: "Which video shows better squash-and-stretch deformation quality?",
    optionA: "Controlled area preservation during impact/rebound",
    optionB: "Area changes inconsistently, breaking volume illusion",
    videoA: "/videos/trial3_a.mp4",
    videoB: "/videos/trial3_b.mp4",
    modelA: "Seedance-Pro",
    modelB: "Wan2.2",
    benchmarkPreference: "A",
  },
  {
    id: 4,
    question: "Which model better maintains semantic consistency with the prompt?",
    optionA: "Object types, actions, and scene match prompt accurately",
    optionB: "Multiple semantic mismatches (wrong objects/colors)",
    videoA: "/videos/trial4_a.mp4",
    videoB: "/videos/trial4_b.mp4",
    modelA: "Kling2.6",
    modelB: "HunyuanVideo",
    benchmarkPreference: "A",
  },
];

const HumanEvalSection = () => {
  const [currentTrial, setCurrentTrial] = useState(0);
  const [userChoice, setUserChoice] = useState<"A" | "B" | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const trial = trials[currentTrial];

  const handleSelect = (choice: "A" | "B") => {
    if (revealed) return;
    setUserChoice(choice);
    setTimeout(() => {
      setRevealed(true);
      setTotalAnswered((p) => p + 1);
      if (choice === trial.benchmarkPreference) setMatchCount((p) => p + 1);
    }, 400);
  };

  const handleNext = () => {
    setUserChoice(null);
    setRevealed(false);
    setCurrentTrial((p) => (p + 1) % trials.length);
  };

  const handleReset = () => {
    setCurrentTrial(0);
    setUserChoice(null);
    setRevealed(false);
    setMatchCount(0);
    setTotalAnswered(0);
  };

  const matched = revealed && userChoice === trial.benchmarkPreference;

  return (
    <section className="py-24 px-4 gradient-hero" id="human-eval">
      <div className="container max-w-4xl">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            🧑‍⚖️ Human <span className="text-gradient">Alignment</span> Study
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Simulating the paper's human preference study: annotators compared paired outputs from four closed-source models using win-ratio metrics. AnimationBench scores show strong Spearman correlation with human judgments.
          </p>
        </motion.div>

        {/* Score bar */}
        {totalAnswered > 0 && (
          <motion.div
            className="glass-card rounded-full px-6 py-3 flex items-center justify-between max-w-sm mx-auto mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-display text-sm font-medium text-muted-foreground">Agreement Score</span>
            <span className="font-display font-bold text-lg text-gradient">
              {matchCount}/{totalAnswered}
            </span>
          </motion.div>
        )}

        {/* Question */}
        <motion.div className="glass-card rounded-2xl p-8 mb-6" layout>
          <p className="text-center font-display text-lg font-medium mb-2 text-muted-foreground">
            Question {currentTrial + 1} of {trials.length}
          </p>
          <p className="text-center font-display text-xl font-semibold mb-8">{trial.question}</p>

          <div className="grid md:grid-cols-2 gap-4">
            {(["A", "B"] as const).map((side) => {
              const isSelected = userChoice === side;
              const isBenchmark = revealed && trial.benchmarkPreference === side;
              const videoSrc = side === "A" ? trial.videoA : trial.videoB;
              const modelName = side === "A" ? trial.modelA : trial.modelB;
              return (
                <motion.button
                  key={side}
                  onClick={() => handleSelect(side)}
                  disabled={revealed}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all text-left ${
                    revealed
                      ? isBenchmark
                        ? "border-mint bg-mint/10 shadow-lg"
                        : "border-border/30 bg-muted/30 opacity-60"
                      : isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border/50 bg-card/50 hover:border-primary/40 hover:bg-card/80"
                  }`}
                  whileHover={!revealed ? { scale: 1.02 } : {}}
                  whileTap={!revealed ? { scale: 0.98 } : {}}
                >
                  {/* Video area */}
                  <div className="aspect-video bg-muted/50 relative overflow-hidden">
                    <video
                      src={videoSrc}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={(e) => {
                        (e.target as HTMLVideoElement).style.display = 'none';
                      }}
                    />
                    {/* Placeholder overlay when video not loaded */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40 pointer-events-none">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span className="text-xs font-display">Video {side}</span>
                    </div>
                    {/* Model name badge - hidden until revealed */}
                    {revealed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs font-display font-semibold"
                      >
                        {modelName}
                      </motion.div>
                    )}
                  </div>

                  <div className="p-5">
                    <span className="text-xs font-display font-bold text-muted-foreground mb-2 block">Option {side}</span>
                    <p className="font-body text-sm">{side === "A" ? trial.optionA : trial.optionB}</p>
                  </div>

                  {/* Badges */}
                  <AnimatePresence>
                    {revealed && isBenchmark && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full gradient-mint flex items-center justify-center shadow-md"
                      >
                        <Check size={16} className="text-accent-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Result reveal */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-display font-semibold ${
                  matched ? "bg-mint/20 text-mint" : "bg-coral/15 text-coral"
                }`}>
                  {matched ? (
                    <><Trophy size={18} /> You matched our benchmark! 🎉</>
                  ) : (
                    <>Benchmark prefers Option {trial.benchmarkPreference} 🤔</>
                  )}
                </div>
                <div className="mt-4 flex justify-center gap-3">
                  <button onClick={handleNext} className="px-5 py-2 rounded-full gradient-coral text-primary-foreground font-display text-sm font-medium shadow-md hover:opacity-90 transition">
                    Next Question →
                  </button>
                  <button onClick={handleReset} className="px-4 py-2 rounded-full glass-card font-display text-sm font-medium hover:bg-card/90 transition flex items-center gap-1">
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HumanEvalSection;
