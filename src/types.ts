export interface LeaveRequest {
  startDate: Date | null;
  endDate: Date | null;
  leaveType: string;
  reason: string;
  assignedTo: string;
  leaveDays: number;
}