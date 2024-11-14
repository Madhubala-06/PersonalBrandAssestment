'use client';
import React, { useState, useEffect } from 'react';
import { MoveRight, MoveLeft, XIcon } from 'lucide-react';
import { FormData, StepProps } from './type';
import CustomCheckbox from '../CustomCheckbox';
import PersonalDetails from '../PersonalDetails';
import Image from 'next/image';

const NavigationButtons: React.FC<{
    onPrev: () => void;
    onNext: () => void;
    nextLabel?: string;
    disabled?: boolean;
}> = ({ onPrev, onNext, nextLabel = "Continue", disabled = false }) => (
    <div className="flex mt-2 justify-between">
        <button
            className="mt-5 h-full rounded-lg py-3 px-3 border border-[#EBEBEB]"
            onClick={onPrev}
        >
            <MoveLeft className="h-4 w-4" />
        </button>
        <button
            onClick={onNext}
            disabled={disabled}
            className="mt-4  flex justify-center items-center gap-x-2  rounded-lg  bg-gradient-to-r from-[#6562aa] to-[#9996DE] text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {nextLabel} 
            <MoveRight className="h-4 w-4" />
        </button>
    </div>
);


const WelcomeStep: React.FC<{ onNext: () => void; onClose: () => void }> = ({ onNext, onClose }) => (
    <div className="text-center">
        <button onClick={onClose} className="absolute top-3 right-4">
            <XIcon className="h-5 w-5 text-gray-600" />
        </button>
        <Image src="/ModalLogo.png" className="h-12 w-12 mx-auto mt-5" alt="" width={200} height={200} />
        <h2 className="text-xl font-semibold mb-4 mt-6">Unleash Your Personal Brand Potential!</h2>
        <p className="mb-6 text-sm text-gray-600">
            Ever wonder how your personal brand is perceived? Take our quick assessment to uncover insights
            that will help you refine your personal and professional image.
        </p>
        <div className="text-sm text-gray-600">
            <span className="-ml-4">🔍 Get Tailored Branding Tips</span>
            <span className="pl-2">📊 Instantly Analyze Your Online Presence</span>
        </div>
        <button
            className="mt-6 mb-8 gap-x-2 flex mx-auto bg-gradient-to-r from-[#6562aa] to-[#9996DE] text-white px-6 py-3 rounded-3xl hover:bg-violet-700"
            onClick={onNext}
        >
            Start Assessment <MoveRight className="h-5 w-5 self-center" />
        </button>
    </div>
);

const CheckboxStep: React.FC<StepProps & {
    title: string;
    subtitle?: string;
    stepNumber: string;
    options: string[];
    field: keyof FormData;
}> = ({ title, subtitle, stepNumber, options, field, formData, handleCheckboxChange }) => (
    <div>
        <p className="text-sm mb-2">{stepNumber}</p>
        <h3 className="text-xl font-medium mb-4 bg-gradient-to-r from-[#6A67AF] to-[#9996DE] bg-clip-text text-transparent">
            {title}
        </h3>
        {subtitle && <div className="text-sm text-gray-500 mb-4">{subtitle}</div>}
        {options.map(option => (
            <CustomCheckbox
                key={option}
                checked={(formData[field] as string[]).includes(option)}
                label={option}
                onChange={() => handleCheckboxChange(field, option)}
                isPersonalDetail ={false}

            />
        ))}
    </div>
);

const TextAreaStep: React.FC<StepProps & {
    title: string;
    stepNumber: string;
    field: keyof FormData;
    subtitle?: string;
}> = ({ title, stepNumber, field, subtitle, formData, handleChange, nextStep, prevStep, renderCharCount }) => (
    <div>
        <p className="text-sm mb-2">{stepNumber}</p>
        <h3 className="text-xl font-medium mb-4 bg-gradient-to-r from-[#6A67AF] to-[#9996DE] bg-clip-text text-transparent">
            {title}
        </h3> {subtitle && <label className="text-sm mb-2 block text-gray-500">{subtitle}</label>}
        <div className="relative">
            <textarea
                placeholder="Write here..."
                value={formData[field] as string}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full p-2 border mb-1 rounded-lg h-80 resize-none"
                maxLength={300}
            />
            <p className="absolute bottom-5 right-3 text-xs text-gray-900">
                {renderCharCount(formData[field] as string, 300)} Words
            </p>
        </div>
        <NavigationButtons
            onPrev={prevStep}
            onNext={nextStep}
            disabled={(formData[field] as string).length === 0}
        />
    </div>
);

const PersonalBrandingModal: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        linkedIn: '',
        brandingInterest: [],
        contentInterest: [],
        aiToolUse: '',
        challenges: '',
        coachingInterest: [],
        experienceRating: [],
        communityAdvocateInterest: [],
        experienceRatingComments: '',
        communityAdvocateComments: '',
        emailNotification: false,
    });

    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    const handleChange = (field: keyof FormData, value: string | string[] | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (field: keyof FormData, value: string) => {
        setFormData(prev => {
            const currentValues = prev[field] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentStep(1);
    };

    const handleSubmit = async () => {
        console.log('Final data for store it in DB', formData);
        setIsModalOpen(false);
        setCurrentStep(1);
      
        try {
          const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',  
            },
            body: JSON.stringify(formData),  
          });
      
          if (response.ok) {
            console.log('Data stored successfully');
          } else {
            console.error('Error storing data', response.status);
          }
        } catch (error) {
          console.error('Error sending data to the server:', error);
        }
      };
        
    const renderCharCount = (text: string, maxLength: number) => `${text.length}/${maxLength}`;

    if (!isModalOpen) return null;

    const renderStep = () => {
        const commonProps = {
            formData,
            handleChange,
            handleCheckboxChange,
            nextStep,
            prevStep,
            renderCharCount,
        };

        switch (currentStep) {
            case 1:
                return <WelcomeStep onNext={nextStep} onClose={closeModal} />;
            case 2:
                return <PersonalDetails {...commonProps} onClose={closeModal} />;
            case 3:
                return (
                    <>
                        <CheckboxStep
                            {...commonProps}
                            title="What aspects of the community are you most interested in?"
                            subtitle="Select all that apply"
                            stepNumber="1/7"
                            options={[
                                'Personal Branding',
                                'Content Creation',
                                'AI-Powered Content Tools',
                                'Career Development Coaching',
                                'Exclusive Webinars & Workshops',
                                'Networking with Other HR Professionals',
                                'International aspect of the community',
                                'Other (please specify)',
                            ]}
                            field="brandingInterest"
                        />
                        <NavigationButtons
                            onPrev={prevStep}
                            onNext={nextStep}
                            disabled={(formData.brandingInterest).length === 0}
                        />
                    </>
                );
            case 4:
                return (
                    <>
                        <CheckboxStep
                            {...commonProps}
                            title="What types of content would you find most valuable?"
                            stepNumber="2/7"
                            options={[
                                'Articles and Blog Posts',
                                'LinkedIn Post Templates',
                                'Video Tutorials',
                                'Case Studies',
                                'Step-by-Step Guides',
                                'Webinars',
                            ]}
                            field="contentInterest"
                        />
                        <NavigationButtons
                            onPrev={prevStep}
                            onNext={nextStep}
                            disabled={(formData.contentInterest).length === 0}
                        />
                    </>
                );
            case 5:
                return (
                    <>
                        <CheckboxStep
                            {...commonProps}
                            title="How likely are you to use AI-powered tools for content creation ?"
                            stepNumber="3/7"
                            options={['Very Likely', 'Somewhat Likely', 'Not Sure', 'Not Interested']}
                            field="aiToolUse"
                        />
                        <NavigationButtons
                            onPrev={prevStep}
                            onNext={nextStep}
                            disabled={(formData.aiToolUse).length === 0}
                        />
                    </>
                );
            case 6:
                return (
                    <>
                        <TextAreaStep
                            {...commonProps}
                            title="What are your biggest challenges when it comes to personal branding or career development?"
                            subtitle="Please describe briefly"
                            stepNumber="4/7"
                            field="challenges"
                        />
                    </>
                );
            case 7:
                return (
                    <>
                        <CheckboxStep
                            {...commonProps}
                            title="Are you interested in receiving coaching?"
                            stepNumber="5/7"
                            options={['Yes, One-on-One Coaching', 'Yes, Group Coaching', 'No']}
                            field="coachingInterest"
                        />
                        <NavigationButtons
                            onPrev={prevStep}
                            onNext={nextStep}
                            disabled={(formData.coachingInterest).length === 0}
                        />
                    </>
                );
            case 8:
                return (
                    <div>
                        <CheckboxStep
                            {...commonProps}
                            title="How would you rate your overall experience so far?"
                            stepNumber="6/7"
                            options={['Excellent', 'Good', 'Neutral', 'Needs Improvement']}
                            field="experienceRating"
                        />
                        <div className="relative mt-4">
                            <textarea
                                placeholder="Write here..."
                                value={formData.experienceRatingComments}
                                onChange={(e) => handleChange('experienceRatingComments', e.target.value)}
                                className="w-full p-2 border mb-1 rounded-lg h-60 resize-none"
                                maxLength={300}
                            />
                            <p className="absolute bottom-5 right-3 text-xs text-gray-900">
                                {renderCharCount(formData.experienceRatingComments, 300)} Words
                            </p>
                        </div>
                        <NavigationButtons
                            onPrev={prevStep}
                            onNext={nextStep}
                            disabled={(formData.experienceRating).length === 0}
                        />
                    </div>
                );
            case 9:
                return (
                    <div>
                        <CheckboxStep
                            {...commonProps}
                            title="Would you like to be contacted about becoming a Community Advocate?"
                            stepNumber="7/7"
                            options={['Yes', 'No', 'Maybe']}
                            field="communityAdvocateInterest"
                        />
                        <div className="relative mt-4">
                            <textarea
                                placeholder="Write here..."
                                value={formData.communityAdvocateComments}
                                onChange={(e) => handleChange('communityAdvocateComments', e.target.value)}
                                className="w-full p-2 border mb-1 rounded-lg h-60 resize-none"
                                maxLength={300}
                            />
                            <p className="absolute bottom-5 right-3 text-xs text-gray-900">
                                {renderCharCount(formData.communityAdvocateComments, 300)} Words
                            </p>
                        </div>
                        <NavigationButtons
                            onPrev={prevStep}
                            onNext={nextStep}
                            disabled={(formData.communityAdvocateInterest).length === 0}
                        />
                    </div>
                );
            case 10:
                return (
                    <div className="text-center">
                        <Image src="/ModalLogo.png" className="h-12 w-12 mx-auto mt-5" alt="" height={200} width={200} />
                        <h2 className="text-xl font-semibold mb-4 mt-6">Thank You!</h2>
                        <p className="mb-6 text-sm text-gray-600">
                            Your assessment has been submitted successfully. We&apos;ll analyze your responses
                            and get back to you with personalized recommendations.
                        </p>
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                handleSubmit();
                            }}
                            className="mt-4 mb-8 bg-gradient-to-r from-[#6562aa] to-[#9996DE] text-white px-6 py-3 rounded-3xl"
                        >
                            Close
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
                {renderStep()}
            </div>
        </div>
    );
};

export default PersonalBrandingModal
