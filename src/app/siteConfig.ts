export const siteConfig = {
  name: "Dashboard",
  url: "https://dashboard.tremor.so",
  description: "The only dashboard you will ever need.",
  baseLinks: {
    home: "/",
    overview: "/workspace/overview",
    details: "/workspace/details",
    settings: "/workspace/settings",
    general: "/workspace/settings/general",
    billing: "/workspace/settings/billing",
    users: "/workspace/settings/users",
  },
};

export type siteConfig = typeof siteConfig;
