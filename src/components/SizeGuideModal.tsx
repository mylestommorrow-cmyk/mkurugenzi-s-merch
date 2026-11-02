import React from 'react';
import { X, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, sizeGuideCategory } = useCart();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-neutral-200 text-neutral-900"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-neutral-800" />
            <h3 className="text-lg font-bold text-neutral-950 capitalize">
              {sizeGuideCategory} Dimension &amp; Sizing Chart
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            aria-label="Close size guide"
            className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
          Atelier Nord garments are engineered with architectural drape. Sizes are true to size for a structured, contemporary silhouette. All measurements listed in centimeters (cm).
        </p>

        {sizeGuideCategory === 'shirts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-neutral-100 text-neutral-700 uppercase font-mono-data text-[11px]">
                <tr>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Chest (cm)</th>
                  <th className="p-2.5">Shoulder (cm)</th>
                  <th className="p-2.5">Length (cm)</th>
                  <th className="p-2.5">Sleeve (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono-data">
                <tr><td className="p-2.5 font-bold">XS</td><td className="p-2.5">104</td><td className="p-2.5">50</td><td className="p-2.5">69</td><td className="p-2.5">22</td></tr>
                <tr><td className="p-2.5 font-bold">S</td><td className="p-2.5">110</td><td className="p-2.5">52</td><td className="p-2.5">71</td><td className="p-2.5">23</td></tr>
                <tr><td className="p-2.5 font-bold">M</td><td className="p-2.5">116</td><td className="p-2.5">54</td><td className="p-2.5">73</td><td className="p-2.5">24</td></tr>
                <tr><td className="p-2.5 font-bold">L</td><td className="p-2.5">122</td><td className="p-2.5">56</td><td className="p-2.5">75</td><td className="p-2.5">25</td></tr>
                <tr><td className="p-2.5 font-bold">XL</td><td className="p-2.5">128</td><td className="p-2.5">58</td><td className="p-2.5">77</td><td className="p-2.5">26</td></tr>
                <tr><td className="p-2.5 font-bold">XXL</td><td className="p-2.5">134</td><td className="p-2.5">60</td><td className="p-2.5">79</td><td className="p-2.5">27</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {sizeGuideCategory === 'coats' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-neutral-100 text-neutral-700 uppercase font-mono-data text-[11px]">
                <tr>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Chest (cm)</th>
                  <th className="p-2.5">Total Length (cm)</th>
                  <th className="p-2.5">Sleeve (cm)</th>
                  <th className="p-2.5">Fit Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono-data">
                <tr><td className="p-2.5 font-bold">38 (S)</td><td className="p-2.5">114</td><td className="p-2.5">112</td><td className="p-2.5">64</td><td className="p-2.5 font-sans">Under 175cm / 5'9"</td></tr>
                <tr><td className="p-2.5 font-bold">40 (M)</td><td className="p-2.5">120</td><td className="p-2.5">115</td><td className="p-2.5">65.5</td><td className="p-2.5 font-sans">175–182cm / 5'9"–6'0"</td></tr>
                <tr><td className="p-2.5 font-bold">42 (L)</td><td className="p-2.5">126</td><td className="p-2.5">118</td><td className="p-2.5">67</td><td className="p-2.5 font-sans">182–188cm / 6'0"–6'2"</td></tr>
                <tr><td className="p-2.5 font-bold">44 (XL)</td><td className="p-2.5">132</td><td className="p-2.5">121</td><td className="p-2.5">68.5</td><td className="p-2.5 font-sans">188cm+ / 6'2"+</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {sizeGuideCategory === 'hats' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-neutral-100 text-neutral-700 uppercase font-mono-data text-[11px]">
                <tr>
                  <th className="p-2.5">Headwear Style</th>
                  <th className="p-2.5">Circumference (cm)</th>
                  <th className="p-2.5">Crown Depth</th>
                  <th className="p-2.5">Adjustment Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono-data">
                <tr><td className="p-2.5 font-bold font-sans">Canvas &amp; Felt Caps</td><td className="p-2.5">54–61 cm</td><td className="p-2.5">11.5 cm</td><td className="p-2.5 font-sans">Leather Strap / Brass Buckle</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Merino Watch Beanie</td><td className="p-2.5">52–62 cm (Elastic)</td><td className="p-2.5">18 cm (Folded)</td><td className="p-2.5 font-sans">Whole-Garment Ribbed Knit</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Twill Bucket S/M</td><td className="p-2.5">56–58 cm</td><td className="p-2.5">8.5 cm</td><td className="p-2.5 font-sans">Structured Internal Band</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Twill Bucket L/XL</td><td className="p-2.5">59–61 cm</td><td className="p-2.5">9.0 cm</td><td className="p-2.5 font-sans">Structured Internal Band</td></tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-4 py-2 bg-neutral-900 text-white rounded text-xs font-semibold cursor-pointer hover:bg-neutral-800"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
