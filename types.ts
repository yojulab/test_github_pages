import { LucideIcon } from 'lucide-react';

export interface FrameworkItem {
  id: string;
  icon: LucideIcon;
  color: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  linkText: string;
}

export interface ResearchItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}