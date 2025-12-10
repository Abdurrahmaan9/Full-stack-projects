import React, { useState, useRef } from 'react';
import { Upload, Download, RotateCw } from 'lucide-react';

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [threshold, setThreshold] = useState(128);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage(img);
          processImage(img, threshold);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = (img, thresholdValue) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const brightness = (r + g + b) / 3;
      
      if (brightness > thresholdValue) {
        data[i + 3] = 0;
      } else {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    setProcessedImage(canvas.toDataURL('image/png'));
    setRotation(0);
  };

  const handleThresholdChange = (e) => {
    const newThreshold = parseInt(e.target.value);
    setThreshold(newThreshold);
    if (originalImage) {
      processImage(originalImage, newThreshold);
    }
  };

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const downloadImage = () => {
    if (processedImage) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (rotation === 90 || rotation === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'removed-background.png';
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 'image/png');
      };
      img.src = processedImage;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Background Remover
        </h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current.click()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Upload size={20} />
            Upload Image
          </button>
        </div>

        {originalImage && (
          <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Threshold: {threshold}
            </label>
            <input
              type="range"
              min="0"
              max="255"
              value={threshold}
              onChange={handleThresholdChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-2">
              Adjust to remove more or less background
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {originalImage && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Original</h2>
              <img
                src={originalImage.src}
                alt="Original"
                className="w-full rounded border border-gray-200"
              />
            </div>
          )}

          {processedImage && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Processed</h2>
                <button
                  onClick={rotateImage}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                  title="Rotate 90°"
                >
                  <RotateCw size={20} />
                </button>
              </div>
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded"
                  style={{
                    backgroundImage: 'repeating-conic-gradient(#eee 0% 25%, white 0% 50%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                  }}
                />
                <img
                  src={processedImage}
                  alt="Processed"
                  className="relative w-full rounded border border-gray-200"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              </div>
              <button
                onClick={downloadImage}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={20} />
                Download PNG {rotation > 0 && `(Rotated ${rotation}°)`}
              </button>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
