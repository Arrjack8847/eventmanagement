export type UserRole = "student" | "organizer" | "admin";

export interface Club {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
  whatsappNumber: string;
}

export interface Event {
  id: string;
  clubId: string;
  clubName: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  type: "free" | "paid";
  price?: number;
  capacity: number;
  registeredCount: number;
  status: "draft" | "published";
  createdBy: string;
}

export interface Registration {
  id: string;
  userId: string;
  userName: string;
  eventId: string;
  eventTitle: string;
  ticketId: string;
  paymentStatus: "pending" | "confirmed" | "na";
  checkedIn: boolean;
  checkedInAt?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
  universityId: string;
}

export interface Membership {
  id: string;
  clubId: string;
  clubName: string;
  status: "pending" | "member";
  joinedAt: string;
}

export const clubs: Club[] = [
  { id: "c1", name: "Robotics Society", description: "Building the future one robot at a time. Weekly workshops, competitions, and hackathons.", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop", memberCount: 87, whatsappNumber: "+60123456789" },
  { id: "c2", name: "Photography Club", description: "Capture moments, tell stories. Join us for photo walks, editing sessions, and exhibitions.", image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=250&fit=crop", memberCount: 124, whatsappNumber: "+60198765432" },
  { id: "c3", name: "Debate Society", description: "Sharpen your arguments and public speaking skills through competitive debate.", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop", memberCount: 56, whatsappNumber: "+60112345678" },
  { id: "c4", name: "Music Ensemble", description: "From classical to contemporary, unite through the universal language of music.", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=250&fit=crop", memberCount: 93, whatsappNumber: "+60187654321" },
  { id: "c5", name: "Entrepreneurship Club", description: "Launch your startup journey with workshops, mentoring, and pitch competitions.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=250&fit=crop", memberCount: 145, whatsappNumber: "+60176543210" },
];

export const events: Event[] = [
  { id: "e1", clubId: "c1", clubName: "Robotics Society", title: "RoboHack 2026", description: "24-hour robotics hackathon where teams compete to build autonomous robots. Prizes worth RM5,000! Food and drinks provided. Bring your laptop and creativity.", date: "2026-03-15", time: "09:00", location: "Engineering Lab B3", image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=600&h=350&fit=crop", type: "paid", price: 25, capacity: 120, registeredCount: 87, status: "published", createdBy: "u2" },
  { id: "e2", clubId: "c2", clubName: "Photography Club", title: "Golden Hour Photo Walk", description: "Explore campus during golden hour with professional photographer Sarah Lee. Learn composition, lighting, and storytelling through your lens.", date: "2026-03-08", time: "17:00", location: "Main Campus Gate", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=350&fit=crop", type: "free", capacity: 40, registeredCount: 32, status: "published", createdBy: "u3" },
  { id: "e3", clubId: "c3", clubName: "Debate Society", title: "Inter-University Debate Championship", description: "Annual championship featuring top debaters from 12 universities. Public viewing welcome. Come witness intellectual sparring at its finest.", date: "2026-03-22", time: "10:00", location: "Grand Auditorium", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=350&fit=crop", type: "free", capacity: 300, registeredCount: 178, status: "published", createdBy: "u4" },
  { id: "e4", clubId: "c4", clubName: "Music Ensemble", title: "Spring Concert Night", description: "An enchanting evening of classical and contemporary music performed by our talented ensemble. Special guest: Malaysian Philharmonic Orchestra soloist.", date: "2026-04-05", time: "19:30", location: "University Concert Hall", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=350&fit=crop", type: "paid", price: 15, capacity: 200, registeredCount: 156, status: "published", createdBy: "u5" },
  { id: "e5", clubId: "c5", clubName: "Entrepreneurship Club", title: "Startup Pitch Night", description: "5 student startups pitch to real investors. Network with VCs, founders, and fellow entrepreneurs. Free pizza!", date: "2026-03-28", time: "18:00", location: "Business School Atrium", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=350&fit=crop", type: "free", capacity: 150, registeredCount: 98, status: "published", createdBy: "u2" },
  { id: "e6", clubId: "c1", clubName: "Robotics Society", title: "Arduino Workshop for Beginners", description: "Hands-on workshop to get started with Arduino microcontrollers. All materials provided.", date: "2026-04-12", time: "14:00", location: "Engineering Lab A1", image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&h=350&fit=crop", type: "paid", price: 10, capacity: 30, registeredCount: 12, status: "draft", createdBy: "u2" },
  { id: "e7", clubId: "c2", clubName: "Photography Club", title: "Lightroom Masterclass", description: "Learn professional photo editing techniques using Adobe Lightroom. Bring your laptop.", date: "2026-04-18", time: "10:00", location: "Computer Lab 2", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=350&fit=crop", type: "paid", price: 20, capacity: 25, registeredCount: 8, status: "published", createdBy: "u3" },
  { id: "e8", clubId: "c5", clubName: "Entrepreneurship Club", title: "VC Office Hours", description: "One-on-one sessions with venture capitalists. Book your 15-minute slot.", date: "2026-04-22", time: "09:00", location: "Business School Room 401", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=350&fit=crop", type: "free", capacity: 20, registeredCount: 20, status: "published", createdBy: "u2" },
];

export const registrations: Registration[] = [
  { id: "r1", userId: "u1", userName: "Ahmad Razif", eventId: "e1", eventTitle: "RoboHack 2026", ticketId: "TKT-2026-001", paymentStatus: "confirmed", checkedIn: false, createdAt: "2026-02-20" },
  { id: "r2", userId: "u1", userName: "Ahmad Razif", eventId: "e2", eventTitle: "Golden Hour Photo Walk", ticketId: "TKT-2026-002", paymentStatus: "na", checkedIn: true, checkedInAt: "2026-03-08T17:05:00", createdAt: "2026-02-25" },
  { id: "r3", userId: "u1", userName: "Ahmad Razif", eventId: "e4", eventTitle: "Spring Concert Night", ticketId: "TKT-2026-003", paymentStatus: "pending", checkedIn: false, createdAt: "2026-03-01" },
  { id: "r4", userId: "u1", userName: "Ahmad Razif", eventId: "e5", eventTitle: "Startup Pitch Night", ticketId: "TKT-2026-004", paymentStatus: "na", checkedIn: false, createdAt: "2026-03-05" },
  { id: "r5", userId: "u6", userName: "Nurul Aisyah", eventId: "e1", eventTitle: "RoboHack 2026", ticketId: "TKT-2026-005", paymentStatus: "pending", checkedIn: false, createdAt: "2026-02-22" },
  { id: "r6", userId: "u7", userName: "Jason Tan", eventId: "e1", eventTitle: "RoboHack 2026", ticketId: "TKT-2026-006", paymentStatus: "confirmed", checkedIn: true, checkedInAt: "2026-03-15T09:12:00", createdAt: "2026-02-18" },
  { id: "r7", userId: "u8", userName: "Priya Sharma", eventId: "e3", eventTitle: "Inter-University Debate Championship", ticketId: "TKT-2026-007", paymentStatus: "na", checkedIn: false, createdAt: "2026-03-10" },
];

export const users: User[] = [
  { id: "u1", name: "Ahmad Razif", email: "ahmad.razif@campus.edu", role: "student", avatar: "", phone: "+60123456001", universityId: "CS2024001" },
  { id: "u2", name: "Dr. Sarah Chen", email: "sarah.chen@campus.edu", role: "organizer", avatar: "", phone: "+60123456002", universityId: "FAC2019012" },
  { id: "u3", name: "Marcus Lee", email: "marcus.lee@campus.edu", role: "organizer", avatar: "", phone: "+60123456003", universityId: "FAC2020034" },
  { id: "u4", name: "Fatimah Hassan", email: "fatimah.h@campus.edu", role: "organizer", avatar: "", phone: "+60123456004", universityId: "FAC2018056" },
  { id: "u5", name: "Prof. Raj Kumar", email: "raj.kumar@campus.edu", role: "admin", avatar: "", phone: "+60123456005", universityId: "ADM2015001" },
  { id: "u6", name: "Nurul Aisyah", email: "nurul.a@campus.edu", role: "student", avatar: "", phone: "+60123456006", universityId: "EE2024015" },
  { id: "u7", name: "Jason Tan", email: "jason.tan@campus.edu", role: "student", avatar: "", phone: "+60123456007", universityId: "ME2023042" },
  { id: "u8", name: "Priya Sharma", email: "priya.s@campus.edu", role: "student", avatar: "", phone: "+60123456008", universityId: "BZ2024008" },
];

export const memberships: Membership[] = [
  { id: "m1", clubId: "c1", clubName: "Robotics Society", status: "member", joinedAt: "2025-09-15" },
  { id: "m2", clubId: "c2", clubName: "Photography Club", status: "member", joinedAt: "2025-10-02" },
  { id: "m3", clubId: "c5", clubName: "Entrepreneurship Club", status: "pending", joinedAt: "2026-02-20" },
  { id: "m4", clubId: "c4", clubName: "Music Ensemble", status: "member", joinedAt: "2025-11-10" },
];

export const activityHistory = [
  { id: "a1", type: "club_joined" as const, title: "Joined Robotics Society", date: "2025-09-15", icon: "users" },
  { id: "a2", type: "club_joined" as const, title: "Joined Photography Club", date: "2025-10-02", icon: "users" },
  { id: "a3", type: "event_registered" as const, title: "Registered for RoboHack 2026", date: "2026-02-20", icon: "calendar" },
  { id: "a4", type: "event_registered" as const, title: "Registered for Golden Hour Photo Walk", date: "2026-02-25", icon: "calendar" },
  { id: "a5", type: "event_attended" as const, title: "Attended Golden Hour Photo Walk", date: "2026-03-08", icon: "check" },
  { id: "a6", type: "club_joined" as const, title: "Joined Music Ensemble", date: "2025-11-10", icon: "users" },
  { id: "a7", type: "event_registered" as const, title: "Registered for Spring Concert Night", date: "2026-03-01", icon: "calendar" },
  { id: "a8", type: "event_registered" as const, title: "Registered for Startup Pitch Night", date: "2026-03-05", icon: "calendar" },
];
