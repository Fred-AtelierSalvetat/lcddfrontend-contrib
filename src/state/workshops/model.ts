import type { WorkshopStatusType } from './constants/status.ts';
import type { Topic } from '../topics/model';

export type Speaker = string;

export type RefLegiFrance = string;

export type File = {
  name: string;
  path: string;
};

export type Link = {
  title: string;
  url: string;
};

export type Status = {
  value: WorkshopStatusType;
  label: string;
};

export type KeyWord = string;

export type SearchFilter = string;
export type OrderBy = string;

export type Workshop = {
  id: string;
  status: Status;
  thumbnail: string;
  video: string;
  title: string;
  startingdate: date;
  endingdate: date;
  speakers: Speaker[];
  topics: Topic[];
  refsLegifrance: RefLegiFrance[];
  description: string;
  keywords: KeyWord[];
  files: File[];
  links: Link[];
};

export type WorkshopsState = {
  workshops: Workshop[];
  searchFilter: SearchFilter;
  orderBy: OrderBy;
};
