import { Gauge, HandshakeIcon, Layers } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IconCard } from "@/components/ui/Card";

const icons = [HandshakeIcon, Gauge, Layers];

export function ValueGrid({ dict }: { dict: Dictionary }) {
  const t = dict.home.values;

  return (
    <Section>
      <SectionHeader title={t.title} sub={t.sub} />
      <div className="grid gap-6 md:grid-cols-3">
        {t.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 90}>
            <IconCard
              icon={icons[index] ?? Layers}
              title={item.title}
              body={item.body}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
