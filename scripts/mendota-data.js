import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Set up dimensions and margins
const margin = { top: 20, right: 30, bottom: 50, left: 60 };
const width = 750 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Create SVG container
const svg = d3
  .select("#mendota-data")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create tooltip
const tooltip = d3.select("body").append("div").attr("class", "tooltip");

// Read CSV file
d3.csv("../data/ice_data.csv")
  .then(function (data) {
    // Convert string values to numbers
    data.forEach((d) => {
      d.year = +d.year;
      d.days = +d.days;
    });

    // Sort data by year
    data.sort((a, b) => a.year - b.year);

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.days) * 1.1])
      .range([height, 0]);

    // Create line generator
    const line = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.days))
      .curve(d3.curveMonotoneX); // Smooth line

    // Add the line path
    svg.append("path").datum(data).attr("class", "line").attr("d", line);

    // Add circles for each data point
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.year))
      .attr("cy", (d) => yScale(d.days))
      .attr("r", 3)
      .on("mouseover", function (event, d) {
        // Highlight circle
        d3.select(this).transition().duration(200).attr("r", 6);

        // Show tooltip
        tooltip
          .style("opacity", 1)
          .html(`Year: ${d.year}<br>Days: ${d.days}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        // Reset circle
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 3)
          .style("fill", "black");

        // Hide tooltip
        tooltip.style("opacity", 0);
      });

    // regression data is normalized to start at x = 1855 and end at x = 2023
    const regression = { intercept: 118.629, slope: -34.099 };
    const regressionData = [
      {
        year: d3.min(data, (d) => d.year),
        days: regression.intercept + regression.slope * 0,
      },
      {
        year: d3.max(data, (d) => d.year),
        days: regression.intercept + regression.slope * 1,
      },
    ];

    // Add regression line
    const regressionLine = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.days));

    svg
      .append("path")
      .datum(regressionData)
      .attr("class", "regression-line")
      .attr("d", regressionLine)
      .style("fill", "none")
      .style("stroke-width", 2)
      .style("stroke-dasharray", "5,5"); // Dashed line

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d"))) // Format as integers
      .append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", 35)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .text("Year");

    // Add y-axis
    svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .text("Number of Days");

    // Add grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""))
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.2);

    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.2);

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Number of days Lake Mendota is frozen over time (1855-2023)");
  })
  .catch(function (error) {
    console.error("Error loading the CSV file:", error);
  });
