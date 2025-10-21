import React from 'react';
import {
  X,
  Type,
  Gauge,
  Moon,
  Sun,
  Maximize2,
  Eye,
  Palette,
  Keyboard,
  Zap,
} from 'lucide-react';

const AccessibilitySettingsPanel = ({ isOpen, onClose, settings, updateSettings }) => {
  if (!isOpen) return null;

  const colorBlindModes = [
    { value: 'none', label: 'Normal', color: 'bg-gray-200' },
    { value: 'protanopia', label: 'Protanopia (Red-Blind)', color: 'bg-red-200' },
    { value: 'deuteranopia', label: 'Deuteranopia (Green-Blind)', color: 'bg-green-200' },
    { value: 'tritanopia', label: 'Tritanopia (Blue-Blind)', color: 'bg-blue-200' },
  ];

  const toggles = [
    { key: 'darkMode', label: 'Dark Mode', icon: Moon, description: 'Reduce eye strain' },
    { key: 'highContrast', label: 'High Contrast', icon: Eye, description: 'Better visibility' },
    { key: 'reducedMotion', label: 'Reduced Motion', icon: Zap, description: 'Less animations' },
    { key: 'keyboardShortcuts', label: 'Keyboard Shortcuts', icon: Keyboard, description: 'Enable hotkeys' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Accessibility Settings</h2>
            <p className="text-blue-100 text-sm mt-1">Customize your experience</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Font Size */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Type className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Text Size</h3>
            </div>
            <div className="space-y-3">
              <input
                type="range"
                min="12"
                max="32"
                value={settings.fontSize}
                onChange={(e) =>
                  updateSettings({ fontSize: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">12px</span>
                <span className="text-lg font-bold text-blue-600">
                  {settings.fontSize}px
                </span>
                <span className="text-sm text-gray-600">32px</span>
              </div>
              <p
                className="text-gray-700 p-3 bg-gray-50 rounded-lg"
                style={{ fontSize: `${settings.fontSize}px` }}
              >
                Sample text preview
              </p>
            </div>
          </div>

          {/* Voice Speed */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Gauge className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Voice Speed</h3>
            </div>
            <div className="space-y-3">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.voiceSpeed}
                onChange={(e) =>
                  updateSettings({ voiceSpeed: parseFloat(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">0.5x</span>
                <span className="text-lg font-bold text-purple-600">
                  {settings.voiceSpeed}x
                </span>
                <span className="text-sm text-gray-600">2x</span>
              </div>
              <p className="text-xs text-gray-500">
                Adjust text-to-speech reading speed
              </p>
            </div>
          </div>

          {/* Color Blind Mode */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Color Blind Mode</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {colorBlindModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() =>
                    updateSettings({ colorBlindMode: mode.value })
                  }
                  className={`p-3 rounded-lg border-2 transition-all ${
                    settings.colorBlindMode === mode.value
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${mode.color} mx-auto mb-2`} />
                  <p className="text-xs font-medium text-gray-900 text-center">
                    {mode.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Settings */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Maximize2 className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Features</h3>
            </div>
            <div className="space-y-3">
              {toggles.map((toggle) => {
                const Icon = toggle.icon;
                return (
                  <div
                    key={toggle.key}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{toggle.label}</p>
                        <p className="text-xs text-gray-500">{toggle.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        updateSettings({ [toggle.key]: !settings[toggle.key] })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[toggle.key] ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      aria-label={`Toggle ${toggle.label}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[toggle.key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  updateSettings({
                    fontSize: 16,
                    voiceSpeed: 1,
                    colorBlindMode: 'none',
                    darkMode: false,
                    highContrast: false,
                    reducedMotion: false,
                  })
                }
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Reset All
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
              >
                Done
              </button>
            </div>
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Keyboard className="w-4 h-4 mr-2" />
              Keyboard Shortcuts
            </h4>
            <div className="text-xs text-blue-800 space-y-1">
              <p><kbd className="px-2 py-1 bg-white rounded">A</kbd> Open this panel</p>
              <p><kbd className="px-2 py-1 bg-white rounded">T</kbd> Increase text size</p>
              <p><kbd className="px-2 py-1 bg-white rounded">H</kbd> Toggle high contrast</p>
              <p><kbd className="px-2 py-1 bg-white rounded">M</kbd> Toggle dark mode</p>
              <p><kbd className="px-2 py-1 bg-white rounded">?</kbd> Show all shortcuts</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessibilitySettingsPanel;
