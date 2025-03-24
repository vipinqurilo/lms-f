import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '@/store/slices/uploadSlice';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaLocationArrow, 
  FaMailBulk, 
  FaPhone
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Image from 'next/image';

const FooterSettings = () => {
  const dispatch = useDispatch();
  const imageLoader = useSelector((state) => state.upload.isLoading.uploadImage);
  
  const [preview, setPreview] = useState('/assets/common/logo.png');
  const [media, setMedia] = useState({
    image: '',
  });

  // Initial data based on Footer.jsx
  const initialData = {
    description: 'STEAM Institute empowers learners with innovative tools, fostering creativity and curiosity for a strong foundation in future innovation.',
    contactDetails: [
      {
        type: 'location',
        title: 'Office Location :',
        value: '132 Dartmouth Street Boston, Massachusetts 02156 United States',
        image: '/assets/contact-us/location.svg',
      },
      {
        type: 'email',
        title: 'Email Address :',
        value: 'demo@gmail.com',
        image: '/assets/contact-us/email.svg',
      },
      {
        type: 'phone',
        title: 'Phone Number :',
        value: '+1012 3456 789',
        image: '/assets/contact-us/phone.svg',
      },
    ],
    socialLinks: [
      {
        id: 1,
        platform: 'instagram',
        link: 'https://instagram.com',
        color: 'bg-[#E1306C]',
      },
      {
        id: 2,
        platform: 'linkedin',
        link: 'https://linkedin.com',
        color: 'bg-[#0077B5]',
      },
      {
        id: 3,
        platform: 'twitter',
        link: 'https://twitter.com',
        color: 'bg-[#1DA1F2]',
      },
      {
        id: 4,
        platform: 'facebook',
        link: 'https://facebook.com',
        color: 'bg-[#1877F2]',
      },
    ],
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialData
  });

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
        }
      });
  };

  const onSubmit = async (data) => {
    try {
      const footerData = {
        ...data,
        logo: media.image || preview,
      };
      
      console.log('Saving footer settings:', footerData);
      // Here you would dispatch an action to save the footer settings
      // dispatch(updateFooterSettings(footerData));
      
      // Show success message
      alert('Footer settings updated successfully!');
    } catch (error) {
      console.error('Error updating footer settings:', error);
      alert('Error updating footer settings. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Footer Settings</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Logo Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Footer Logo
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
                disabled={imageLoader}
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended size: 200x100 pixels
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Footer Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows={3}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
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
            />
            {errors.contactDetails?.[0]?.value && (
              <p className="text-red-500 text-xs mt-1">{errors.contactDetails[0].value.message}</p>
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
              {...register("socialLinks[0].link", { required: "Instagram link is required" })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            />
            {errors.socialLinks?.[0]?.link && (
              <p className="text-red-500 text-xs mt-1">{errors.socialLinks[0].link.message}</p>
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
              {...register("socialLinks[1].link", { required: "LinkedIn link is required" })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            />
            {errors.socialLinks?.[1]?.link && (
              <p className="text-red-500 text-xs mt-1">{errors.socialLinks[1].link.message}</p>
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
              {...register("socialLinks[2].link", { required: "Twitter link is required" })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            />
            {errors.socialLinks?.[2]?.link && (
              <p className="text-red-500 text-xs mt-1">{errors.socialLinks[2].link.message}</p>
            )}
          </div>
          
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
              {...register("socialLinks[3].link", { required: "Facebook link is required" })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            />
            {errors.socialLinks?.[3]?.link && (
              <p className="text-red-500 text-xs mt-1">{errors.socialLinks[3].link.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Save Footer Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default FooterSettings;