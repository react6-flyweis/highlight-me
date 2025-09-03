import type { HashtagItem } from "./hashtagsColumns";

const sample: HashtagItem[] = [];
for (let i = 1; i <= 25; i++) {
  sample.push({
    id: `${i}`,
    name: `#tag${i}`,
    usageCount: Math.floor(Math.random() * 10000) + 100,
    trend: i % 3 === 0 ? "down" : i % 2 === 0 ? "up" : "flat",
  });
}

export default sample;
