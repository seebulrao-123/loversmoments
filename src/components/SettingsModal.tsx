import React from 'react';
import { 
  X, Volume2, VolumeX, Sparkles, Hash, HardDrive, RotateCcw, AlertTriangle 
} from 'lucide-react';
import { DiarySettings, VintageTextureId } from '../types';
import { VINTAGE_TEXTURES } from '../utils/textures';
import { SOLID_PALETTE } from './PageColorModal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DiarySettings;
  onUpdateSettings: (newSettings: DiarySettings) => void;
  onResetSettings: () => void;
  onResetDiary: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings,
  onResetDiary,
}) => {
  if (!isOpen) return null;

  const handleToggle = (key: keyof DiarySettings) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleVolumeChange = (vol: number) => {
    onUpdateSettings({
      ...settings,
      volume: Math.max(0, Math.min(1, vol)),
    });
  };

  const confirmResetDiary = () => {
    if (window.confirm('Are you sure you want to reset your entire diary? All custom pages, photos, texts, and drawings will be cleared and reset to a clean new diary.')) {
      onResetDiary();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl border border-[#a67c52]/60 text-[#3b2716]"
        style={{
          backgroundColor: '#f7f1e5',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(210,180,140,0.2) 0%, transparent 80%)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#cca77d]/40 bg-[#eedfc5]/60">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#442c16]">Diary Settings</h2>
            <p className="text-xs text-[#78593a]">Preferences and display controls</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#735133] hover:bg-[#e4cfb2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Sound & Audio */}
          <div className="p-3.5 rounded-lg border border-[#cca77d]/40 bg-[#fbf8f0] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-[#82542a]" /> : <VolumeX className="w-4 h-4 text-[#996e49]" />}
                <div>
                  <span className="text-xs font-serif font-semibold text-[#4d2d14] block">Page Turn Sound</span>
                  <span className="text-[11px] text-[#78593a]">Realistic physical paper rustle when pages flip</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={() => handleToggle('soundEnabled')}
                className="w-4 h-4 accent-[#82542a] cursor-pointer"
              />
            </div>

            {settings.soundEnabled && (
              <div className="pt-2 border-t border-[#cca77d]/20 flex items-center justify-between gap-4">
                <span className="text-xs font-serif text-[#66492f]">Sound Volume</span>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={settings.volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-32 accent-[#82542a]"
                />
              </div>
            )}
          </div>

          {/* 3D Animations */}
          <div className="flex items-center justify-between p-3.5 rounded-lg border border-[#cca77d]/40 bg-[#fbf8f0]">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#82542a]" />
              <div>
                <span className="text-xs font-serif font-semibold text-[#4d2d14] block">3D Page Turn Animation</span>
                <span className="text-[11px] text-[#78593a]">Physical paper curvature and lighting effects</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.animationsEnabled}
              onChange={() => handleToggle('animationsEnabled')}
              className="w-4 h-4 accent-[#82542a] cursor-pointer"
            />
          </div>

          {/* Page Numbers */}
          <div className="flex items-center justify-between p-3.5 rounded-lg border border-[#cca77d]/40 bg-[#fbf8f0]">
            <div className="flex items-center gap-2.5">
              <Hash className="w-4 h-4 text-[#82542a]" />
              <div>
                <span className="text-xs font-serif font-semibold text-[#4d2d14] block">Page Numbers</span>
                <span className="text-[11px] text-[#78593a]">Display subtle vintage page numbering watermark</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.showPageNumbers}
              onChange={() => handleToggle('showPageNumbers')}
              className="w-4 h-4 accent-[#82542a] cursor-pointer"
            />
          </div>

          {/* Auto-Save */}
          <div className="flex items-center justify-between p-3.5 rounded-lg border border-[#cca77d]/40 bg-[#fbf8f0]">
            <div className="flex items-center gap-2.5">
              <HardDrive className="w-4 h-4 text-[#82542a]" />
              <div>
                <span className="text-xs font-serif font-semibold text-[#4d2d14] block">Automatic Persistence</span>
                <span className="text-[11px] text-[#78593a]">Autosave diary content to browser storage</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.autosaveEnabled}
              onChange={() => handleToggle('autosaveEnabled')}
              className="w-4 h-4 accent-[#82542a] cursor-pointer"
            />
          </div>

          {/* Default Page Background Texture for newly added pages */}
          <div className="p-3.5 rounded-lg border border-[#cca77d]/40 bg-[#fbf8f0] space-y-2">
            <span className="text-xs font-serif font-semibold text-[#4d2d14] block">Default Background for New Pages</span>
            <select
              value={settings.defaultPageTexture}
              onChange={(e) => onUpdateSettings({ ...settings, defaultPageTexture: e.target.value as VintageTextureId })}
              className="w-full text-xs p-2 rounded border border-[#bfa282] bg-white font-serif text-[#4d2d14]"
            >
              {Object.values(VINTAGE_TEXTURES).map(tex => (
                <option key={tex.id} value={tex.id}>{tex.name} ({tex.description})</option>
              ))}
            </select>
          </div>

          {/* Danger Zone: Reset settings & Reset diary */}
          <div className="pt-2 border-t border-[#cca77d]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onResetSettings}
              className="flex items-center gap-1.5 text-xs text-[#634830] hover:text-[#382313] font-serif"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset UI Preferences
            </button>

            <button
              onClick={confirmResetDiary}
              className="flex items-center gap-1.5 text-xs text-[#a63737] hover:text-[#7d1c1c] font-serif px-3 py-1.5 rounded border border-[#deb6b6] bg-[#fdf2f2] hover:bg-[#fadcdc]"
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Reset Entire Diary
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#cca77d]/40 bg-[#eedfc5]/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg bg-[#82542a] text-[#fbf7f0] font-serif text-xs font-semibold hover:bg-[#68411e] shadow-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
