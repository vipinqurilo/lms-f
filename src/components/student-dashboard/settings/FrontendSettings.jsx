import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '@/store/slices/uploadSlice';
import { 
  getFrontendSettings,
  updateFrontendSettings,
  selectFrontendSettings,
  selectSettingsLoading,
  selectSettingsError
} from '@/store/slices/admin-dashboard/settingSlice';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Image from 'next/image';
import Loader from '@/components/common/Loader';

const FrontendSettings = () => {
  const dispatch = useDispatch();
  const imageLoader = useSelector((state) => state.upload.isLoading.uploadImage);
  const frontendSettings = useSelector((state) => state.admin.settings?.frontendSettings || {});
  const loading = useSelector((state) => state.admin.settings?.isLoading || {});
  const errors = useSelector((state) => state.admin.settings?.error || {});
  
  const [preview, setPreview] = useState('/assets/common/logo.png');
  const [media, setMedia] = useState({
    image: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors }
  } = useForm();

  // Fetch frontend settings on component mount
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      dispatch(getFrontendSettings());
    }

    return () => {
      mounted = false;
    };
  }, []); // Only run once on mount

  // Update form when data changes
  useEffect(() => {
    if (frontendSettings) {
      reset({
        title: frontendSettings.title || '',
        description: frontendSettings.description || '',
        contactDetails: frontendSettings.contactDetails || [],
        socialLinks: frontendSettings.socialLinks || []
      });
      setPreview(frontendSettings.logo || '/assets/common/logo.png');
    }
  }, [frontendSettings, reset]);

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("courseImage", selectedFile);
    dispatch(uploadImage(formData))
      .unwrap()
      .then((res) => {
        if (res?.data) {
          setMedia((prev) => ({
            ...prev,
            image: res?.data,
          }));
          setPreview(res.data);
        }
      })
      .catch((error) => {
      });
  };

  const onSubmit = async (data) => {
    console.log(data,"data from frontend settings");
    try {
      const settingsData = {
        ...data,
        logo: media.image || preview,
        contactDetails: [
          { ...data.contactDetails[0], type: "location", title: "Our Office" },
          { ...data.contactDetails[1], type: "email", title: "Support Email" },
          { ...data.contactDetails[2], type: "phone", title: "Customer Support" }
        ],
        socialLinks: [
          { ...data.socialLinks[0], id: "1", platform: "Facebook" },
          { ...data.socialLinks[1], id: "2", platform: "Twitter" },
          { ...data.socialLinks[2], id: "3", platform: "LinkedIn" },
          { ...data.socialLinks[3], id: "4", platform: "Instagram" }
        ]
      };
      
      await dispatch(updateFrontendSettings(settingsData)).unwrap();
    } catch (error) {
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {loading.getFrontendSettings ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader text="Loading frontend settings..." color="text-primary" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Header Section */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-semibold mb-4">Header Settings</h3>
            
            {/* Title Field */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Website Title
              </label>
              <input
                type="text"
                {...register("title", { 
                  required: "Website title is required",
                  minLength: {
                    value: 2,
                    message: "Title must be at least 2 characters long"
                  }
                })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                placeholder="Enter website title"
                disabled={loading.updateFrontendSettings}
              />
              {formErrors.title && (
                <p className="text-red-500 text-xs mt-1">{formErrors.title.message}</p>
              )}
            </div>
            
            {/* Logo Upload Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-40 h-20 border border-gray-300 rounded-md overflow-hidden">
                  <Image 
                    src={preview} 
                    alt="Logo preview" 
                    layout="fill" 
                    objectFit="contain"
                    className="p-2"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2 cursor-pointer hover:border-primary transition-all disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={imageLoader || loading.updateFrontendSettings}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended size: 200x100 pixels
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Footer Settings</h3>

            {/* Description Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Footer Description
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                rows={3}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                disabled={loading.updateFrontendSettings}
              />
              {formErrors.description && (
                <p className="text-red-500 text-xs mt-1">{formErrors.description.message}</p>
              )}
            </div>

            {/* Contact Details Section */}
            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">
                Contact Details
              </label>
              
              {/* Office Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Office Location
                </label>
                <textarea
                  {...register("contactDetails[0].value", { required: "Office location is required" })}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                  disabled={loading.updateFrontendSettings}
                />
                {formErrors.contactDetails?.[0]?.value && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.contactDetails[0].value.message}</p>
                )}
              </div>
              
              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("contactDetails[1].value", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                />
                {errors.contactDetails?.[1]?.value && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactDetails[1].value.message}</p>
                )}
              </div>
              
              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("contactDetails[2].value", { required: "Phone number is required" })}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                />
                {errors.contactDetails?.[2]?.value && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactDetails[2].value.message}</p>
                )}
              </div>
            </div>

            {/* Social Links Section */}
            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">
                Social Media Links
              </label>
              
              {/* Facebook */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaFacebookF className="text-[#1877F2]" />
                  <label className="block text-sm font-medium text-gray-700">
                    Facebook
                  </label>
                </div>
                <input
                  type="url"
                  {...register("socialLinks[0].link", { required: "Facebook link is required" })}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                />
                {errors.socialLinks?.[0]?.link && (
                  <p className="text-red-500 text-xs mt-1">{errors.socialLinks[0].link.message}</p>
                )}
              </div>
              
              {/* Twitter/X */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaXTwitter className="text-[#1DA1F2]" />
                  <label className="block text-sm font-medium text-gray-700">
                    Twitter/X
                  </label>
                </div>
                <input
                  type="url"
                  {...register("socialLinks[1].link", { required: "Twitter link is required" })}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                />
                {errors.socialLinks?.[1]?.link && (
                  <p className="text-red-500 text-xs mt-1">{errors.socialLinks[1].link.message}</p>
                )}
              </div>
              
              {/* LinkedIn */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaLinkedinIn className="text-[#0077B5]" />
                  <label className="block text-sm font-medium text-gray-700">
                    LinkedIn
                  </label>
                </div>
                <input
                  type="url"
                  {...register("socialLinks[2].link", { required: "LinkedIn link is required" })}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                />
                {errors.socialLinks?.[2]?.link && (
                  <p className="text-red-500 text-xs mt-1">{errors.socialLinks[2].link.message}</p>
                )}
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaInstagram className="text-[#E1306C]" />
                  <label className="block text-sm font-medium text-gray-700">
                    Instagram
                  </label>
                </div>
                <input
                  type="url"
                  {...register("socialLinks[3].link", { required: "Instagram link is required" })}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                />
                {errors.socialLinks?.[3]?.link && (
                  <p className="text-red-500 text-xs mt-1">{errors.socialLinks[3].link.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${loading.updateFrontendSettings ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading.updateFrontendSettings}
            >
              {loading.updateFrontendSettings ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FrontendSettings;