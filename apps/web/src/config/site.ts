import { SiteConfig } from '@/types';
import { env } from '@/../env.mjs';
import icon from '@/assets/favicon.png';

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: 'Leap AI SDK',
  description: 'Leap AI SDK.',
  url: site_url,
  ogImage: icon.src,
  links: {
    twitter: 'https://twitter.com/leap',
    github: 'https://github.com/leap',
  },
  mailSupport: 'support@leap.com',
};
