import React, { useState } from 'react';

function AppSettingsSection() {
  const [settings, setSettings] = useState({
    language: 'English',
    currency: 'GHS (Ghana Cedi)',
    taxRate: '15', // Stored as string, as it comes from input
  });

  const handleSettingChange = (event) => {
    const { name, value } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value,
    }));
    // Simulate saving or providing feedback
    console.log(`Setting updated: ${name} = ${value}`);
    alert(`App Setting Updated: ${name} changed to ${value}${name === 'taxRate' ? '%' : ''}. (Simulated)`);
  };

  return (
    <section id="settings" className="mb-8 p-6 bg-white rounded-lg shadow-lg print:hidden">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">App Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="language-setting" className="block text-sm font-medium text-gray-700">Language</label>
          <select
            id="language-setting" // Changed ID to avoid conflict with original HTML if it were on same page
            name="language"
            value={settings.language}
            onChange={handleSettingChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>English</option>
            <option>French</option>
            <option>Pidgin</option>
            <option>Swahili</option>
          </select>
        </div>
        <div>
          <label htmlFor="currency-setting" className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            id="currency-setting" // Changed ID
            name="currency"
            value={settings.currency}
            onChange={handleSettingChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>GHS (Ghana Cedi)</option>
            <option>NGN (Nigerian Naira)</option>
            <option>KES (Kenyan Shilling)</option>
            <option>USD (US Dollar)</option>
          </select>
        </div>
        <div>
          <label htmlFor="tax-rate-setting" className="block text-sm font-medium text-gray-700">Default Tax Rate (%)</label>
          <input
            type="number"
            name="taxRate"
            id="tax-rate-setting" // Changed ID
            value={settings.taxRate}
            onChange={handleSettingChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">Permissions</h3>
          <p className="text-gray-600">Role-based permission settings will be configured here. (Placeholder for more complex UI)</p>
        </div>
      </div>
    </section>
  );
}

export default AppSettingsSection;
