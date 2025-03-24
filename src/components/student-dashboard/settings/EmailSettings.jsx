import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getEmailSettings, 
  updateEmailSettings,
  selectEmailSettings,
  selectSettingsLoading,
  selectSettingsError
} from '@/store/slices/admin-dashboard/settingSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '@/components/common/Loader';

const EmailSettings = () => {
  const dispatch = useDispatch();
  const emailSettings = useSelector(selectEmailSettings);
  const loading = useSelector(selectSettingsLoading);
  const errors = useSelector(selectSettingsError);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors }
  } = useForm({
    defaultValues: emailSettings
  });

  // Fetch email settings on component mount
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      dispatch(getEmailSettings())
        .unwrap()
        .then((res) => {
          if (mounted && res?.data) {
            reset(res.data);
          }
        })
        .catch((error) => {
          // Handle error if needed
        });
    }

    return () => {
      mounted = false;
    };
  }, []); // Only run once on mount

  const onSubmit = async (data) => {
    try {
      await dispatch(updateEmailSettings(data)).unwrap();
    } catch (error) {
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      
      {loading.getEmailSettings ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader text="Loading email settings..." color="text-primary" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* SMTP Host */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              SMTP Host
            </label>
            <input
              type="text"
              {...register("smtpHost", { 
                required: "SMTP host is required",
                pattern: {
                  value: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid host address"
                }
              })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="e.g., smtp.gmail.com"
              disabled={loading.updateEmailSettings}
            />
            {formErrors.smtpHost && (
              <p className="text-red-500 text-xs mt-1">{formErrors.smtpHost.message}</p>
            )}
          </div>

          {/* Port */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Port
            </label>
            <input
              type="number"
              {...register("port", { 
                required: "Port is required",
                min: {
                  value: 1,
                  message: "Port must be greater than 0"
                },
                max: {
                  value: 65535,
                  message: "Port must be less than 65536"
                }
              })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="e.g., 587"
              disabled={loading.updateEmailSettings}
            />
            {formErrors.port && (
              <p className="text-red-500 text-xs mt-1">{formErrors.port.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Common ports: 25 (SMTP), 465 (SMTPS), 587 (Submission)
            </p>
          </div>

          {/* SMTP Username */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              SMTP Username
            </label>
            <input
              type="text"
              {...register("smtpUsername", { 
                required: "SMTP username is required"
              })}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Enter SMTP username"
              disabled={loading.updateEmailSettings}
            />
            {formErrors.smtpUsername && (
              <p className="text-red-500 text-xs mt-1">{formErrors.smtpUsername.message}</p>
            )}
          </div>

          {/* SMTP Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              SMTP Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("smtpPassword", { 
                  required: "SMTP password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  }
                })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary pr-10"
                placeholder="Enter SMTP password"
                disabled={loading.updateEmailSettings}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formErrors.smtpPassword && (
              <p className="text-red-500 text-xs mt-1">{formErrors.smtpPassword.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              For Gmail, use an App Password if 2FA is enabled
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading.updateEmailSettings}
            >
              {loading.updateEmailSettings ? 'Saving...' : 'Save Email Settings'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EmailSettings;
