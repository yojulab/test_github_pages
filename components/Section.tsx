import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, className = "", children, dark = false }) => {
  // dark prop now switches between Pure Black (default) and Dark Zinc (dark=true) for contrast
  return (
    <section 
      id={id} 
      className={`py-20 md:py-32 ${dark ? 'bg-zinc-950' : 'bg-black'} text-white ${className}`}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
};

export default Section;