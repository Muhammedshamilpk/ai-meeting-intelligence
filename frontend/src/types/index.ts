export interface ActionItem {
  task: string;
  owner: string;
  deadline: string | null;
}

export interface Meeting {
  id: number;
  meeting_id:number;
  original_filename: string;
  stored_filename: string;
  transcript: string;
  summary: string;
  action_items: ActionItem[];
  email: string;

  uploaded_at: string;   // ✅ matches backend
}

export interface UploadResponse {
  status: string;
  meeting_id: number;
  original_filename: string;
  stored_filename: string;
  transcript: string;
  summary: string;
  action_items: ActionItem[];
  email: string;
}