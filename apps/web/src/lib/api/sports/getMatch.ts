import { api_paths } from '@/lib/api-routes';
import { getMockMatchDetail } from '@/mock/leap';
import { MatchDto } from '@/types/api/match';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';

export async function getMatch(matchId: string): Promise<MatchDto | null> {
  const url = api_paths.leap.public.get_match(matchId);

  return fetchClient<MatchDto | null>(url, { token: process.env.Token });
}

export function useGetMatch(Id: string) {
  return useQuery<MatchDto | null>({
    queryKey: ['match', Id],
    queryFn: () => getMockMatchDetail(Id),
  });
}

export function prefetchMatch(queryClient: QueryClient, Id: string) {
  return queryClient.prefetchQuery({
    queryKey: ['match', Id],
    queryFn: () => getMockMatchDetail(Id),
  });
}
