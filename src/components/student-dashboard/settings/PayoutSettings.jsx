import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const PayoutSettings = () => {
  const [activeTab, setActiveTab] = useState('stripe');
  
  // Initial data for both payment methods
  const initialData = {
    stripe: {
      mode: 'test',
      clientId: '',
      secret: '',
    },
    paypal: {
      mode: 'test',
      clientId: '',
      secret: '',
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: initialData
  });

  const onSubmit = async (data) => {
    try {
      console.log('Saving payment settings:', data);
      // Here you would dispatch an action to save the payment settings
      // dispatch(savePaymentSettings(data));
      
      // Show success message
      alert('Payment settings updated successfully!');
    } catch (error) {
      console.error('Error updating payment settings:', error);
      alert('Error updating payment settings. Please try again.');
    }
  };

  // Tab switching handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      
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
                  />
                  <span className="ml-2">Test</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("stripe.mode")}
                    value="production"
                    className="form-radio text-primary focus:ring-primary"
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
              />
              {errors.stripe?.clientId && (
                <p className="text-red-500 text-xs mt-1">{errors.stripe.clientId.message}</p>
              )}
            </div>

            {/* Stripe Secret */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Secret Key
              </label>
              <input
                type="password"
                {...register("stripe.secret", { 
                  required: "Stripe Secret Key is required"
                })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                placeholder="Enter Stripe Secret Key"
              />
              {errors.stripe?.secret && (
                <p className="text-red-500 text-xs mt-1">{errors.stripe.secret.message}</p>
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
                  />
                  <span className="ml-2">Test</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("paypal.mode")}
                    value="production"
                    className="form-radio text-primary focus:ring-primary"
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
              />
              {errors.paypal?.clientId && (
                <p className="text-red-500 text-xs mt-1">{errors.paypal.clientId.message}</p>
              )}
            </div>

            {/* PayPal Secret */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Secret Key
              </label>
              <input
                type="password"
                {...register("paypal.secret", { 
                  required: "PayPal Secret Key is required"
                })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                placeholder="Enter PayPal Secret Key"
              />
              {errors.paypal?.secret && (
                <p className="text-red-500 text-xs mt-1">{errors.paypal.secret.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Save Payment Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayoutSettings;