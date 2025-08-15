document.addEventListener('DOMContentLoaded', function() {
    const identifyBtn = document.getElementById('identify-btn');
    const resultsContainer = document.getElementById('results');
    const possibleFlowersDiv = document.getElementById('possible-flowers');
    const emergencyWarning = document.getElementById('emergency-warning');
    
    // Database of poisonous flowers
    const poisonousFlowers = [
        {
            name: "Deadly Nightshade (Atropa belladonna)",
            symptoms: ["nausea", "dizziness"],
            characteristics: ["bell_shaped", "berries"],
            dangerLevel: "high",
            description: "Purple-green bell-shaped flowers with shiny black berries. All parts are poisonous.",
            image: "https://example.com/nightshade.jpg"
        },
        {
            name: "Poison Hemlock (Conium maculatum)",
            symptoms: ["dizziness", "nausea"],
            characteristics: ["white_flowers"],
            dangerLevel: "extreme",
            description: "Small white flowers in umbrella-like clusters. Extremely toxic - can be fatal.",
            image: "https://example.com/hemlock.jpg"
        },
        {
            name: "Oleander (Nerium oleander)",
            symptoms: ["nausea"],
            characteristics: [],
            dangerLevel: "high",
            description: "Beautiful pink or white flowers. All parts are toxic if ingested.",
            image: "https://example.com/oleander.jpg"
        },
        {
            name: "Giant Hogweed (Heracleum mantegazzianum)",
            symptoms: ["skin_irritation"],
            characteristics: ["white_flowers", "milky_sap"],
            dangerLevel: "moderate",
            description: "Large white flower clusters. Sap causes severe skin burns when exposed to sunlight.",
            image: "https://example.com/hogweed.jpg"
        }
    ];
    
    identifyBtn.addEventListener('click', function() {
        const checkedSymptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked')).map(el => el.value);
        const checkedCharacteristics = Array.from(document.querySelectorAll('input[name="characteristics"]:checked')).map(el => el.value);
        

        if (checkedSymptoms.length > 0) {
            emergencyWarning.classList.remove('hidden');
        } else {
            emergencyWarning.classList.add('hidden');
        }
        
        // Find matching flowers
        const matchedFlowers = poisonousFlowers.map(flower => {
            const symptomMatches = flower.symptoms.filter(symptom => 
                checkedSymptoms.includes(symptom)).length;
            const charMatches = flower.characteristics.filter(char => 
                checkedCharacteristics.includes(char)).length;
            
            const totalMatches = symptomMatches + charMatches;
            const maxPossible = flower.symptoms.length + flower.characteristics.length;
            const matchPercentage = maxPossible > 0 ? Math.round((totalMatches / maxPossible) * 100) : 0;
            
            return {
                ...flower,
                matchPercentage,
                totalMatches
            };
        }).filter(flower => flower.totalMatches > 0)
          .sort((a, b) => b.matchPercentage - a.matchPercentage);
        
        // Display results
        if (matchedFlowers.length === 0) {
            possibleFlowersDiv.innerHTML = '<p>No matches found based on your selections. Try adjusting your criteria.</p>';
        } else {
            possibleFlowersDiv.innerHTML = matchedFlowers.map(flower => `
                <div class="flower-card">
                    <h4>${flower.name} <span class="match-percentage">${flower.matchPercentage}% match</span></h4>
                    <p><strong>Danger level:</strong> ${flower.dangerLevel.toUpperCase()}</p>
                    <p>${flower.description}</p>
                    ${flower.image ? `<img src="${flower.image}" alt="${flower.name}" class="flower-image">` : ''}
                </div>
            `).join('');
        }
        
        resultsContainer.style.display = 'block';
    });
});