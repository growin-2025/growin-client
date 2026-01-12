import { getUserMe } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

interface useUserQueryProps {
  enabled?: boolean;
}

export const useUserQuery = ({ enabled }: useUserQueryProps) => {
  return useQuery({
    queryKey: ["getUserMe"],
    queryFn: getUserMe,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};
