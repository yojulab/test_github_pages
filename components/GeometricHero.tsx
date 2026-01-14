import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GeometricHero: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Define geometric sequences
    const duration = 2000;
    
    const animateGeometry = () => {
        g.selectAll("*").remove(); // Clear previous

        // 1. Point
        const point = g.append("circle")
            .attr("r", 0)
            .attr("fill", "#ef4444") // Red-500
            .attr("opacity", 0);

        point.transition()
            .duration(1000)
            .attr("r", 8)
            .attr("opacity", 1)
            .transition()
            .delay(500)
            .duration(1000)
            .attr("cx", -100);

        // 2. Line
        const line = g.append("line")
            .attr("x1", -100)
            .attr("y1", 0)
            .attr("x2", -100)
            .attr("y2", 0)
            .attr("stroke", "#3b82f6") // Blue-500
            .attr("stroke-width", 2)
            .attr("opacity", 0);
            
        line.transition()
            .delay(2500)
            .duration(500)
            .attr("opacity", 1)
            .attr("x2", 100);

        // 3. Plane
        const plane = g.append("rect")
            .attr("x", -100)
            .attr("y", -60)
            .attr("width", 200)
            .attr("height", 0)
            .attr("fill", "#d4d4d8") // Zinc-300 (Light Gray for contrast on black)
            .attr("opacity", 0);

        plane.transition()
            .delay(3500)
            .duration(1000)
            .attr("opacity", 0.15) // Slightly higher opacity for visibility
            .attr("height", 120);

        // 4. Dimension (3D Box effect outline)
        const dimensionGroup = g.append("g").attr("opacity", 0);
        
        // Front face
        dimensionGroup.append("rect")
            .attr("x", -100).attr("y", -60).attr("width", 200).attr("height", 120)
            .attr("fill", "none").attr("stroke", "#a855f7").attr("stroke-width", 1); // Purple-500
        
        // Back face (offset)
        dimensionGroup.append("rect")
            .attr("x", -80).attr("y", -80).attr("width", 200).attr("height", 120)
            .attr("fill", "none").attr("stroke", "#a855f7").attr("stroke-width", 1).attr("opacity", 0.5);
            
        // Connecting lines
        dimensionGroup.append("line").attr("x1", -100).attr("y1", -60).attr("x2", -80).attr("y2", -80).attr("stroke", "#a855f7");
        dimensionGroup.append("line").attr("x1", 100).attr("y1", -60).attr("x2", 120).attr("y2", -80).attr("stroke", "#a855f7");
        dimensionGroup.append("line").attr("x1", -100).attr("y1", 60).attr("x2", -80).attr("y2", 40).attr("stroke", "#a855f7");
        dimensionGroup.append("line").attr("x1", 100).attr("y1", 60).attr("x2", 120).attr("y2", 40).attr("stroke", "#a855f7");

        dimensionGroup.transition()
            .delay(5000)
            .duration(1000)
            .attr("opacity", 1)
            .transition()
            .delay(2000)
            .duration(1000)
            .attr("opacity", 0);
    };

    animateGeometry();
    const interval = setInterval(animateGeometry, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default GeometricHero;