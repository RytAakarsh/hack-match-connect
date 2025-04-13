
// Mock database to simulate storing and retrieving user profiles
// In a real app, this would be replaced with a proper backend API

export type TechStack = string;

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  profilePicture: string;
  collegeName: string;
  course: string;
  collegeYear: string;
  branch: string;
  techStack: TechStack[];
  yearsOfExperience: string;
  hackathonExperience: string;
}

// Mock data for initial profiles
const initialProfiles: UserProfile[] = [
  {
    id: '1',
    fullName: 'Alex Johnson',
    email: 'alex@example.com',
    profilePicture: '/placeholder.svg',
    collegeName: 'Tech University',
    course: 'Computer Science',
    collegeYear: '3rd Year',
    branch: 'Software Engineering',
    techStack: ['React', 'Node.js', 'MongoDB'],
    yearsOfExperience: '2',
    hackathonExperience: 'Participated in 3 hackathons, won first place in TechHacks 2023',
  },
  {
    id: '2',
    fullName: 'Jamie Smith',
    email: 'jamie@example.com',
    profilePicture: '/placeholder.svg',
    collegeName: 'Design Institute',
    course: 'Interaction Design',
    collegeYear: '4th Year',
    branch: 'UX/UI Design',
    techStack: ['Figma', 'Adobe XD', 'HTML/CSS'],
    yearsOfExperience: '3',
    hackathonExperience: 'Participated in 5 hackathons, specialized in UI design',
  },
  {
    id: '3',
    fullName: 'Taylor Wong',
    email: 'taylor@example.com',
    profilePicture: '/placeholder.svg',
    collegeName: 'State University',
    course: 'Computer Engineering',
    collegeYear: '2nd Year',
    branch: 'IoT Systems',
    techStack: ['Python', 'Arduino', 'AWS'],
    yearsOfExperience: '1',
    hackathonExperience: 'First-time hackathon participant, experienced with IoT projects',
  },
  {
    id: '4',
    fullName: 'Jordan Patel',
    email: 'jordan@example.com',
    profilePicture: '/placeholder.svg',
    collegeName: 'National Institute of Technology',
    course: 'Information Technology',
    collegeYear: 'Final Year',
    branch: 'Data Science',
    techStack: ['Python', 'TensorFlow', 'SQL', 'Data Visualization'],
    yearsOfExperience: '2',
    hackathonExperience: 'Participated in 2 AI-focused hackathons',
  },
];

// Simulate localStorage database
class MockDatabase {
  private storageKey = 'hackMatchProfiles';

  constructor() {
    // Initialize with mock data if no data exists
    if (!this.getAllProfiles().length) {
      localStorage.setItem(this.storageKey, JSON.stringify(initialProfiles));
    }
  }

  getAllProfiles(): UserProfile[] {
    const profiles = localStorage.getItem(this.storageKey);
    return profiles ? JSON.parse(profiles) : [];
  }

  addProfile(profile: Omit<UserProfile, 'id'>): UserProfile {
    const profiles = this.getAllProfiles();
    const newProfile = {
      ...profile,
      id: Date.now().toString(),
    };
    
    localStorage.setItem(this.storageKey, JSON.stringify([...profiles, newProfile]));
    return newProfile;
  }

  getProfileById(id: string): UserProfile | undefined {
    const profiles = this.getAllProfiles();
    return profiles.find(profile => profile.id === id);
  }
}

export const mockDb = new MockDatabase();
