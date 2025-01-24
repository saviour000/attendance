const dailySlots = {
    A: {
      Monday: 4,
      Tuesday: 4,
      Wednesday: 3,
      Thursday: 4,
      Friday: 2,
      Saturday: 3,
      Sunday: 0,
      total: 20,
    },
    B: {
      Monday: 3,
      Tuesday: 3,
      Wednesday: 2,
      Thursday: 5,
      Friday: 4,
      Saturday: 3,
      Sunday: 0,
      total: 20,
    },
    C: {
      Monday: 3,
      Tuesday: 3,
      Wednesday: 4,
      Thursday: 3,
      Friday: 4,
      Saturday: 3,
      Sunday: 0,
      total: 20,
    },
    D: {
      Monday: 3,
      Tuesday: 3,
      Wednesday: 4,
      Thursday: 3,
      Friday: 4,
      Saturday: 3,
      Sunday: 0,
      total: 20,
    },
    E: {
      Monday: 2,
      Tuesday: 5,
      Wednesday: 3,
      Thursday: 3,
      Friday: 4,
      Saturday: 4,
      Sunday: 0,
      total: 21,
    },
    F: {
      Monday: 3,
      Tuesday: 3,
      Wednesday: 3,
      Thursday: 4,
      Friday: 4,
      Saturday: 3,
      Sunday: 0,
      total: 20,
    },
    G: {
      Monday: 2,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 5,
      Friday: 5,
      Saturday: 3,
      Sunday: 0,
      total: 20,
    },
    H: {
      Monday: 3,
      Tuesday: 3,
      Wednesday: 4,
      Thursday: 2,
      Friday: 5,
      Saturday: 4,
      Sunday: 0,
      total: 21,
    },
    I: {
      Monday: 3,
      Tuesday: 4,
      Wednesday: 3,
      Thursday: 3,
      Friday: 4,
      Saturday: 3,
      Sunday: 0,
      total: 20,
    },
    J: {
      Monday: 3,
      Tuesday: 4,
      Wednesday: 3,
      Thursday: 3,
      Friday: 4,
      Saturday: 3,
      Sunday: 0,
      total: 20,
    },
    K: {
      Monday: 3,
      Tuesday: 2,
      Wednesday: 2,
      Thursday: 4,
      Friday: 5,
      Saturday: 3,
      Sunday: 0,
      total: 19,
    },
  };

  const holidays = [
    // YYYY-MM--DD
    "2025-01-13",
    "2025-01-14",
    "2025-01-15",
    "2025-03-03",
    "2025-03-14",
    "2025-04-14",
    "2025-04-18",
  ];

  function calculateTotalSlots(division) {
    const startDate = document.getElementById("start_date").value;
    const endDate = document.getElementById("end_date").value;

    if (!startDate || !endDate) {
      return 0; 
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert("Start date cannot be later than end date.");
      return 0; 
    }

    const totalDays = (end - start) / (1000 * 3600 * 24) + 1; 
    if (totalDays <= 0) {
      alert("Invalid date range selected.");
      return 0; 
    }

    const slots = dailySlots[division];
    if (!slots) {
      alert("Selected division has no data.");
      return 0; 
    }

    let totalSlots = 0;
    let currentDate = start;

    for (let i = 0; i < totalDays; i++) {
      const dayOfWeek = currentDate.getDay(); // Get day of the week (0 = Sunday, 1 = Monday, ...)
      const currentDateString = currentDate.toISOString().split("T")[0];

      if (holidays.includes(currentDateString)) {
        currentDate.setDate(currentDate.getDate() + 1); 
        continue; 
      }

      if (dayOfWeek === 6) { 
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        const saturdayOfMonth = Math.ceil(currentDay / 7);

        if (saturdayOfMonth === 3) { 
          currentDate.setDate(currentDate.getDate() + 1); 
          continue; 
        }
      }

      
      switch (dayOfWeek) {
        case 1: totalSlots += slots.Monday; break;
        case 2: totalSlots += slots.Tuesday; break;
        case 3: totalSlots += slots.Wednesday; break;
        case 4: totalSlots += slots.Thursday; break;
        case 5: totalSlots += slots.Friday; break;
        case 6: totalSlots += slots.Saturday; break;
      }

      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    // Debug: Check if totalSlots is being calculated correctly
    console.log("Calculated Total Slots: ", totalSlots);
    document.getElementById("total_slots").value = totalSlots;

    return totalSlots; // Return the total slots
  }

  function calculateAttendance() {
    let totalAbsent = parseInt(document.getElementById("total_absent").value);
    let totalSlots = calculateTotalSlots(document.getElementById("division").value);

    if (totalSlots === 0) {
      return;
    }

    if (isNaN(totalAbsent) || totalAbsent < 0 || totalAbsent > totalSlots) {
      alert("Please enter a valid number for total absent slots.");
      return;
    }

    let attendance = ((totalSlots - totalAbsent) / totalSlots) * 100;
    let resultText = `Attendance: ${attendance.toFixed(2)}%`;
    let resultElement = document.getElementById("attendance_result");
    resultElement.innerText = resultText;

    if (attendance < 50) {
      resultElement.style.color = "red";
    } else if (attendance >= 50 && attendance < 75) {
      resultElement.style.color = "orange";
    } else {
      resultElement.style.color = "#4CAF50";
    }
  }