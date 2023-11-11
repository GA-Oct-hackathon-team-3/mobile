export interface UserProfile {
  name: string;
  dob: string; // Alternatively, you could use Date if you're going to convert this into a Date object.
  gender: string; // If there are specific values this could take, consider using a union type, e.g., 'male' | 'female' | 'other'.
  photo: string;
  bio: string;
  interests: string[];
  location: string;
}
