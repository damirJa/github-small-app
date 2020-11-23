import { Repository } from "@/types";

export const unique = (arr: Repository[]) => {
  const dict = new Set();
  const uniqueArr: Repository[] = [];
  arr.forEach((repo, idx) => {
    if (!dict.has(repo.id)) {
      uniqueArr.push(repo);
      dict.add(repo.id);
    }
  });
  return uniqueArr;
};
