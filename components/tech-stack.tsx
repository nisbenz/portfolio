"use client";

import { motion } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiSharp,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiDjango,
  SiFastapi,
  SiNodedotjs,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiDocker,
  SiGit,
  SiLinux,
  SiPostgresql,
  SiMysql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { techStack } from "@/lib/data";

// Icon mapping for technologies
const techIcons: Record<string, any> = {
  Python: SiPython,
  Java: FaJava,
  C: SiCplusplus,
  "C#": SiSharp,
  Go: SiGo,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Next.js": SiNextdotjs,
  React: SiReact,
  Django: SiDjango,
  FastAPI: SiFastapi,
  "Node.js": SiNodedotjs,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  "scikit-learn": SiScikitlearn,
  Docker: SiDocker,
  Git: SiGit,
  Linux: SiLinux,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
};

interface TechItemProps {
  name: string;
  index: number;
}

function TechItem({ name, index }: TechItemProps) {
  const Icon = techIcons[name];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
    >
      {Icon && <Icon className="h-6 w-6 text-white/80" />}
      <span className="whitespace-nowrap text-base font-medium text-white/80">
        {name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const categories = [
    { title: "Languages", items: techStack.languages, color: "from-blue-500/20" },
    { title: "Web Frameworks", items: techStack.web, color: "from-purple-500/20" },
    { title: "AI & ML", items: techStack.ai, color: "from-green-500/20" },
    { title: "DevOps & Tools", items: techStack.devops, color: "from-orange-500/20" },
  ];

  return (
    <section id="stack" className="relative min-h-screen py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Tech Stack
          </h2>
          <p className="text-lg text-white/60">Technologies I work with</p>
        </motion.div>

        {/* Tech Categories */}
        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${category.color} to-transparent`} />
                <h3 className="text-xl font-semibold text-white/90 sm:text-2xl">
                  {category.title}
                </h3>
              </div>

              {/* Tech Items Grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {category.items.map((tech, index) => (
                  <TechItem key={tech} name={tech} index={index} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
