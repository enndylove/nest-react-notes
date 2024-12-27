export interface Topic {
  id: number;
  name: string;
  children?: Topic[];
}

export interface Note {
  id: number;
  title: string;
  content: string;
} 