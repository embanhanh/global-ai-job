/**
 * Supported notification types in the system
 */
export type NotificationType = "NEW_JOB_POSTED" | "NEW_APPLICATION";

/**
 * Base notification metadata interface
 */
export interface BaseNotificationMetadata {
  job_id: string;
  job_title: string;
}

/**
 * Metadata for NEW_JOB_POSTED notification
 */
export interface NewJobPostedMetadata extends BaseNotificationMetadata {
  company_id: string;
  company_name: string;
}

/**
 * Metadata for NEW_APPLICATION notification
 */
export interface NewApplicationMetadata extends BaseNotificationMetadata {
  candidate_id: string;
  candidate_name: string;
  application_id: string;
}

/**
 * Union type for all notification metadata
 */
export type NotificationMetadata =
  | NewJobPostedMetadata
  | NewApplicationMetadata;

/**
 * Database representation of a notification
 */
export interface NotificationRecord {
  id: string;
  user_id: string;
  type: NotificationType;
  metadata: NotificationMetadata;
  is_read: boolean;
  created_at: string;
}
