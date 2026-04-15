import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, ClipboardCheck } from "lucide-react";

interface PromptSuiteData {
  characterName: string;
  generation: {
    appearance: {
      summary: string;
      details: Record<string, string>;
    };
    behavior: Record<string, string>;
  };
  evaluation: {
    appearance: {
      summary: string;
      details: Record<string, string[]>;
    };
    behavior: Record<string, string[]>;
  };
}

interface PromptSuitePanelProps {
  data: PromptSuiteData;
}

const PromptSuitePanel = ({ data }: PromptSuitePanelProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"generation" | "evaluation">("generation");

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full glass-card rounded-2xl p-4 flex items-center justify-between hover:shadow-xl transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-lavender flex items-center justify-center text-primary-foreground shadow-lg shrink-0">
            <FileText size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-display font-bold text-sm">Prompt Suite — {data.characterName}</h4>
            <p className="text-xs text-muted-foreground">View generation & evaluation prompts</p>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full gradient-coral flex items-center justify-center shadow-md transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronDown size={16} className="text-primary-foreground" />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="glass-card rounded-2xl mt-2 p-5">
              {/* Tabs */}
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => setActiveTab("generation")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all ${
                    activeTab === "generation"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "glass-card hover:bg-card/90"
                  }`}
                >
                  <FileText size={14} />
                  Generation Prompt
                </button>
                <button
                  onClick={() => setActiveTab("evaluation")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all ${
                    activeTab === "evaluation"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "glass-card hover:bg-card/90"
                  }`}
                >
                  <ClipboardCheck size={14} />
                  Evaluation Prompt
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "generation" ? (
                  <motion.div
                    key="gen"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-5 text-sm"
                  >
                    {/* Appearance */}
                    <div>
                      <h5 className="font-display font-bold text-foreground mb-2">📐 Canonical Appearance</h5>
                      <p className="text-muted-foreground mb-3 italic">{data.generation.appearance.summary}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {Object.entries(data.generation.appearance.details).map(([view, desc]) => (
                          <div key={view} className="bg-muted/30 rounded-xl p-3">
                            <span className="font-display font-semibold text-foreground text-xs uppercase block mb-1">{view}</span>
                            <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Behavior */}
                    <div>
                      <h5 className="font-display font-bold text-foreground mb-2">🎭 Canonical Behavior</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(data.generation.behavior).map(([key, val]) => (
                          <div key={key} className="bg-muted/30 rounded-xl p-3">
                            <span className="font-display font-semibold text-foreground text-xs block mb-1">{key}</span>
                            <p className="text-muted-foreground text-xs leading-relaxed">{val}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="eval"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-5 text-sm"
                  >
                    {/* Appearance */}
                    <div>
                      <h5 className="font-display font-bold text-foreground mb-2">📐 Appearance Evaluation</h5>
                      <p className="text-muted-foreground mb-3 italic">{data.evaluation.appearance.summary}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {Object.entries(data.evaluation.appearance.details).map(([view, questions]) => (
                          <div key={view} className="bg-muted/30 rounded-xl p-3">
                            <span className="font-display font-semibold text-foreground text-xs uppercase block mb-2">{view}</span>
                            <ul className="space-y-1">
                              {questions.map((q, i) => (
                                <li key={i} className="text-muted-foreground text-xs leading-relaxed flex items-start gap-1.5">
                                  <span className="text-primary shrink-0 mt-0.5">•</span>
                                  {q}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Behavior */}
                    <div>
                      <h5 className="font-display font-bold text-foreground mb-2">🎭 Behavior Evaluation</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(data.evaluation.behavior).map(([key, questions]) => (
                          <div key={key} className="bg-muted/30 rounded-xl p-3">
                            <span className="font-display font-semibold text-foreground text-xs block mb-2">{key}</span>
                            <ul className="space-y-1">
                              {questions.map((q, i) => (
                                <li key={i} className="text-muted-foreground text-xs leading-relaxed flex items-start gap-1.5">
                                  <span className="text-primary shrink-0 mt-0.5">•</span>
                                  {q}
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
  );
};

export default PromptSuitePanel;
