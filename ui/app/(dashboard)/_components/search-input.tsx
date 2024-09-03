"use client";
import { useDebouce } from "@/hooks/useDebounce";
import { Input } from "@/lib/shadcn/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import qs from "query-string";

const SearchInput = () => {
  const searchParam = useSearchParams();
  const currentCategoryId = searchParam.get("categoryId");
  const currentSearch = searchParam.get("search");

  const [search, setSearch] = useState<string | undefined>(
    currentSearch || undefined
  );
  const debouncedSearch = useDebouce(search, 500);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const newPath = qs.stringifyUrl(
      {
        url: path,
        query: { categoryId: currentCategoryId, search: debouncedSearch },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(newPath);
  }, [currentCategoryId, debouncedSearch, path, router]);

  useEffect(() => {
    setSearch(currentSearch || undefined);
  }, [currentSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value === "" ? undefined : e.target.value);
  };

  return (
    <div className="md:w-[300px] flex flex-row items-center gap-2 border rounded-full px-4 bg-indigo-50 focus-within:border-gray-400">
      <Search size={16} />
      <Input
        className="pl-8 border-0 outline-0 px-0 bg-transparent"
        placeholder="Search for a course"
        value={search || ""}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
