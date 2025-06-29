import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterStartup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    tagline: '',
    industry: '',
    website: '',
    foundedYear: '',
    teamSize: '',
    stage: '',
    problemStatement: '',
    solution: '',
    targetMarket: '',
    businessModel: '',
    competitors: '',
    fundingStage: '',
    fundingAmount: '',
    founderName: '',
    founderEmail: '',
    founderPhone: '',
    founderLinkedIn: '',
    founderBio: '',
    pitchDeck: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        pitchDeck: file
      });
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.tagline.trim()) newErrors.tagline = 'Tagline is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
      if (!formData.foundedYear) newErrors.foundedYear = 'Founded year is required';
      if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
      if (!formData.stage) newErrors.stage = 'Stage is required';
    }
    
    if (step === 2) {
      if (!formData.problemStatement.trim()) newErrors.problemStatement = 'Problem statement is required';
      if (!formData.solution.trim()) newErrors.solution = 'Solution is required';
      if (!formData.targetMarket.trim()) newErrors.targetMarket = 'Target market is required';
      if (!formData.businessModel.trim()) newErrors.businessModel = 'Business model is required';
      if (!formData.competitors.trim()) newErrors.competitors = 'Competitors information is required';
    }
    
    if (step === 3) {
      if (!formData.founderName.trim()) newErrors.founderName = 'Founder name is required';
      if (!formData.founderEmail.trim()) {
        newErrors.founderEmail = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.founderEmail)) {
        newErrors.founderEmail = 'Email is invalid';
      }
      if (!formData.founderPhone.trim()) newErrors.founderPhone = 'Phone number is required';
      if (!formData.founderLinkedIn.trim()) newErrors.founderLinkedIn = 'LinkedIn profile is required';
      if (!formData.founderBio.trim()) newErrors.founderBio = 'Founder bio is required';
      if (!logo) newErrors.logo = 'Logo is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/startup-dashboard'); // Redirect to dashboard after registration
      }, 2000);
    }
  };

  const industryOptions = [
    'Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce',
    'Food & Beverage', 'Sustainability', 'Media & Entertainment',
    'Transportation', 'Artificial Intelligence', 'Blockchain', 'Biotechnology',
    'Fashion', 'Travel', 'Real Estate', 'Agriculture', 'Other'
  ];

  const teamSizeOptions = [
    '1-5', '6-10', '11-20', '21-50', '51-100', '101-200', '201-500', '500+'
  ];

  const stageOptions = [
    'Ideation', 'Prototype', 'Pre-Seed', 'Seed', 'Series A', 
    'Series B', 'Series C', 'Growth', 'Established'
  ];

  const fundingStageOptions = [
    'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Bootstrapped'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Register Your Startup</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our innovation ecosystem and connect with investors, mentors, and other entrepreneurs.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of 3</span>
            <span className="text-sm font-medium text-gray-700">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Step Navigation */}
            <div className="flex justify-center mb-8">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`mx-2 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step === s 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : s < step 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Enter company name"
                      />
                      {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tagline *</label>
                      <input
                        type="text"
                        name="tagline"
                        value={formData.tagline}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.tagline ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Briefly describe your startup"
                      />
                      {errors.tagline && <p className="mt-1 text-sm text-red-600">{errors.tagline}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.industry ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      >
                        <option value="">Select industry</option>
                        {industryOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Founded Year *</label>
                      <input
                        type="number"
                        name="foundedYear"
                        value={formData.foundedYear}
                        onChange={handleChange}
                        min="1900"
                        max={new Date().getFullYear()}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.foundedYear ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="e.g. 2023"
                      />
                      {errors.foundedYear && <p className="mt-1 text-sm text-red-600">{errors.foundedYear}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Team Size *</label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.teamSize ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      >
                        <option value="">Select team size</option>
                        {teamSizeOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {errors.teamSize && <p className="mt-1 text-sm text-red-600">{errors.teamSize}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stage *</label>
                      <select
                        name="stage"
                        value={formData.stage}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.stage ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      >
                        <option value="">Select stage</option>
                        {stageOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {errors.stage && <p className="mt-1 text-sm text-red-600">{errors.stage}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Funding Stage</label>
                      <select
                        name="fundingStage"
                        value={formData.fundingStage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select funding stage</option>
                        {fundingStageOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Details</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Problem Statement *</label>
                    <textarea
                      name="problemStatement"
                      value={formData.problemStatement}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.problemStatement ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="What problem are you solving?"
                    ></textarea>
                    {errors.problemStatement && <p className="mt-1 text-sm text-red-600">{errors.problemStatement}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Solution *</label>
                    <textarea
                      name="solution"
                      value={formData.solution}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.solution ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="How does your product/service solve this problem?"
                    ></textarea>
                    {errors.solution && <p className="mt-1 text-sm text-red-600">{errors.solution}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Market *</label>
                    <textarea
                      name="targetMarket"
                      value={formData.targetMarket}
                      onChange={handleChange}
                      rows="2"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.targetMarket ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Who are your target customers?"
                    ></textarea>
                    {errors.targetMarket && <p className="mt-1 text-sm text-red-600">{errors.targetMarket}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Model *</label>
                    <textarea
                      name="businessModel"
                      value={formData.businessModel}
                      onChange={handleChange}
                      rows="2"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.businessModel ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="How do you make money?"
                    ></textarea>
                    {errors.businessModel && <p className="mt-1 text-sm text-red-600">{errors.businessModel}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Competitors *</label>
                    <textarea
                      name="competitors"
                      value={formData.competitors}
                      onChange={handleChange}
                      rows="2"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.competitors ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Who are your main competitors and what makes you different?"
                    ></textarea>
                    {errors.competitors && <p className="mt-1 text-sm text-red-600">{errors.competitors}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Funding Amount (if applicable)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">Rs</span>
                      </div>
                      <input
                        type="number"
                        name="fundingAmount"
                        value={formData.fundingAmount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Amount in NPR"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Founder Information</h2>
                  
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo *</label>
                        <div className="mt-1 flex flex-col items-center">
                          <div className="relative">
                            {logoPreview ? (
                              <img src={logoPreview} alt="Logo preview" className="w-32 h-32 rounded-lg object-contain border-2 border-dashed border-gray-300" />
                            ) : (
                              <div className="w-32 h-32 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                                <span className="text-gray-400">No logo</span>
                              </div>
                            )}
                            <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                          {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pitch Deck</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                          <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                <span>Upload a file</span>
                                <input 
                                  type="file" 
                                  className="sr-only" 
                                  onChange={handleFileChange}
                                  accept=".pdf,.ppt,.pptx"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF or PPT up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Founder Name *</label>
                        <input
                          type="text"
                          name="founderName"
                          value={formData.founderName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.founderName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          placeholder="Enter founder name"
                        />
                        {errors.founderName && <p className="mt-1 text-sm text-red-600">{errors.founderName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          name="founderEmail"
                          value={formData.founderEmail}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.founderEmail ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          placeholder="Enter email"
                        />
                        {errors.founderEmail && <p className="mt-1 text-sm text-red-600">{errors.founderEmail}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          name="founderPhone"
                          value={formData.founderPhone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.founderPhone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          placeholder="Enter phone number"
                        />
                        {errors.founderPhone && <p className="mt-1 text-sm text-red-600">{errors.founderPhone}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile *</label>
                        <input
                          type="url"
                          name="founderLinkedIn"
                          value={formData.founderLinkedIn}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.founderLinkedIn ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          placeholder="https://linkedin.com/in/username"
                        />
                        {errors.founderLinkedIn && <p className="mt-1 text-sm text-red-600">{errors.founderLinkedIn}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Founder Bio *</label>
                        <textarea
                          name="founderBio"
                          value={formData.founderBio}
                          onChange={handleChange}
                          rows="4"
                          className={`w-full px-4 py-3 rounded-lg border ${errors.founderBio ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          placeholder="Tell us about your background and experience"
                        ></textarea>
                        {errors.founderBio && <p className="mt-1 text-sm text-red-600">{errors.founderBio}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="mt-10 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition-colors"
                  >
                    Previous
                  </button>
                ) : (
                  <div></div> // Empty div to push next button to the right
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-lg font-medium text-white transition-all ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Register Startup'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By registering, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterStartup;