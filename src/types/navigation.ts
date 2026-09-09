export interface NavSubItem {
  label: string;
  href: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  subItems?: (NavSubItem & {
    children?: NavSubItem[];
  })[];
}

export interface NavConfig {
  mainNav: NavItem[];
}
