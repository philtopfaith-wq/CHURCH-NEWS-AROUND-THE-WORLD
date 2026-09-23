import { ProviderResult } from '../../types';

export interface IProvider {
  id: string;
  name: string;
  fetchArticles(signal?: AbortSignal): Promise<ProviderResult>;
}
