import { useEffect, useState } from "react";
import 'ldrs/ring';
import 'ldrs/hourglass';

function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <l-hourglass 
        size={60} 
        bg-opacity="0.1"
        speed="1.75"
        color="#16a34a" 
      />
    </div>
  );
}

export default Loading;

