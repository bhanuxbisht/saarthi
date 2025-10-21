/**
 * 👤 User Profile Management Hook
 * 
 * Manages user profile state with localStorage persistence
 * Handles profile creation, updates, and validation
 * 
 * Profile Schema:
 * - skills: Array of skill strings
 * - experience: Years of experience
 * - accessibility: Array of accessibility needs
 * - location: Preferred location
 * - salary: Expected salary range
 * - bio: User description/summary
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'nexus-user-profile';

const defaultProfile = {
  skills: [],
  experience: '',
  accessibility: [],
  location: '',
  salary: '',
  bio: '',
  name: '',
  profileCreated: false,
};

export const useUserProfile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  /**
   * Load profile from localStorage on mount
   */
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEY);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile({ ...defaultProfile, ...parsed });
        console.log('✅ Profile loaded from localStorage');
      } else {
        console.log('📝 No saved profile found');
      }
    } catch (error) {
      console.error('❌ Failed to load profile:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /**
   * Save profile to localStorage whenever it changes
   */
  useEffect(() => {
    if (isLoaded && hasChanges) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
        console.log('💾 Profile saved to localStorage');
        setHasChanges(false);
      } catch (error) {
        console.error('❌ Failed to save profile:', error);
      }
    }
  }, [profile, isLoaded, hasChanges]);

  /**
   * Update entire profile
   */
  const updateProfile = useCallback((newProfile) => {
    setProfile(prev => ({
      ...prev,
      ...newProfile,
      profileCreated: true,
    }));
    setHasChanges(true);
    console.log('📝 Profile updated');
  }, []);

  /**
   * Update single field
   */
  const updateField = useCallback((field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
    console.log(`📝 Field updated: ${field}`);
  }, []);

  /**
   * Add skill to profile
   */
  const addSkill = useCallback((skill) => {
    if (!skill || skill.trim() === '') return;

    setProfile(prev => {
      // Avoid duplicates
      if (prev.skills.includes(skill)) {
        console.warn(`⚠️ Skill already exists: ${skill}`);
        return prev;
      }

      return {
        ...prev,
        skills: [...prev.skills, skill],
      };
    });
    setHasChanges(true);
    console.log(`➕ Skill added: ${skill}`);
  }, []);

  /**
   * Remove skill from profile
   */
  const removeSkill = useCallback((skill) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
    setHasChanges(true);
    console.log(`➖ Skill removed: ${skill}`);
  }, []);

  /**
   * Toggle accessibility need
   */
  const toggleAccessibility = useCallback((need) => {
    setProfile(prev => {
      const has = prev.accessibility.includes(need);
      return {
        ...prev,
        accessibility: has
          ? prev.accessibility.filter(a => a !== need)
          : [...prev.accessibility, need],
      };
    });
    setHasChanges(true);
    console.log(`🔄 Accessibility toggled: ${need}`);
  }, []);

  /**
   * Reset profile to defaults
   */
  const resetProfile = useCallback(() => {
    setProfile(defaultProfile);
    localStorage.removeItem(STORAGE_KEY);
    setHasChanges(false);
    console.log('🗑️ Profile reset');
  }, []);

  /**
   * Validate profile completeness
   */
  const validateProfile = useCallback(() => {
    const errors = [];

    if (!profile.skills || profile.skills.length === 0) {
      errors.push('Please add at least one skill');
    }

    if (!profile.bio || profile.bio.trim().length < 20) {
      errors.push('Bio should be at least 20 characters');
    }

    if (!profile.experience) {
      errors.push('Please select your experience level');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, [profile]);

  /**
   * Check if profile is complete enough for matching
   */
  const isProfileComplete = useCallback(() => {
    return (
      profile.skills.length > 0 &&
      profile.bio &&
      profile.bio.length >= 20
    );
  }, [profile]);

  /**
   * Get profile summary for display
   */
  const getProfileSummary = useCallback(() => {
    return {
      skillCount: profile.skills.length,
      hasExperience: !!profile.experience,
      hasAccessibility: profile.accessibility.length > 0,
      hasLocation: !!profile.location,
      hasSalary: !!profile.salary,
      hasBio: !!profile.bio,
      completeness: calculateCompleteness(),
    };
  }, [profile]);

  /**
   * Calculate profile completeness percentage
   */
  const calculateCompleteness = useCallback(() => {
    const fields = [
      profile.skills.length > 0, // 20%
      profile.bio && profile.bio.length >= 20, // 30%
      !!profile.experience, // 20%
      profile.accessibility.length > 0, // 10%
      !!profile.location, // 10%
      !!profile.salary, // 10%
    ];

    const weights = [20, 30, 20, 10, 10, 10];
    const completed = fields.reduce((sum, field, index) => 
      sum + (field ? weights[index] : 0), 0
    );

    return Math.round(completed);
  }, [profile]);

  /**
   * Export profile as JSON (for download/backup)
   */
  const exportProfile = useCallback(() => {
    const dataStr = JSON.stringify(profile, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nexus-profile.json';
    link.click();
    URL.revokeObjectURL(url);
    console.log('📥 Profile exported');
  }, [profile]);

  /**
   * Import profile from JSON file
   */
  const importProfile = useCallback((jsonData) => {
    try {
      const imported = typeof jsonData === 'string' 
        ? JSON.parse(jsonData)
        : jsonData;

      setProfile({ ...defaultProfile, ...imported });
      setHasChanges(true);
      console.log('📤 Profile imported');
      return { success: true };
    } catch (error) {
      console.error('❌ Failed to import profile:', error);
      return { success: false, error: error.message };
    }
  }, []);

  return {
    // State
    profile,
    isLoaded,
    hasChanges,

    // Actions
    updateProfile,
    updateField,
    addSkill,
    removeSkill,
    toggleAccessibility,
    resetProfile,

    // Validation
    validateProfile,
    isProfileComplete,
    getProfileSummary,
    calculateCompleteness,

    // Import/Export
    exportProfile,
    importProfile,
  };
};

export default useUserProfile;
