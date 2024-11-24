function updateTimeline() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();

  // Define the tariff periods with their colors
  const tariffBlocks = [
    { start: 20, end: 6, color: "green" }, // Nocturno: 8 PM - 6 AM
    { start: 6, end: 10, color: "orange" }, // Valle: 6 AM - 10 AM
    { start: 12.5, end: 17.5, color: "orange" }, // Valle: 12:30 PM - 5:30 PM
    { start: 10, end: 12.4, color: "red" }, // Punta: 10 AM - 12:30 PM
    { start: 17.6, end: 19.9, color: "red" }, // Punta: 5:31 PM - 8 PM
  ];

  // Apply color to each block based on the tariff periods
  for (let i = 0; i < 24; i++) {
    const block = document.getElementById(`block${i + 1}`);
    const hour = i; // Hour corresponding to the block
    let color = "";

    for (const tariff of tariffBlocks) {
      // Handle crossing midnight for Nocturno
      if (
        (tariff.start > tariff.end &&
          (hour >= tariff.start || hour < tariff.end)) ||
        (hour >= tariff.start && hour < tariff.end)
      ) {
        color = tariff.color;
        break;
      }
    }
    block.style.backgroundColor = color;
  }

  // Calculate current time in seconds
  const currentTimeInSeconds =
    currentHour * 3600 + currentMinute * 60 + currentSecond;
  const totalSecondsInDay = 24 * 3600;

  // Calculate the percentage of the timeline based on the current time
  const position = (currentTimeInSeconds / totalSecondsInDay) * 100;

  // Move the arrow with Anime.js
  anime({
    targets: ".arrow",
    left: `${position}%`,
    duration: 1000,
    easing: "linear",
  });
}

// Update every second
setInterval(updateTimeline, 1000);

// Initial update when the page loads
updateTimeline();
