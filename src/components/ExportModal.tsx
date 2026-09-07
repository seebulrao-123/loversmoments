import React, { useState } from 'react';
import { X, Image as ImageIcon, FileText, Download, CheckCircle, Loader2, Printer, Sliders } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { DiaryPage } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  pages: DiaryPage[];
  currentPageIndex: number;
}

type PageSizeOption = 'a4' | 'a5' | 'letter';
type OrientationOption = 'portrait' | 'landscape';
type MarginOption = 'none' | 'normal' | 'wide';
type RangeOption = 'all' | 'current' | 'custom';

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  pages,
  currentPageIndex,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [exportComplete, setExportComplete] = useState(false);

  // PDF Configuration Options
  const [pageSize, setPageSize] = useState<PageSizeOption>('a4');
  const [orientation, setOrientation] = useState<OrientationOption>('portrait');
  const [margins, setMargins] = useState<MarginOption>('normal');
  const [pageRange, setPageRange] = useState<RangeOption>('all');
  const [customRange, setCustomRange] = useState('1-' + Math.max(1, pages.length));
  const [highDpi, setHighDpi] = useState(true);

  if (!isOpen) return null;

  // Compute pages to export based on range selection
  const getPagesToExport = (): { page: DiaryPage; index: number }[] => {
    if (pageRange === 'current') {
      const p = pages[currentPageIndex] || pages[0];
      return [{ page: p, index: currentPageIndex }];
    }
    if (pageRange === 'all') {
      return pages.map((p, i) => ({ page: p, index: i }));
    }
    // Custom range (e.g. "1, 3-5")
    const indices = new Set<number>();
    const parts = customRange.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [startStr, endStr] = trimmed.split('-');
        const s = parseInt(startStr, 10);
        const e = parseInt(endStr, 10);
        if (!isNaN(s) && !isNaN(e)) {
          for (let k = Math.min(s, e); k <= Math.max(s, e); k++) {
            if (k >= 0 && k < pages.length) indices.add(k);
          }
        }
      } else {
        const single = parseInt(trimmed, 10);
        if (!isNaN(single) && single >= 0 && single < pages.length) {
          indices.add(single);
        }
      }
    }
    const result = Array.from(indices).sort((a, b) => a - b).map(idx => ({
      page: pages[idx],
      index: idx,
    }));
    return result.length > 0 ? result : pages.map((p, i) => ({ page: p, index: i }));
  };

  const handleExportPageImage = async () => {
    setIsExporting(true);
    setProgressText('Rendering high-resolution image...');
    setExportComplete(false);

    try {
      const page = pages[currentPageIndex] || pages[0];
      const pageElement = document.getElementById(`page_surface_${page.id}`);

      if (!pageElement) {
        alert('Could not find active page element to export.');
        setIsExporting(false);
        return;
      }

      const canvas = await html2canvas(pageElement, {
        scale: highDpi ? 3 : 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Moments_Diary_Page_${page.pageNumber || 'Cover'}.png`;
      link.href = dataUrl;
      link.click();

      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3500);
    } catch (err) {
      console.error('Image export failed:', err);
      alert('Failed to export page as image.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDiaryPDF = async () => {
    setIsExporting(true);
    setExportComplete(false);

    try {
      const targetPages = getPagesToExport();
      if (targetPages.length === 0) {
        alert('No pages selected for export.');
        setIsExporting(false);
        return;
      }

      // Initialize jsPDF with selected size and orientation
      const pdf = new jsPDF({
        orientation: orientation === 'portrait' ? 'p' : 'l',
        unit: 'mm',
        format: pageSize,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Margin in mm
      const marginMm = margins === 'none' ? 0 : margins === 'wide' ? 18 : 8;

      for (let i = 0; i < targetPages.length; i++) {
        const { page } = targetPages[i];
        setProgressText(`Rendering page ${i + 1} of ${targetPages.length} (Page ${page.pageNumber || 'Cover'})...`);

        const pageElement = document.getElementById(`page_surface_${page.id}`);
        if (pageElement) {
          const canvas = await html2canvas(pageElement, {
            scale: highDpi ? 3 : 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            logging: false,
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.98);
          if (i > 0) {
            pdf.addPage(pageSize, orientation === 'portrait' ? 'p' : 'l');
          }

          if (marginMm === 0) {
            // Full bleed print
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
          } else {
            // Preserve page canvas aspect ratio inside margins
            const availW = pdfWidth - marginMm * 2;
            const availH = pdfHeight - marginMm * 2;
            const canvasAspect = canvas.width / canvas.height;

            let w = availW;
            let h = w / canvasAspect;
            if (h > availH) {
              h = availH;
              w = h * canvasAspect;
            }

            const x = (pdfWidth - w) / 2;
            const y = (pdfHeight - h) / 2;
            pdf.addImage(imgData, 'JPEG', x, y, w, h);
          }
        }
      }

      setProgressText('Compiling print-quality document...');
      pdf.save(`Moments_Vintage_Diary_${pageSize.toUpperCase()}_${orientation}.pdf`);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3500);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to export diary as PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl border border-[#a67c52]/60 text-[#3b2716] max-h-[90vh] flex flex-col"
        style={{
          backgroundColor: '#fbf7ee',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(210,180,140,0.2) 0%, transparent 80%)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#cca77d]/40 bg-[#eedfc5]/80">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#82542a]" />
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#442c16]">
                Print-Quality Export
              </h2>
              <p className="text-xs text-[#78593a]">Save memoirs in archival print quality</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#735133] hover:bg-[#e4cfb2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs font-serif">
          {/* Quick Option 1: Page as Image */}
          <div className="p-3.5 rounded-lg border border-[#cca77d]/50 bg-[#fffdfa] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[#eedfc5] text-[#734720]">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-[#442c16] text-sm block">Export Current Page (PNG)</span>
                <span className="text-[11px] text-[#78593a]">High-res 300 DPI image snapshot</span>
              </div>
            </div>
            <button
              onClick={handleExportPageImage}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-md bg-[#82542a] text-white font-medium hover:bg-[#68411e] transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              Export PNG
            </button>
          </div>

          {/* Section Divider */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#cca77d]/30 text-[#82542a] font-bold">
            <Sliders className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">PDF Print Configuration</span>
          </div>

          {/* Paper Size & Orientation */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#442c16] block mb-1">Paper Size</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'a4', label: 'A4' },
                  { id: 'a5', label: 'A5' },
                  { id: 'letter', label: 'Letter' },
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setPageSize(s.id as PageSizeOption)}
                    className={`py-1.5 px-2 rounded border text-center transition-colors cursor-pointer ${
                      pageSize === s.id
                        ? 'bg-[#82542a] text-white border-[#82542a] font-bold'
                        : 'bg-[#fffdfa] text-[#543b24] border-[#cca77d]/60 hover:bg-[#ecd8be]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-[#442c16] block mb-1">Orientation</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'portrait', label: 'Portrait' },
                  { id: 'landscape', label: 'Landscape' },
                ].map(o => (
                  <button
                    key={o.id}
                    onClick={() => setOrientation(o.id as OrientationOption)}
                    className={`py-1.5 px-2 rounded border text-center transition-colors cursor-pointer ${
                      orientation === o.id
                        ? 'bg-[#82542a] text-white border-[#82542a] font-bold'
                        : 'bg-[#fffdfa] text-[#543b24] border-[#cca77d]/60 hover:bg-[#ecd8be]'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Margins */}
          <div>
            <label className="font-bold text-[#442c16] block mb-1">Print Margins</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'none', label: 'None (Full Bleed)' },
                { id: 'normal', label: 'Standard (8mm)' },
                { id: 'wide', label: 'Wide Elegant (18mm)' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMargins(m.id as MarginOption)}
                  className={`py-1.5 px-2 rounded border text-center transition-colors cursor-pointer ${
                    margins === m.id
                      ? 'bg-[#82542a] text-white border-[#82542a] font-bold'
                      : 'bg-[#fffdfa] text-[#543b24] border-[#cca77d]/60 hover:bg-[#ecd8be]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Page Range Selection */}
          <div>
            <label className="font-bold text-[#442c16] block mb-1">Page Selection</label>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {[
                { id: 'all', label: `All (${pages.length})` },
                { id: 'current', label: 'Current Page' },
                { id: 'custom', label: 'Custom Range' },
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => setPageRange(r.id as RangeOption)}
                  className={`py-1.5 px-2 rounded border text-center transition-colors cursor-pointer ${
                    pageRange === r.id
                      ? 'bg-[#82542a] text-white border-[#82542a] font-bold'
                      : 'bg-[#fffdfa] text-[#543b24] border-[#cca77d]/60 hover:bg-[#ecd8be]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {pageRange === 'custom' && (
              <input
                type="text"
                placeholder="e.g. 0, 1-4 (0 is cover)"
                value={customRange}
                onChange={(e) => setCustomRange(e.target.value)}
                className="w-full px-3 py-1.5 rounded border border-[#cca77d] bg-white text-[#3d2716] focus:outline-none focus:ring-2 focus:ring-[#82542a]"
              />
            )}
          </div>

          {/* High Resolution Toggle */}
          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={highDpi}
              onChange={(e) => setHighDpi(e.target.checked)}
              className="accent-[#82542a] w-4 h-4 rounded"
            />
            <span className="text-xs text-[#543b24]">
              High-Resolution 300 DPI Rendering (recommended for physical printing)
            </span>
          </label>

          {/* Export PDF Button */}
          <button
            onClick={handleExportDiaryPDF}
            disabled={isExporting}
            className="w-full py-3 rounded-lg bg-[#82542a] text-[#fffdfa] font-serif font-bold text-sm hover:bg-[#68411e] transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Generate & Download Print PDF</span>
          </button>

          {/* Loading Indicator */}
          {isExporting && (
            <div className="p-3 rounded-lg bg-[#efe3ce] border border-[#cca77d]/50 flex items-center justify-center gap-2.5">
              <Loader2 className="w-4 h-4 text-[#82542a] animate-spin" />
              <span className="text-xs font-serif text-[#54361e]">{progressText}</span>
            </div>
          )}

          {/* Success message */}
          {exportComplete && (
            <div className="p-3 rounded-lg bg-[#e3eedb] border border-[#a2c98d] flex items-center justify-center gap-2 text-[#2e591c] text-xs font-serif">
              <CheckCircle className="w-4 h-4" />
              <span>Document exported and downloaded successfully!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#cca77d]/40 bg-[#eedfc5]/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg bg-[#82542a] text-[#fbf7f0] font-serif text-xs font-semibold hover:bg-[#68411e] shadow-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
