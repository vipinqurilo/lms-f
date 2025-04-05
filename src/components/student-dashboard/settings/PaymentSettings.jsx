import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getPaymentSettings, 
  updatePaymentSettings,
  getPayoutSettings,
  updatePayoutSettings,
  selectPaymentSettings,
  selectPayoutSettings,
  selectSettingsLoading,
  selectSettingsError
} from '@/store/slices/admin-dashboard/settingSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '@/components/common/Loader';

const PaymentSettings = ({ type = 'payment' }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('stripe');
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showPaypalSecret, setShowPaypalSecret] = useState(false);
  
  // Get data from Redux store based on type
  const settings = useSelector(type === 'payment' ? selectPaymentSettings : selectPayoutSettings);
  const loading = useSelector(selectSettingsLoading);
  const errors = useSelector(selectSettingsError);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors }
  } = useForm({
    defaultValues: settings
  });

  // Fetch settings on component mount
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (type === 'payment') {
        dispatch(getPaymentSettings());
      } else {
        dispatch(getPayoutSettings());
      }
    }

    return () => {
      mounted = false;
    };
  }, [type]); // Only depend on type changes

  // Update form when data changes
  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  const onSubmit = async (data) => {
    try {
      if (type === 'payment') {
        await dispatch(updatePaymentSettings(data)).unwrap();
      } else {
        await dispatch(updatePayoutSettings(data)).unwrap();
      }
    } catch (error) {
      console.error(`Failed to update ${type} settings:`, error);
    }
  };

  // Tab switching handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const isLoading = type === 'payment' 
    ? loading.getPaymentSettings 
    : loading.getPayoutSettings;

  const isUpdating = type === 'payment'
    ? loading.updatePaymentSettings
    : loading.updatePayoutSettings;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {isLoading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader text={`Loading ${type} settings...`} color="text-primary" />
        </div>
      ) : (
        <>
          {/* Payment Method Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => handleTabChange('stripe')}
                  className={`${
                    activeTab === 'stripe'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Stripe
                </button>
                <button
                  onClick={() => handleTabChange('paypal')}
                  className={`${
                    activeTab === 'paypal'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  PayPal
                </button>
                {type === 'payout' && (
                  <button
                    onClick={() => handleTabChange('payfast')}
                    className={`${
                      activeTab === 'payfast'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    PayFast
                  </button>
                )}
              </nav>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Stripe Settings */}
            {activeTab === 'stripe' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Stripe Configuration</h3>
                
                {/* Mode Toggle */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Mode
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register("stripe.mode")}
                        value="test"
                        className="form-radio text-primary focus:ring-primary"
                        disabled={isUpdating}
                      />
                      <span className="ml-2">Test</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register("stripe.mode")}
                        value="production"
                        className="form-radio text-primary focus:ring-primary"
                        disabled={isUpdating}
                      />
                      <span className="ml-2">Production</span>
                    </label>
                  </div>
                </div>

                {/* Stripe Client ID */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Client ID
                  </label>
                  <input
                    type="text"
                    {...register("stripe.clientId", { 
                      required: "Stripe Client ID is required"
                    })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter Stripe Client ID"
                    disabled={isUpdating}
                  />
                  {formErrors.stripe?.clientId && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.stripe.clientId.message}</p>
                  )}
                </div>

                {/* Stripe Secret */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Secret Key
                  </label>
                  <div className="relative">
                    <input
                      type={showStripeSecret ? "text" : "password"}
                      {...register("stripe.secret", { 
                        required: "Stripe Secret Key is required"
                      })}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary pr-10"
                      placeholder="Enter Stripe Secret Key"
                      disabled={isUpdating}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowStripeSecret(!showStripeSecret)}
                    >
                      {showStripeSecret ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {formErrors.stripe?.secret && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.stripe.secret.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* PayPal Settings */}
            {activeTab === 'paypal' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">PayPal Configuration</h3>
                
                {/* Mode Toggle */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Mode
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register("paypal.mode")}
                        value="test"
                        className="form-radio text-primary focus:ring-primary"
                        disabled={isUpdating}
                      />
                      <span className="ml-2">Test</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register("paypal.mode")}
                        value="production"
                        className="form-radio text-primary focus:ring-primary"
                        disabled={isUpdating}
                      />
                      <span className="ml-2">Production</span>
                    </label>
                  </div>
                </div>

                {/* PayPal Client ID */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Client ID
                  </label>
                  <input
                    type="text"
                    {...register("paypal.clientId", { 
                      required: "PayPal Client ID is required"
                    })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter PayPal Client ID"
                    disabled={isUpdating}
                  />
                  {formErrors.paypal?.clientId && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.paypal.clientId.message}</p>
                  )}
                </div>

                {/* PayPal Secret */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Secret Key
                  </label>
                  <div className="relative">
                    <input
                      type={showPaypalSecret ? "text" : "password"}
                      {...register("paypal.secret", { 
                        required: "PayPal Secret Key is required"
                      })}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary pr-10"
                      placeholder="Enter PayPal Secret Key"
                      disabled={isUpdating}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPaypalSecret(!showPaypalSecret)}
                    >
                      {showPaypalSecret ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {formErrors.paypal?.secret && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.paypal.secret.message}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* PayFast Settings - Only for Payout type */}
            {type === 'payout' && activeTab === 'payfast' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">PayFast Configuration</h3>
                
                {/* PayFast Registered Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    {...register("payfast.email", { 
                      required: "PayFast registered email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter PayFast registered email"
                    disabled={isUpdating}
                  />
                  {formErrors.payfast?.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.payfast.email.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUpdating}
              >
                {isUpdating ? 'Saving...' : `Save ${type.charAt(0).toUpperCase() + type.slice(1)} Settings`}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default PaymentSettings;