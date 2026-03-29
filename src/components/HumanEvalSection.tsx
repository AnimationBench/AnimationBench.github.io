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
  /** Tailwind aspect class for the video frame; default 16:9 (`aspect-video`). Ignored when `intrinsicVideo` is true. */
  videoAspectClass?: string;
  /** Use source aspect ratio in-layout (no cropped cover box, no letterboxing from a fixed aspect wrapper). */
  intrinsicVideo?: boolean;
}

/** Paired clips under public/user_study_video/study_* — filenames mark model (e.g. kling-ai-kling-v2-6) and better/worse vs expert preference. */
const trials: Trial[] = [
  {
    id: 1,
    question:
      "Which clip keeps MiloFinch’s character appearance more consistent and on-model?",
    optionA: "Prefer the left clip for appearance.",
    optionB: "Prefer the right clip for appearance.",
    videoA: "/user_study_video/study_1/worse_google-veo3-1_MiloFinch_appearance.mp4",
    videoB: "/user_study_video/study_1/better_bytedance-seedance-pro_MiloFinch_appearance_1280x720_pad_white.mp4",
    modelA: "Veo 3.1",
    modelB: "Seedance Pro",
    benchmarkPreference: "B",
    intrinsicVideo: true,
  },
  {
    id: 2,
    question: "Which clip shows clearer animation anticipation before Patrick’s main action?",
    optionA: "I prefer the left clip for anticipation timing.",
    optionB: "I prefer the right clip for anticipation timing.",
    videoA: "/user_study_video/study_2/better_kling-ai-kling-v2-6_patrick_anticipation.mp4",
    videoB: "/user_study_video/study_2/worse_bytedance-seedance-pro_patrick_anticipation.mp4",
    modelA: "Kling v2.6",
    modelB: "Seedance Pro",
    benchmarkPreference: "A",
  },
  {
    id: 3,
    question:
      "Which cartoon-ball clip has more convincing motion and cartoon-style appeal (same seed; different models)?",
    optionA: "I prefer the left clip for motion and style.",
    optionB: "I prefer the right clip for motion and style.",
    videoA: "/user_study_video/study_3/worse_google-veo3-1_cartoon_ball_000_seed114514.mp4",
    videoB: "/user_study_video/study_3/better_bytedance-seedance-pro_cartoon_ball_000_seed114514_1.mp4",
    modelA: "Veo 3.1",
    modelB: "Seedance Pro",
    benchmarkPreference: "B",
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
            Three blind paired comparisons from our human alignment study: pick the stronger clip, then we reveal which model produced each side. Bundled study videos use filenames (<span className="whitespace-nowrap">better_*</span> /{" "}
            <span className="whitespace-nowrap">worse_*</span>) for generator ids and reference preference; AnimationBench scores aim to track these judgments at scale.
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

          <div className="grid min-w-0 md:grid-cols-2 gap-4 md:items-start">
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
                  className={`relative min-w-0 rounded-xl overflow-hidden border-2 transition-all text-left ${
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
                  <div
                    className={
                      trial.intrinsicVideo
                        ? "w-full min-w-0 overflow-hidden rounded-t-xl bg-muted/50 relative isolate"
                        : `${trial.videoAspectClass ?? "aspect-video"} bg-muted/50 relative overflow-hidden`
                    }
                  >
                    <video
                      src={videoSrc}
                      className={
                        trial.intrinsicVideo
                          ? "block w-full min-w-0 max-w-full h-auto align-middle"
                          : "w-full h-full object-cover"
                      }
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={(e) => {
                        (e.target as HTMLVideoElement).style.display = 'none';
                      }}
                    />
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

                  <div className="p-5 min-w-0">
                    <span className="text-xs font-display font-bold text-muted-foreground mb-2 block">Option {side}</span>
                    <p
                      className={`font-body text-sm hyphens-none ${
                        trial.intrinsicVideo ? "md:whitespace-nowrap" : ""
                      }`}
                    >
                      {side === "A" ? trial.optionA : trial.optionB}
                    </p>
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
