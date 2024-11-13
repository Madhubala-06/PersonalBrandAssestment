export interface FormData {
    name: string;
    email: string;
    linkedIn: string;
    brandingInterest: string[];
    contentInterest: string[];
    aiToolUse: string;
    challenges: string;
    coachingInterest: string[];
    experienceRating: string[];
    communityAdvocateInterest: string[];
    experienceRatingComments: string;
    communityAdvocateComments: string;
    emailNotification: boolean;
  }
  
  export interface StepProps {
    formData: FormData;
    handleChange: (field: keyof FormData, value: string | string[] | boolean) => void;
    handleCheckboxChange: (field: keyof FormData, value: string) => void;
    nextStep: () => void;
    prevStep: () => void;
    renderCharCount: (text: string, maxLength: number) => string;
    handleSubmit?: () => void;
  }
  