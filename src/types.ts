export interface Repository {
  name: string;
  html_url: string;
  owner: {
    login: string;
    type: string;
    avatar_url: string;
  };
  forks: number;
  open_issues: number;
  watchers: number;
  id: number;
  stargazers_count: number;
  [key: string]: string | number | object;
}
