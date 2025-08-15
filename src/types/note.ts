export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
  createdAt: string;
  updatedAt: string;
}

export type NoteId = Note["id"];

export interface NoteTag {
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}