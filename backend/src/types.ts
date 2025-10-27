export interface Expert {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  verified: boolean;
  avatar: string;
  description: string;
  tags: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  step: number;
}

export interface PlatformStats {
  professionals: number;
  completedProjects: number;
  satisfaction: number;
}

export interface BookingRequest {
  name: string;
  phone: string;
  serviceId: string;
  scheduledFor: string;
  description?: string;
  city: string;
}

export interface Booking extends BookingRequest {
  id: string;
  createdAt: string;
}
