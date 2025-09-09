function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const sectionTop = section.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
    });
}

function showTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function generateItinerary() {
    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const travelers = document.getElementById('travelers').value;
    const budget = document.getElementById('budget').value;
    
    if (!destination || !startDate || !endDate) {
        alert('Please fill in all required fields');
        return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) {
        alert('End date must be after start date');
        return;
    }
    
    const itinerary = generateMockItinerary(destination, days, travelers, budget);
    displayItinerary(itinerary);
}

function generateMockItinerary(destination, days, travelers, budget) {
    const activities = {
        budget: [
            'Visit free museums and galleries',
            'Explore local parks and gardens',
            'Walking food tours',
            'Free walking tours',
            'Local markets exploration',
            'Photography walks',
            'Beach activities',
            'Hiking trails'
        ],
        mid: [
            'Guided city tours',
            'Cultural performances',
            'Cooking classes',
            'Wine tasting',
            'Boat tours',
            'Adventure activities',
            'Spa treatments',
            'Shopping districts'
        ],
        luxury: [
            'Private guided tours',
            'Fine dining experiences',
            'Helicopter tours',
            'Luxury spa days',
            'Private yacht charters',
            'Exclusive cultural events',
            'Personal shopping experiences',
            'VIP attraction access'
        ]
    };
    
    const accommodations = {
        budget: 'Budget-friendly hostels and guesthouses',
        mid: 'Comfortable 3-star hotels',
        luxury: 'Luxury 5-star hotels and resorts'
    };
    
    const restaurants = {
        budget: ['Local street food', 'Casual dining', 'Food courts'],
        mid: ['Popular restaurants', 'Themed dining', 'Local specialties'],
        luxury: ['Fine dining', 'Michelin-starred restaurants', 'Exclusive venues']
    };
    
    const selectedActivities = activities[budget];
    const selectedRestaurants = restaurants[budget];
    
    const itinerary = {
        destination,
        days,
        travelers,
        budget,
        accommodation: accommodations[budget],
        dailyPlan: []
    };
    
    for (let day = 1; day <= days; day++) {
        const dayActivities = [];
        const numActivities = Math.min(3, selectedActivities.length);
        
        for (let i = 0; i < numActivities; i++) {
            const randomActivity = selectedActivities[Math.floor(Math.random() * selectedActivities.length)];
            if (!dayActivities.includes(randomActivity)) {
                dayActivities.push(randomActivity);
            }
        }
        
        const randomRestaurant = selectedRestaurants[Math.floor(Math.random() * selectedRestaurants.length)];
        
        itinerary.dailyPlan.push({
            day,
            morning: dayActivities[0] || 'Free time',
            afternoon: dayActivities[1] || 'Leisure time',
            evening: dayActivities[2] || 'Rest and relaxation',
            dining: randomRestaurant
        });
    }
    
    return itinerary;
}

function displayItinerary(itinerary) {
    const modal = document.getElementById('itinerary-result');
    const detailsDiv = document.getElementById('itinerary-details');
    
    let html = `
        <div class="itinerary-header">
            <h4>${itinerary.destination} - ${itinerary.days} Days</h4>
            <p><strong>Travelers:</strong> ${itinerary.travelers}</p>
            <p><strong>Budget:</strong> ${itinerary.budget.charAt(0).toUpperCase() + itinerary.budget.slice(1)}</p>
            <p><strong>Accommodation:</strong> ${itinerary.accommodation}</p>
        </div>
        <div class="daily-plans">
    `;
    
    itinerary.dailyPlan.forEach(day => {
        html += `
            <div class="day-plan">
                <h5>Day ${day.day}</h5>
                <div class="time-slots">
                    <div class="time-slot">
                        <strong>Morning:</strong> ${day.morning}
                    </div>
                    <div class="time-slot">
                        <strong>Afternoon:</strong> ${day.afternoon}
                    </div>
                    <div class="time-slot">
                        <strong>Evening:</strong> ${day.evening}
                    </div>
                    <div class="time-slot">
                        <strong>Dining:</strong> ${day.dining}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div class="itinerary-footer">
            <p><em>This is a personalized itinerary based on your preferences. Feel free to modify according to your interests!</em></p>
        </div>
    `;
    
    detailsDiv.innerHTML = html;
    modal.style.display = 'block';
    
    addItineraryStyles();
}

function addItineraryStyles() {
    if (document.getElementById('itinerary-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'itinerary-styles';
    style.textContent = `
        .itinerary-header {
            border-bottom: 2px solid #667eea;
            padding-bottom: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .itinerary-header h4 {
            color: #667eea;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .itinerary-header p {
            margin: 0.25rem 0;
            color: #666;
        }
        
        .day-plan {
            background: #f8f9fa;
            padding: 1.5rem;
            margin-bottom: 1rem;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .day-plan h5 {
            color: #333;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
        
        .time-slot {
            padding: 0.5rem 0;
            border-bottom: 1px solid #e1e5e9;
        }
        
        .time-slot:last-child {
            border-bottom: none;
        }
        
        .time-slot strong {
            color: #667eea;
            display: inline-block;
            width: 100px;
        }
        
        .itinerary-footer {
            text-align: center;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e1e5e9;
        }
        
        .itinerary-footer em {
            color: #666;
            font-size: 0.9rem;
        }
    `;
    
    document.head.appendChild(style);
}

function closeModal() {
    document.getElementById('itinerary-result').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('itinerary-result');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    startDateInput.min = today.toISOString().split('T')[0];
    endDateInput.min = tomorrow.toISOString().split('T')[0];
    
    startDateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        endDateInput.min = nextDay.toISOString().split('T')[0];
    });
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    document.querySelectorAll('.search-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Search functionality would connect to travel booking APIs in a production environment.');
        });
    });
});