"use client";
import { Category } from "@/models/course";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect } from "react";
import CategoryItem from "./category-item";
import { iconMap } from "./icons";

interface Props {
  categories: Category[];
}
const CategoryList = ({ categories }: Props) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId");
  const search = searchParams.get("search");

  const handleCategoryClick = (categoryId: string) => {
    const newPath = qs.stringifyUrl(
      {
        url: path,
        query: {
          categoryId: selectedCategoryId === categoryId ? null : categoryId,
          search: search,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(newPath);
  };

  return (
    <div className="w-full flex flex-row items-center gap-2 overflow-auto default-scrollbar">
      {categories.map((category, index) => (
        <CategoryItem
          key={index}
          category={category}
          icon={iconMap[category.name as keyof typeof iconMap]}
          isSelected={selectedCategoryId === category.id}
          onClick={() => handleCategoryClick(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
