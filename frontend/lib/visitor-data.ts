export const VISITOR_STORAGE_KEY = 'portfolio-visitor-registered';

export type VisitorRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  purpose: string;
  visitedAt: string;
  userAgent: string;
  ip: string;
};
