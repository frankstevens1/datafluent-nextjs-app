import React, { ReactNode } from 'react';

interface CenterOverlayProps {
  children: ReactNode;
  isVisible?: boolean;
}

const CenterOverlay: React.FC<CenterOverlayProps> = ({ children, isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-40"
    >
      <div className="relative p-8 rounded-lg border border-dashed border-red-600">
        {children}
      </div>
    </div>
  );
};

export default CenterOverlay;
