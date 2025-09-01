import { Button } from "@/components/ui/button";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap gap-3 p-6 bg-background border-b border-border">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "category-active" : "category"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};