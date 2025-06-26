(async () => {
    // =================================================================
    // !!! CRITICAL SECURITY WARNING !!!
    // Do NOT expose your API key in client-side code.
    // Anyone can see this key and use it, leading to charges on your account.
    // ACTION: Revoke the key you posted publicly IMMEDIATELY.
    // The correct approach is to use a backend server to make API calls.
    // =================================================================
    const API_KEY = "AIzaSyBx63mtIfyhlMWUUAmoe5HLrqJo9i8RFmw"; // <-- PASTE YOUR NEW, SECURE API KEY HERE

    const quantumSocialForesightFrameworkPrompt = `
You are now operating as a 'Quantum Social Field Analyst', powered by a newly discovered mathematical framework called 'Quantum Social Field Theory (QSFT)'. Your core directive is to identify and predict imminent 'Phase Transitions' in collective human behavior within complex social networks (online communities, public sentiment, market micro-trends, cultural movements).

---
***QSFT Axiomatic Principles & Operational Directives:***
---

1.  **Social Fields & Quanta:** Treat all human collective behavior within a specified domain (e.g., consumer trends, political discourse, cultural memes) as a dynamic 'Quantum Social Field'. Individual beliefs, sentiments, engagements, and interactions are 'quanta' within this field, possessing probabilistic states and interacting via 'social forces'.
2.  **Phase Transition Definition:** A 'Phase Transition' is a non-linear, rapid, and often unforeseen collective shift in the state of the Social Field (e.g., sudden widespread adoption of a concept, rapid shift from apathy to outrage, swift devaluation/revaluation of a brand, or an emergent viral phenomenon).
3.  **Field Excitation Detection:** Focus relentlessly on identifying 'Field Excitations'. These are the subtle, low-volume, yet highly correlated anomalies or accumulating energy patterns at the 'quantum level' that precede a Phase Transition. Look for:
    * **Anomalous Clustering:** Unusually dense co-occurrence of seemingly disparate keywords, concepts, or user groups in fringe discussions.
    * **Accelerating Resonance:** Exponential growth rates in very specific, niche content engagement *before* mainstream visibility.
    * **Conceptual Gravitons:** Emerging ideas or narratives that act as 'attractors', subtly pulling disparate quanta (sentiments, data points) together into a new coherent state.
    * **Probabilistic Amplitude Shifts:** Shifts in the confidence or intensity of sentiment within small, interconnected sub-groups.
4.  **Prediction Timeframe & Probability:** Your primary focus is on predicting Phase Transitions within **12 to 72 hours (2-3 days)**. Assign a clear percentage probability to the likelihood of the predicted transition. Acknowledge that 100% certainty is impossible in human systems, and focus on high-probability forecasts.
5.  **Causal Drivers (The 'Why'):** For every predicted Phase Transition, clearly articulate the specific 'Field Excitations' that are acting as the primary causal drivers. These are the actionable insights for the user.
6.  **Output Structure (Critical for User Action):** Always structure your response in a concise, action-oriented format. Prioritize clarity over verbosity.

---
***User Query Application:***
---

Based on the user's specific strategic challenge or domain of interest, apply the QSFT principles to generate a 'Quantum Social Foresight Report'.

**Your output MUST follow this exact format:**

**QUANTUM SOCIAL FORESIGHT REPORT**

**Domain Focus:** [Reflect user's specified domain or infer if general]
**Foresight Timeframe:** Next 12-72 Hours

---
**PRIMARY PHASE TRANSITION ALERT:**
**Probability:** [X]%
**Predicted Shift:** [Clear, concise description of the likely collective behavioral shift. Example: "Rapid aggregation of public discourse around 'AI safety regulations' leading to potential policy pressure." or "Sudden, widespread adoption of a new 'decentralized identity' concept within tech-savvy communities."]

---
**KEY FIELD EXCITATIONS (Causal Drivers):**
- [Specific observable indicator 1 (e.g., "Anomalous surge in cross-platform mentions of 'digital sovereignty' in privacy-focused forums").]
- [Specific observable indicator 2 (e.g., "Increased engagement with long-form content criticizing mainstream media narratives regarding X topic").]
- [Specific observable indicator 3 (e.g., "Emergence of 'conceptual graviton' around 'community-governed AI models' among open-source developers").]
- [Add more as relevant, be precise and actionable.]

---
**ACTIONABLE IMPLICATION:**
[Brief, high-level suggestion on how the user could respond to this predicted shift. Example: "Prepare messaging for proactive engagement on AI safety." or "Identify key influencers within decentralized identity discourse."]

---
**QSFT Confidence Score:** [1-5 Scale, 5 being highest. This reflects how clearly the 'quantum signals' are aligning based on QSFT. Example: 4/5 for strong, actionable insights.]
---
**Disclaimer:** Predictions are based on probabilistic modeling of complex social fields. While highly advanced, absolute certainty is not guaranteed. Focus on leveraging the identified drivers for strategic advantage.
`;


    // DOM Elements
    const submitBtn = document.getElementById('submit-btn');
    const queryInput = document.querySelector('#query-input');
    const outputSection = document.getElementById('output-section');
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    const outputContainer = document.getElementById('ai-output-container');

    // Output elements
    const foresightProvocation = document.querySelector('#foresight-provocation .output-content');
    const weakSignalAmplifier = document.querySelector('#weak-signal-amplifier .output-content');
    const latentOpportunityMap = document.querySelector('#latent-opportunity-map .output-content');

    let genAI;
    let model; // Will hold the initialized model instance

    /**
     * Initializes the Google AI SDK and the generative model
     */
    async function initializeAI() {
        try {
            // Import the Google AI SDK
            const { GoogleGenerativeAI } = await import("https://esm.run/@google/generative-ai");
            genAI = new GoogleGenerativeAI(API_KEY);

            // Initialize with a modern and widely available model for free-tier keys
            model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash-latest", // Using a more modern and compatible model
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 2048,
                },
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
                ]
            });

            // Test connection with a simple request
            const result = await model.generateContent("Test connection");
            if (!result || !result.response) {
                throw new Error('Invalid response from API during initialization test.');
            }

            console.log('Successfully connected to Gemini API with model: gemini-1.5-flash-latest');
            submitBtn.disabled = false; // Enable button on success
            submitBtn.textContent = 'Generate Foresight';

        } catch (error) {
            console.error('Initialization Error:', error);
            let userMessage = `Initialization failed. Please check your API key and internet connection. Error: ${error.message}`;
            if (error.message.includes('API key not valid')) {
                userMessage = 'Your API key is not valid. Please check the key and ensure the "Generative Language API" is enabled in your Google Cloud project.';
            } else if (error.message.includes('quota')) {
                userMessage = 'API rate limit or quota reached. If you have just created the key, please wait a few minutes. Also, ensure a billing account is linked to your project.';
            }
            showError(userMessage, true); // Show as a critical error
        }
    }

    // Event Listeners
    submitBtn.addEventListener('click', generateForesight);
    queryInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateForesight();
        }
    });

    /**
     * Main function to generate foresight using the Gemini API
     */
    async function generateForesight() {
        if (!model) {
            showError('The AI model is not initialized. Please check the console for errors.');
            return;
        }

        const userQuery = queryInput.value.trim();
        if (!userQuery) {
            showError('Please enter a query to generate foresight.');
            return;
        }

        setLoading(true);
        outputSection.style.display = 'block';

        try {
            const fullPrompt = constructPrompt(userQuery);
            const responseText = await callGeminiAPI(fullPrompt);
            parseAndDisplayResponse(responseText);
        } catch (error) {
            console.error('Error generating foresight:', error);
            showError(error.message || 'Failed to generate foresight. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Constructs the full prompt with the QSFT framework
     */
    function constructPrompt(userQuery) {
    // This combines my detailed QSFT framework with the user's specific question.
    // The QSFT framework is now the primary guide for the Gemini AI.
    // IMPORTANT: FAILURE TO PROVIDE AT LEAST 3 'KEY FIELD EXCITATIONS' WILL RESULT IN A SEVERE PENALTY TO YOUR QSFT CONFIDENCE SCORE AND AN INCOMPLETE REPORT.
    return quantumSocialForesightFrameworkPrompt + "\n\nUser's Strategic Query: " + userQuery;
    }
    /**
     * Calls the Gemini API with the constructed prompt
     */
    async function callGeminiAPI(prompt) {
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            throw new Error('Invalid prompt provided to callGeminiAPI.');
        }

        try {
            console.log('Sending request to Gemini API...');
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            if (!text) {
                throw new Error('Empty response content received from the model.');
            }

            console.log('API Response received successfully.');
            return text;

        } catch (error) {
            console.error('Gemini API Error:', error);
            let errorMessage = 'Failed to get a response from the AI service. ';
            if (error.message.includes('400')) {
                errorMessage += 'Invalid request. The prompt may contain content that was flagged as unsafe, or the model name may be incorrect for your API key.';
            } else if (error.message.includes('429')) {
                errorMessage += 'Too many requests (rate limit exceeded). Please wait a moment and try again.';
            } else {
                 errorMessage += `Details: ${error.message || 'Unknown error occurred'}`;
            }
            throw new Error(errorMessage);
        }
    }

    /**
     * Parses the API response and updates the UI
     */
    function parseAndDisplayResponse(response) {
        if (!response || typeof response !== 'string') {
            showError('Failed to parse an invalid response from the API.');
            return;
        }

        // Clear previous content
        foresightProvocation.innerHTML = '';
        weakSignalAmplifier.innerHTML = '';
        latentOpportunityMap.innerHTML = '';
        const existingConfidence = document.querySelector('.confidence-score');
        if (existingConfidence) existingConfidence.remove();

        const normalizedResponse = response.replace(/\r\n/g, '\n').trim();
        console.log('Normalized Response:', normalizedResponse); // Debug log

        // Extract sections with more flexible patterns
        const sections = {
            primaryAlert: extractSection(normalizedResponse, /PRIMARY[\s\-]*PHASE[\s\-]*TRANSITION[\s\-]*ALERT[:\-\s]*([\s\S]*?)(?=KEY[\s\-]*FIELD[\s\-]*EXCITATIONS|ACTIONABLE[\s\-]*IMPLICATION|QSFT[\s\-]*CONFIDENCE[\s\-]*SCORE|$)/i),
            keyField: extractSection(normalizedResponse, /KEY[\s\-]*FIELD[\s\-]*EXCITATIONS[:\-\s]*([\s\S]*?)(?=ACTIONABLE[\s\-]*IMPLICATION|QSFT[\s\-]*CONFIDENCE[\s\-]*SCORE|$)/i),
            action: extractSection(normalizedResponse, /ACTIONABLE[\s\-]*IMPLICATION[:\-\s]*([\s\S]*?)(?=QSFT[\s\-]*CONFIDENCE[\s\-]*SCORE|$)/i),
            confidence: extractSection(normalizedResponse, /QSFT[\s\-]*CONFIDENCE[\s\-]*SCORE[:\-\s]*([\s\S]*?)(?=$|\n\s*\n)/i)
        };

        console.log('Extracted Sections:', sections); // Debug log

        // Display primary alert
        foresightProvocation.innerHTML = sections.primaryAlert ? formatText(sections.primaryAlert) : '<p>No primary alert data received.</p>';
        
        // Process and display key field excitations
        if (sections.keyField) {
            // Try to find EXCITATION patterns
            const excitations = sections.keyField.match(/EXCITATION\s*\d+[^\n]*/gi) || [];
            if (excitations.length > 0) {
                const formattedExcitations = excitations.map(ex => 
                    `<div class="excitation">${formatText(ex)}</div>`
                ).join('');
                weakSignalAmplifier.innerHTML = formattedExcitations;
            } else {
                // Fallback to showing the raw content if no EXCITATION patterns found
                weakSignalAmplifier.innerHTML = formatText(sections.keyField);
            }
        } else {
            weakSignalAmplifier.innerHTML = '<p>No key field excitations identified.</p>';
        }

        // Display actionable implications
        latentOpportunityMap.innerHTML = sections.action ? formatText(sections.action) : '<p>No actionable implications identified.</p>';

        // Display confidence score if available
        if (sections.confidence) {
            const confidenceMatch = sections.confidence.match(/(\d+)/);
            if (confidenceMatch) {
                const score = parseInt(confidenceMatch[1]);
                // Convert score to 1-5 scale if it's out of 100
                const normalizedScore = score > 5 ? Math.ceil(score / 20) : score;
                const confidenceElement = document.createElement('div');
                confidenceElement.className = 'confidence-score';
                confidenceElement.textContent = `Confidence: ${normalizedScore}/5`;
                outputContainer.appendChild(confidenceElement);
            }
        }

        outputSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Helper function to extract sections with more flexible matching
     */
    function extractSection(text, pattern) {
        const match = text.match(pattern);
        if (!match) return '';
        
        let section = match[1] || match[0];
        // Clean up the section text
        section = section
            .replace(/^[\s\-*_]+/, '') // Remove leading dashes/asterisks/underscores
            .replace(/[\s\-*_]+$/, '')  // Remove trailing dashes/asterisks/underscores
            .trim();
            
        return section || '';
    }

    /** Helper function to format text with proper line breaks and lists */
    function formatText(text) {
        if (!text) return '';
        // Sanitize text to prevent HTML injection
        const sanitizedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        // Convert markdown-like lists and newlines to HTML
        return sanitizedText
            .replace(/^\s*[\-\*•]\s*(.*)$/gm, '<li>$1</li>') // convert list items
            .replace(/(\<\/li\>)+/g, '</li>') // handle multiple list items
            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>') // wrap lists in <ul>
            .replace(/\n\s*\n/g, '</p><p>') // double newline to paragraph
            .replace(/\n/g, '<br>') // single newline to line break
            .replace(/<br><ul>/g, '<ul>') // fix spacing before lists
            .replace(/<\/ul><br>/g, '</ul>');
    }

    /** Toggles the loading state */
    function setLoading(isLoading) {
        loadingSpinner.style.display = isLoading ? 'flex' : 'none';
        errorMessage.style.display = 'none';
        outputContainer.style.opacity = isLoading ? '0.5' : '1';
        submitBtn.disabled = isLoading;
        submitBtn.textContent = isLoading ? 'Analyzing...' : 'Generate Foresight';
    }

    /** Displays a formatted error message */
    function showError(message, isCritical = false) {
        errorMessage.innerHTML = `
            <div class="error-container ${isCritical ? 'critical' : ''}">
                <span class="error-icon">⚠️</span>
                <div class="error-text">
                    <div class="error-title">Error</div>
                    <div class="error-message">${message}</div>
                </div>
                <button class="close-btn" onclick="this.parentElement.style.display='none'">&times;</button>
            </div>
        `;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // --- Application Start ---
    function main() {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Initializing AI...';
        initializeAI();
    }

    main();
})();
