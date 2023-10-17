export interface UABrowser {
  name: string;
  version: string;
}

export interface UserAgent {
  browser: UABrowser;
  isMobile: boolean;
  isSupportAvif: boolean;
}
