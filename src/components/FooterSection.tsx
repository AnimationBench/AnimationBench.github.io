import { FileText, Image, BarChart3 } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-16 px-4 border-t border-border/50" id="citation">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <span className="text-3xl mb-4 block">🎬✨</span>
          <h3 className="font-display font-bold text-2xl mb-2">AnimationBench</h3>
          <p className="text-sm text-muted-foreground">Are Video Models Good at Character-Centric Animation?</p>
        </div>

        {/* Citation */}
        <div className="glass-card rounded-2xl p-6 mb-10">
          <p className="font-display font-semibold text-sm mb-3 text-muted-foreground">📎 Citation</p>
          <pre className="text-xs text-muted-foreground bg-muted/50 rounded-xl p-4 overflow-x-auto font-body leading-relaxed">
{`@article{wu2026animationbench,
  title   = {AnimationBench: Are Video Models Good at
             Character-Centric Animation?},
  author  = {Leyi Wu and Pengjun Fang and Kai Sun and
             Yazhou Xing and Yingqing He and Yinwei Wu and
             Songsong Wang and Ziqi Huang and Dan Zhou and
             Ying-Cong Chen and Qifeng Chen},
  journal = {arXiv preprint arXiv:26XX.XXXXX},
  year    = {2026}
}`}
          </pre>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a href="/paper-assets/example_paper.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-display">
            <FileText size={16} /> Paper PDF
          </a>
          <a href="#gallery" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-display">
            <Image size={16} /> Figures
          </a>
          <a href="#benchmark" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-display">
            <BarChart3 size={16} /> Results
          </a>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
