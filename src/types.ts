export interface TaskSchedule {
  id: string;
  name: string;
  icon: string;
  description: string;
  interval: string;
  status: 'running' | 'sleeping' | 'idle' | 'success' | 'failed';
  lastRun: string;
  nextRun: string;
  averageExecutionTime: number; // in ms
}

export interface LogMessage {
  id: string;
  timestamp: string;
  task: 'ContentGenerator' | 'CommentModerator' | 'MessengerBot' | 'AnalyticsTracker' | 'System' | 'Ollama' | 'FacebookAPI';
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
  message: string;
}

export interface Post {
  id: string;
  content: string;
  type: 'Text' | 'Image' | 'Video' | 'Reel';
  imageSrc?: string;
  videoSrc?: string;
  publishedAt: string;
  reach: number;
  reactions: Record<string, number>;
  comments: number;
  shares: number;
  niche: string;
  canvaTemplateUrl?: string;
}

export interface Group {
  id: string;
  name: string;
  members: string;
  activity: string;
  joined: boolean;
  engagementTemplate: string;
}

export interface VoiceTask {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  priority: 'High' | 'Medium' | 'Low';
  alarmMinutesBefore: number;
  timeSlot?: string; // e.g. "09:00", "14:30"
}

export interface ProductFeedItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}

export interface CanvaDesign {
  id: string;
  name: string;
  type: 'Ad' | 'Story' | 'Post';
  canvaLink: string;
  thumbnail: string;
  fields: string[];
}

export interface PageProfileData {
  name: string;
  category: string;
  bio: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  followers: number;
  pageId: string;
  coverPhoto: string;
  profilePic: string;
}
