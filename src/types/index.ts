export interface Assignee {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  size: string;
}

export type TaskLabel = 'Feature' | 'Bug' | 'Issue' | 'Undefined';
export type TaskPriority = 'Low' | 'Medium' | 'High' | null;

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  assignees: string[]; // array of Assignee IDs
  dueDate: string; // ISO string
  label: TaskLabel;
  priority: TaskPriority;
  checklist: ChecklistItem[];
  attachments: Attachment[];
  coverImage: string | null;
  createdAt: string; // ISO string
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}
