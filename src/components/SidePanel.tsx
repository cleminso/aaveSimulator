import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const SidePanel: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen transition-width duration-300 ease-in-out ${
        isCollapsed ? 'w-12' : 'w-56'
      }`}
    >
      <Button onClick={toggleCollapse} className="mt-4">
        {isCollapsed ? 'Expand' : 'Collapse'}
      </Button>
    </div>
  );
};

export default SidePanel;
