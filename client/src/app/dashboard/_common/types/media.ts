export interface CreateDashboardMedia {
  name: string;
  file: string;

  type: "image" | "video";
}
export interface DashboardMedia {
  id: number;
  name: string;
  url: string;
  type: "image" | "video";
  public_id: string;
}
