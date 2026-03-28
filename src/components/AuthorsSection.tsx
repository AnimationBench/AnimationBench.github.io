import { motion } from "framer-motion";

const authors = [
  { name: "Firstname1 Lastname1", affiliation: "University A", avatar: "🧑‍🔬" },
  { name: "Firstname2 Lastname2", affiliation: "University B", avatar: "👩‍🔬" },
  { name: "Firstname3 Lastname3", affiliation: "University A", avatar: "👨‍💻" },
  { name: "Firstname4 Lastname4", affiliation: "University C", avatar: "👩‍💻" },
  { name: "Firstname5 Lastname5", affiliation: "University B", avatar: "🧑‍🎓" },
];

const AuthorsSection = () => {
  return (
    <section className="py-16 px-4" id="authors">
      <div className="container max-w-4xl">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-3xl mb-3 block">👥</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Authors</h2>
          <p className="text-muted-foreground text-sm">Equal contribution from all authors</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {authors.map((author, i) => (
            <motion.div
              key={author.name}
              className="glass-card rounded-2xl p-5 text-center min-w-[160px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-4xl block mb-3">{author.avatar}</span>
              <p className="font-display font-semibold text-sm text-foreground">{author.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{author.affiliation}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorsSection;
