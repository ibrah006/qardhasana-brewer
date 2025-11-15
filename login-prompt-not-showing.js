  
(function () {
  "use strict";

  // Widget data is injected by the endpoint
  const widgetData = window.__QARDHASANA_WIDGET_DATA__;
  
  if (!widgetData) {
    console.error('QardHasana widget data not found');
    return;
  }

  // Store hostIdentifier for backend requests
  widgetData.hostIdentifier = '7';

  // Extract host color or use default
  const hostColor = widgetData.host.widgetColor || '#15803d';

  // --- START: CSS for the widget ---
  const css = `
    /* Trigger Button Styles */
    #qardhasana-trigger-button {
      all: initial;
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    #qardhasana-trigger-button button {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 28px;
      background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 8px 32px rgba(21, 128, 61, 0.3), 0 0 0 0 rgba(21, 128, 61, 0.4);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
      animation: pulse-shadow 2s infinite;
    }

    @keyframes pulse-shadow {
      0%, 100% {
        box-shadow: 0 8px 32px rgba(21, 128, 61, 0.3), 0 0 0 0 rgba(21, 128, 61, 0.4);
      }
      50% {
        box-shadow: 0 8px 32px rgba(21, 128, 61, 0.4), 0 0 0 8px rgba(21, 128, 61, 0);
      }
    }

    #qardhasana-trigger-button button:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 40px rgba(21, 128, 61, 0.4);
      background: linear-gradient(135deg, #166534 0%, #15803d 100%);
    }

    #qardhasana-trigger-button button:active {
      transform: translateY(-1px) scale(1);
    }

    #qardhasana-trigger-button svg {
      animation: heartbeat 1.5s ease-in-out infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      10%, 30% { transform: scale(1.15); }
      20%, 40% { transform: scale(1); }
    }

    /* Modal Overlay */
    #qardhasana-modal-overlay {
      all: initial;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 1000000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      padding: 20px;
    }

    #qardhasana-modal-overlay.show {
      opacity: 1;
    }

    /* Modal Container */
    #qardhasana-widget-container {
      all: initial;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      background: linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%);
      border-radius: 24px;
      max-width: 520px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
      position: relative;
      transform: scale(0.9) translateY(20px);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-align: center;
      padding: 40px;
      box-sizing: border-box;
    }

    #qardhasana-widget-container * {
      box-sizing: border-box;
    }

    #qardhasana-modal-overlay.show #qardhasana-widget-container {
      transform: scale(1) translateY(0);
    }

    /* Close Button */
    .close-button {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 36px;
      height: 36px;
      border: none;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      padding: 0;
    }

    .close-button:hover {
      background: rgba(0, 0, 0, 0.1);
      transform: rotate(90deg);
    }

    .close-button svg {
      width: 20px;
      height: 20px;
      stroke: #6b7280;
    }

    /* Header */
    .widget-header {
      margin-bottom: 32px;
    }

    .widget-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px;
      color: #0f172a;
      line-height: 1.2;
    }

    .widget-subtitle {
      font-size: 16px;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    /* Authentication Section */
    .auth-section {
      margin-bottom: 24px;
    }

    .sign-in-prompt {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 16px;
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border: 1px solid #a7f3d0;
      border-radius: 12px;
      font-size: 14px;
      color: #065f46;
      justify-content: center;
    }

    .sign-in-prompt svg {
      flex-shrink: 0;
    }

    .sign-in-link {
      background: transparent;
      border: none;
      color: #15803d;
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
      padding: 0;
      font-size: 14px;
      font-family: inherit;
    }

    .sign-in-link:hover {
      color: #166534;
    }

    .auth-form {
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(21, 128, 61, 0.1);
      border-radius: 16px;
      padding: 20px;
      text-align: left;
    }

    .auth-form-header {
      margin-bottom: 16px;
    }

    .auth-form-header h3 {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 6px;
      color: #0f172a;
    }

    .auth-form-header p {
      font-size: 14px;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    .otp-input {
      font-size: 24px;
      letter-spacing: 8px;
      text-align: center;
      font-weight: 600;
      font-family: 'Monaco', 'Courier New', monospace;
    }

    .auth-error {
      background: #fee2e2;
      border: 1px solid #fca5a5;
      border-radius: 8px;
      padding: 10px 12px;
      color: #dc2626;
      font-size: 13px;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .auth-success {
      background: #dcfce7;
      border: 1px solid #86efac;
      border-radius: 8px;
      padding: 10px 12px;
      color: #16a34a;
      font-size: 13px;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .auth-form-buttons {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }

    .auth-submit-btn {
      flex: 1;
      background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .auth-submit-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(21, 128, 61, 0.3);
    }

    .auth-submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .auth-cancel-btn {
      background: transparent;
      color: #64748b;
      padding: 12px 20px;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .auth-cancel-btn:hover {
      border-color: #cbd5e1;
      color: #475569;
    }

    .resend-link {
      background: transparent;
      border: none;
      color: #15803d;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
      padding: 8px 0 0;
      margin-top: 8px;
      font-family: inherit;
      text-align: center;
      width: 100%;
    }

    .resend-link:hover {
      color: #166534;
    }

    .resend-link:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .logged-in-state {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px;
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border: 1px solid #a7f3d0;
      border-radius: 12px;
    }

    .logged-in-info {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: #065f46;
    }

    .logged-in-info svg {
      flex-shrink: 0;
    }

    .logged-in-info strong {
      font-weight: 600;
    }

    .sign-out-btn {
      background: transparent;
      border: 1px solid #86efac;
      color: #15803d;
      padding: 6px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .sign-out-btn:hover {
      background: rgba(21, 128, 61, 0.1);
      border-color: #15803d;
    }

    /* Verification Screen */
    .verification-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 24px;
      border-radius: 50%;
      background: #dbeafe;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .verification-title {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 12px;
      color: #0f172a;
    }

    .verification-message {
      font-size: 16px;
      color: #64748b;
      margin: 0 0 24px;
      line-height: 1.6;
    }

    .dashboard-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 24px;
      background: #3b82f6;
      color: white;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .dashboard-link:hover {
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
    }

    /* Asset Selector */
    .asset-selector-section {
      margin-bottom: 20px;
      text-align: left;
    }

    .asset-select {
      width: 100%;
      padding: 14px 16px;
      font-size: 16px;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      background: white;
      color: #0f172a;
      transition: all 0.2s;
      font-family: inherit;
      font-weight: 500;
      cursor: pointer;
    }

    .asset-select:focus {
      outline: none;
      border-color: #15803d;
      box-shadow: 0 0 0 3px rgba(21, 128, 61, 0.1);
    }

    /* Asset Description */
    .asset-description {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border: 1px solid #bbf7d0;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 20px;
      text-align: left;
      font-size: 14px;
      color: #166534;
      line-height: 1.6;
    }

    /* Progress Section */
    .progress-section {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(21, 128, 61, 0.1);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .progress-stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      gap: 16px;
    }

    .stat {
      flex: 1;
      text-align: left;
    }

    .stat-label {
      font-size: 12px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #15803d;
    }

    .stat-value.secondary {
      color: #0f172a;
    }

    /* Progress Bar */
    .progress-bar-container {
      width: 100%;
      height: 12px;
      background: rgba(21, 128, 61, 0.1);
      border-radius: 20px;
      overflow: hidden;
      position: relative;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #15803d 0%, #16a34a 100%);
      border-radius: 20px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .progress-bar-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    /* Action Tabs */
    .action-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      background: rgba(0, 0, 0, 0.03);
      padding: 6px;
      border-radius: 12px;
    }

    .tab-button {
      flex: 1;
      padding: 12px 20px;
      border: none;
      background: transparent;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      color: #64748b;
      font-family: inherit;
    }

    .tab-button.active {
      background: white;
      color: #15803d;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .tab-button:hover:not(.active) {
      background: rgba(255, 255, 255, 0.5);
    }

    .tab-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Form */
    .donation-form {
      text-align: left;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      font-weight: 600;
      margin-bottom: 8px;
      color: #0f172a;
      font-size: 14px;
    }

    .form-input {
      width: 100%;
      padding: 14px 16px;
      font-size: 16px;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      background: white;
      color: #0f172a;
      transition: all 0.2s;
      font-family: inherit;
    }

    .form-input:focus {
      outline: none;
      border-color: #15803d;
      box-shadow: 0 0 0 3px rgba(21, 128, 61, 0.1);
    }

    .form-input::placeholder {
      color: #94a3b8;
    }

    .amount-suggestions {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    .amount-chip {
      padding: 8px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
    }

    .amount-chip:hover {
      border-color: #15803d;
      color: #15803d;
      transform: translateY(-2px);
    }

    /* Info Box */
    .info-box {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border: 1px solid #a7f3d0;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 20px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .info-box svg {
      flex-shrink: 0;
      margin-top: 2px;
    }

    .info-box-text {
      font-size: 13px;
      color: #065f46;
      line-height: 1.5;
      margin: 0;
      text-align: left;
    }

    /* Checkbox */
    .checkbox-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 24px;
    }

    .checkbox-input {
      width: 20px;
      height: 20px;
      margin-top: 2px;
      cursor: pointer;
      flex-shrink: 0;
      accent-color: #15803d;
    }

    .checkbox-label {
      font-size: 13px;
      color: #475569;
      line-height: 1.5;
      cursor: pointer;
      text-align: left;
    }

    /* Submit Button */
    .submit-button {
      width: 100%;
      background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
      color: white;
      padding: 16px;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
      box-shadow: 0 4px 12px rgba(21, 128, 61, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(21, 128, 61, 0.4);
    }

    .submit-button:active:not(:disabled) {
      transform: translateY(0);
    }

    .submit-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    /* Back Button */
    .back-button {
      width: 100%;
      background: transparent;
      color: #64748b;
      padding: 12px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
    }

    .back-button:hover {
      border-color: #15803d;
      color: #15803d;
    }

    /* Payment Screen */
    .payment-screen {
      display: none;
    }

    .payment-screen.active {
      display: block;
    }

    #stripe-payment-element {
      margin-bottom: 20px;
    }

    .payment-error {
      color: #dc2626;
      font-size: 14px;
      margin-top: 12px;
      text-align: center;
    }

    /* Success/Error Screens */
    .result-screen {
      display: none;
      text-align: center;
    }

    .result-screen.active {
      display: block;
    }

    .result-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .result-icon.success {
      background: #dcfce7;
    }

    .result-icon.error {
      background: #fee2e2;
    }

    .result-icon svg {
      width: 48px;
      height: 48px;
    }

    .result-title {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 12px;
      color: #0f172a;
    }

    .result-message {
      font-size: 16px;
      color: #64748b;
      margin: 0 0 24px;
      line-height: 1.5;
    }

    /* Powered By */
    .powered-by {
      margin-top: 24px;
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
    }

    .powered-by a {
      color: #15803d;
      text-decoration: none;
      font-weight: 600;
    }

    .powered-by a:hover {
      text-decoration: underline;
    }

    /* Screen visibility */
    .screen {
      display: none;
    }

    .screen.active {
      display: block;
    }

    /* Mobile Responsiveness */
    @media (max-width: 640px) {
      #qardhasana-widget-container {
        padding: 24px;
      }

      .widget-title {
        font-size: 24px;
      }

      .stat-value {
        font-size: 20px;
      }

      .progress-stats {
        flex-direction: column;
        gap: 12px;
      }

      .logged-in-state {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }

      .sign-out-btn {
        width: 100%;
      }
    }
  `.replace(/#15803d/g, hostColor);

  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);

  // Load Stripe.js
  const stripeScript = document.createElement("script");
  stripeScript.src = "https://js.stripe.com/v3/";
  stripeScript.async = true;
  document.head.appendChild(stripeScript);

  // --- Widget rendering ---
  function renderWidget() {

    // Trigger button
    const triggerContainer = document.createElement("div");
    triggerContainer.id = "qardhasana-trigger-button";
    triggerContainer.innerHTML = `
      <button type='button'>
        <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/>
        </svg>
        Support
      </button>`;

    document.body.appendChild(triggerContainer);

    // Modal overlay
    const modalOverlay = document.createElement("div");
    modalOverlay.id = "qardhasana-modal-overlay";
    modalOverlay.style.display = "none";

    modalOverlay.innerHTML = `
      <div id='qardhasana-widget-container'>
        <button type='button' class='close-button' id='close-modal'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>
            <path d='M18 6L6 18M6 6l12 12'/>
          </svg>
        </button>

        <!-- Host Verification Required State -->
        <div class='screen active' id='verification-screen' style='display: none;'>
          <div class='verification-icon'>
            <svg width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#3b82f6' stroke-width='2'>
              <circle cx='12' cy='12' r='10'/>
              <path d='M12 16v-4M12 8h.01'/>
            </svg>
          </div>
          <h2 class='verification-title'>Setup Required</h2>
          <p class='verification-message'>
            This host needs to complete their payout account setup before accepting contributions. Please check back soon.
          </p>
          <a href='https://qardhasana.com/dashboard' target='_blank' class='dashboard-link'>
            <span>Host Dashboard</span>
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>
              <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3'/>
            </svg>
          </a>
        </div>

        <!-- Screen 1: Asset Selection & Contribution Form -->
        <div class='screen active' id='selection-screen'>
          <div class='widget-header'>
            <h1 class='widget-title' id='host-name'></h1>
            <p class='widget-subtitle'>Support this cause through QardHasana</p>
          </div>

          <!-- Authentication Section -->
          <div class='auth-section' id='auth-section'>
            <!-- Not logged in: Show sign-in prompt -->
            <div class='sign-in-prompt' id='sign-in-prompt'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='#15803d' stroke-width='2'>
                <circle cx='12' cy='12' r='10'/>
                <path d='M12 16v-4M12 8h.01'/>
              </svg>
              <span>Sign in to track your contributions</span>
              <button type='button' class='sign-in-link' id='show-sign-in-btn'>Sign in</button>
            </div>

            <!-- Email input form -->
            <form class='auth-form' id='email-form' style='display: none;'>
              <div class='auth-form-header'>
                <h3>Sign in to your account</h3>
                <p>We'll send a code to your email</p>
              </div>
              <div class='form-group'>
                <label class='form-label' for='email-input'>Email address</label>
                <input type='email' id='email-input' class='form-input' placeholder='you@example.com' required />
              </div>
              <div class='auth-error' id='email-error' style='display: none;'></div>
              <div class='auth-form-buttons'>
                <button type='submit' class='auth-submit-btn' id='email-submit-btn'>Send Code</button>
                <button type='button' class='auth-cancel-btn' id='cancel-email-btn'>Cancel</button>
              </div>
            </form>

            <!-- OTP input form -->
            <form class='auth-form' id='otp-form' style='display: none;'>
              <div class='auth-form-header'>
                <h3>Enter verification code</h3>
                <p>We sent a code to <strong id='otp-email-display'></strong></p>
              </div>
              <div class='form-group'>
                <label class='form-label' for='otp-input'>6-digit code</label>
                <input type='text' id='otp-input' class='form-input otp-input' placeholder='000000' maxlength='6' pattern='[0-9]{6}' required />
              </div>
              <div class='auth-error' id='otp-error' style='display: none;'></div>
              <div class='auth-form-buttons'>
                <button type='submit' class='auth-submit-btn' id='otp-submit-btn'>Verify</button>
                <button type='button' class='auth-cancel-btn' id='cancel-otp-btn'>Cancel</button>
              </div>
              <button type='button' class='resend-link' id='resend-code-btn'>Resend Code</button>
            </form>

            <!-- Logged in state -->
            <div class='logged-in-state' id='logged-in-state' style='display: none;'>
              <div class='logged-in-info'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='#15803d' stroke-width='2'>
                  <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/>
                  <circle cx='12' cy='7' r='4'/>
                </svg>
                <span>Signed in as <strong id='user-email-display'></strong></span>
              </div>
              <button type='button' class='sign-out-btn' id='sign-out-btn'>Sign out</button>
            </div>
          </div>

          <!-- Asset Selector -->
          <div class='asset-selector-section'>
            <label class='form-label' for='asset-selector'>Choose what to support</label>
            <select id='asset-selector' class='asset-select'>
              <option value='general'>General Support</option>
            </select>
          </div>

          <!-- Asset/General Description -->
          <div class='asset-description' id='asset-description'>
            Your contribution helps the host manage ongoing operational and daily expenses.
          </div>

          <!-- Progress Section (hidden for general support) -->
          <div class='progress-section' id='progress-section' style='display: none;'>
            <div class='progress-stats'>
              <div class='stat'>
                <div class='stat-label'>Raised</div>
                <div class='stat-value' id='current-amount'>$0</div>
              </div>
              <div class='stat'>
                <div class='stat-label'>Goal</div>
                <div class='stat-value secondary' id='goal-amount'>$0</div>
              </div>
            </div>
            <div class='progress-bar-container'>
              <div class='progress-bar-fill' id='progress-bar-fill' style='width: 0%'></div>
            </div>
          </div>

          <div class='action-tabs' id='action-tabs'>
            <button type='button' class='tab-button active' data-tab='donate'>
              <span>❤️ Support</span>
            </button>
            <button type='button' class='tab-button' data-tab='loan' id='loan-tab'>
              <span>🤝 Lend</span>
            </button>
          </div>

          <form class='donation-form' id='donation-form'>
            <div id='donate-content'>
              <div class='info-box'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='#15803d' stroke-width='2'>
                  <circle cx='12' cy='12' r='10'/>
                  <path d='M12 16v-4M12 8h.01'/>
                </svg>
                <p class='info-box-text'>
                  Support this initiative with a voluntary contribution. Please note that contributions are non-refundable.
                </p>
              </div>

              <div class='form-group'>
                <label class='form-label' for='amount'>Donation Amount</label>
                <input type='number' id='amount' class='form-input' placeholder='Enter amount (min $5)' min='5' step='5' required />
                <div class='amount-suggestions'>
                  <div class='amount-chip' data-amount='25'>$25</div>
                  <div class='amount-chip' data-amount='50'>$50</div>
                  <div class='amount-chip' data-amount='100'>$100</div>
                  <div class='amount-chip' data-amount='250'>$250</div>
                </div>
              </div>
            </div>

            <div id='loan-content' style='display: none;'>
              <div class='info-box'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='#15803d' stroke-width='2'>
                  <circle cx='12' cy='12' r='10'/>
                  <path d='M12 16v-4M12 8h.01'/>
                </svg>
                <p class='info-box-text' id='loan-info-text'>
                  Provide an interest-free loan (Qard Hasan) that will be repaid.
                </p>
              </div>

              <div class='form-group'>
                <label class='form-label' for='loan-amount'>Loan Amount</label>
                <input type='number' id='loan-amount' class='form-input' placeholder='Enter amount (min $5)' min='5' step='5' />
                <div class='amount-suggestions'>
                  <div class='amount-chip' data-amount='50'>$50</div>
                  <div class='amount-chip' data-amount='100'>$100</div>
                  <div class='amount-chip' data-amount='250'>$250</div>
                  <div class='amount-chip' data-amount='500'>$500</div>
                </div>
              </div>

              <div class='form-group'>
                <label class='form-label' for='repayment-months'>Repayment Period</label>
                <select id='repayment-months' class='form-input' required>
                  <option value=''>Select repayment period</option>
                  <option value='3'>3 months</option>
                  <option value='4'>4 months</option>
                  <option value='5'>5 months</option>
                  <option value='6'>6 months</option>
                </select>
              </div>
            </div>

            <div class='form-group'>
              <label class='form-label' for='name'>Name (Optional)</label>
              <input type='text' id='name' class='form-input' placeholder='Your name' />
            </div>

            <div class='checkbox-container'>
              <input type='checkbox' id='intent-checkbox' class='checkbox-input' required />
              <label for='intent-checkbox' class='checkbox-label'>
                I am contributing purely out of admiration and willingness to help, not for profit.
              </label>
            </div>

            <button type='submit' class='submit-button'>
              <span id='submit-text'>Proceed to Payment</span>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>
                <path d='M5 12h14M12 5l7 7-7 7'/>
              </svg>
            </button>
          </form>
        </div>

        <!-- Screen 2: Payment -->
        <div class='screen' id='payment-screen'>
          <div class='widget-header'>
            <h1 class='widget-title'>Complete Payment</h1>
            <p class='widget-subtitle' id='payment-amount-text'></p>
          </div>

          <div id='payment-element'></div>
          
          <div id='payment-error' class='payment-error' style='display: none;'></div>

          <button type='button' class='submit-button' id='submit-payment' disabled>
            <span>Processing...</span>
          </button>

          <button type='button' class='back-button' id='back-to-selection'>
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>
              <path d='M19 12H5M12 19l-7-7 7-7'/>
            </svg>
            <span>Back</span>
          </button>
        </div>

        <!-- Screen 3: Success -->
        <div class='screen' id='success-screen'>
          <div class='result-icon success'>
            <svg viewBox='0 0 24 24' fill='none' stroke='#16a34a' stroke-width='2'>
              <path d='M20 6L9 17l-5-5'/>
            </svg>
          </div>
          <h2 class='result-title'>Thank You!</h2>
          <p class='result-message' id='success-message'></p>
          <button type='button' class='submit-button' id='close-success'>
            <span>Close</span>
          </button>
        </div>

        <!-- Screen 4: Error -->
        <div class='screen' id='error-screen'>
          <div class='result-icon error'>
            <svg viewBox='0 0 24 24' fill='none' stroke='#dc2626' stroke-width='2'>
              <path d='M18 6L6 18M6 6l12 12'/>
            </svg>
          </div>
          <h2 class='result-title'>Payment Failed</h2>
          <p class='result-message' id='error-message'></p>
          <button type='button' class='submit-button' id='try-again'>
            <span>Try Again</span>
          </button>
          <button type='button' class='back-button' id='close-error'>
            <span>Close</span>
          </button>
        </div>

        <div class='powered-by'>
          Powered by <a href='https://qardhasana.com' target='_blank'>QardHasana</a>
        </div>
      </div>`;

    document.body.appendChild(modalOverlay);

    // Widget logic
    
    const widgetData = window.__QARDHASANA_WIDGET_DATA__;
    let currentTab = 'donate';
    let selectedAssetId = null; // null means "General Support"

    
    // Authentication state
    let currentUser = null;
    let authToken = null;
    const TOKEN_KEY = 'qardhasana_widget_token';
    let authState = 'not_logged_in'; // 'not_logged_in', 'entering_email', 'entering_otp', 'logged_in'
    let pendingEmail = null;

    // Check for existing session on load
    async function checkExistingSession() {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return;

      try {
        const response = await fetch('https://qardhasana.com/_api/widget/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const text = await response.text();
        let data;
        try {
          const parsed = JSON.parse(text);
          data = parsed.json || parsed;
        } catch (e) {
          throw new Error('Invalid response format');
        }

        if (response.ok && data.success) {
          authToken = token;
          currentUser = data.user;
          authState = 'logged_in';
          updateAuthUI();
        } else {
          // Invalid token, clear it
          localStorage.removeItem(TOKEN_KEY);
        }
      } catch (error) {
        console.error('Session validation error:', error);
        localStorage.removeItem(TOKEN_KEY);
      }
    }

    // Update authentication UI
    function updateAuthUI() {
      const authSection = document.getElementById('auth-section');
      const signInPrompt = document.getElementById('sign-in-prompt');
      const emailForm = document.getElementById('email-form');
      const otpForm = document.getElementById('otp-form');
      const loggedInState = document.getElementById('logged-in-state');
      
      // Hide all auth UI elements first
      signInPrompt.style.display = 'none';
      emailForm.style.display = 'none';
      otpForm.style.display = 'none';
      loggedInState.style.display = 'none';

      if (authState === 'not_logged_in') {
        signInPrompt.style.display = 'flex';
      } else if (authState === 'entering_email') {
        emailForm.style.display = 'block';
      } else if (authState === 'entering_otp') {
        otpForm.style.display = 'block';
        document.getElementById('otp-email-display').textContent = pendingEmail;
      } else if (authState === 'logged_in') {
        loggedInState.style.display = 'flex';
        document.getElementById('user-email-display').textContent = currentUser.email;
      }
    }

    // Show sign-in form
    function showSignInForm() {
      authState = 'entering_email';

      updateAuthUI();
    }

    // Handle email submission
    async function handleEmailSubmit(e) {
      e.preventDefault();
      const emailInput = document.getElementById('email-input');
      const email = emailInput.value.trim();
      const submitBtn = document.getElementById('email-submit-btn');
      const errorDiv = document.getElementById('email-error');

      if (!email) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      errorDiv.style.display = 'none';

      try {
        const response = await fetch('https://qardhasana.com/_api/widget/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const text = await response.text();
        let data;
        try {
          const parsed = JSON.parse(text);
          data = parsed.json || parsed;
        } catch (e) {
          throw new Error('Invalid response format');
        }

        if (response.ok && data.success) {
          pendingEmail = email;
          authState = 'entering_otp';
          updateAuthUI();
          
          // For testing: log the OTP if provided
          if (data.otpForTesting) {
            console.log('Test OTP:', data.otpForTesting);
          }
        } else {
          throw new Error(data.message || 'Failed to send code');
        }
      } catch (error) {
        console.error('Email submission error:', error);
        errorDiv.textContent = error.message || 'Failed to send code. Please try again.';
        errorDiv.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Code';
      }
    }

    // Handle OTP submission
    async function handleOtpSubmit(e) {
      e.preventDefault();
      const otpInput = document.getElementById('otp-input');
      const otp = otpInput.value.trim();
      const submitBtn = document.getElementById('otp-submit-btn');
      const errorDiv = document.getElementById('otp-error');

      if (!otp || otp.length !== 6) {
        errorDiv.textContent = 'Please enter a valid 6-digit code';
        errorDiv.style.display = 'block';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Verifying...';
      errorDiv.style.display = 'none';

      try {
        const response = await fetch('https://qardhasana.com/_api/widget/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: pendingEmail, otp }),
        });

        const text = await response.text();
        let data;
        try {
          const parsed = JSON.parse(text);
          data = parsed.json || parsed;
        } catch (e) {
          throw new Error('Invalid response format');
        }

        if (response.ok && data.success) {
          authToken = data.token;
          currentUser = data.user;
          localStorage.setItem(TOKEN_KEY, authToken);
          authState = 'logged_in';
          updateAuthUI();
          
          // Clear forms
          document.getElementById('email-form').reset();
          document.getElementById('otp-form').reset();
        } else {
          throw new Error(data.message || 'Invalid code');
        }
      } catch (error) {
        console.error('OTP verification error:', error);
        errorDiv.textContent = error.message || 'Invalid code. Please try again.';
        errorDiv.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Verify';
      }
    }

    // Handle resend code
    async function handleResendCode() {
      const resendBtn = document.getElementById('resend-code-btn');
      const errorDiv = document.getElementById('otp-error');
      
      resendBtn.disabled = true;
      const originalText = resendBtn.textContent;
      resendBtn.textContent = 'Sending...';
      errorDiv.style.display = 'none';

      try {
        const response = await fetch('https://qardhasana.com/_api/widget/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: pendingEmail }),
        });

        const text = await response.text();
        let data;
        try {
          const parsed = JSON.parse(text);
          data = parsed.json || parsed;
        } catch (e) {
          throw new Error('Invalid response format');
        }

        if (response.ok && data.success) {
          const successDiv = document.createElement('div');
          successDiv.className = 'auth-success';
          successDiv.textContent = 'Code sent! Check your email.';
          document.getElementById('otp-form').prepend(successDiv);
          setTimeout(() => successDiv.remove(), 3000);
          
          // For testing: log the OTP if provided
          if (data.otpForTesting) {
            console.log('Test OTP:', data.otpForTesting);
          }
        } else {
          throw new Error(data.message || 'Failed to resend code');
        }
      } catch (error) {
        console.error('Resend error:', error);
        errorDiv.textContent = error.message || 'Failed to resend code. Please try again.';
        errorDiv.style.display = 'block';
      } finally {
        resendBtn.disabled = false;
        resendBtn.textContent = originalText;
      }
    }

    // Handle sign out
    function handleSignOut() {
      localStorage.removeItem(TOKEN_KEY);
      authToken = null;
      currentUser = null;
      authState = 'not_logged_in';
      updateAuthUI();
    }

    // Cancel auth flow
    function cancelAuthFlow() {
      authState = 'not_logged_in';
      pendingEmail = null;
      document.getElementById('email-form').reset();
      document.getElementById('otp-form').reset();
      document.getElementById('email-error').style.display = 'none';
      document.getElementById('otp-error').style.display = 'none';
      updateAuthUI();
    }


    
    // Check if supporter needs Stripe Connect setup for loans
    function checkSupporterStripeStatus() {
      // If not logged in, can't provide loans
      if (!currentUser) {
        return { canProvideLoan: false, reason: 'not_logged_in' };
      }
      // Check if user has Stripe Connect set up
      const hasStripeAccount = currentUser.stripeAccountId && currentUser.stripeChargesEnabled;
      
      if (!hasStripeAccount) {
        return { canProvideLoan: false, reason: 'needs_stripe_setup' };
      }
      return { canProvideLoan: true };
    }
    // Show Stripe Connect setup prompt
    function showStripeSetupPrompt() {
      const loanContent = document.getElementById('loan-content');
      const stripeSetupPrompt = document.getElementById('stripe-setup-prompt');
      
      if (!stripeSetupPrompt) {
        // Create the prompt if it doesn't exist
        const promptDiv = document.createElement('div');
        promptDiv.id = 'stripe-setup-prompt';
        promptDiv.className = 'stripe-setup-prompt';
        promptDiv.innerHTML = `
  <div className="prompt-icon">💳</div>
  <h3>Set Up Payout Account</h3>
  <p>
    To provide a loan, you need to set up a payout account to receive repayments.
  </p>
  <p>Would you like to set this up?</p>
  <button id="setup-payout-btn" className="primary-button">
    Set Up Payout Account
  </button>
  <button id="cancel-stripe-setup-btn" className="secondary-button">
    Cancel
  </button>
`;

        
        loanContent.appendChild(promptDiv);
        
        // Add event listeners
        document.getElementById('setup-payout-btn').addEventListener('click', () => {
          // Open supporter dashboard in new tab - FIX: Use window.location.origin at runtime
          window.open(window.location.origin + '/dashboard/supporter', '_blank');
        });
        
        document.getElementById('cancel-stripe-setup-btn').addEventListener('click', () => {
          switchTab('donate');
        });
      }
      
      stripeSetupPrompt.style.display = 'block';
      
      // Hide the actual loan form
      const loanForm = loanContent.querySelector('.loan-form-fields');
      if (loanForm) {
        loanForm.style.display = 'none';
      }
    }
    // Show login prompt for loans
    function showLoanLoginPrompt() {
      const loanContent = document.getElementById('loan-content');
      const loginPrompt = document.getElementById('loan-login-prompt');
      
      if (!loginPrompt) {
        // Create the prompt if it doesn't exist
        const promptDiv = document.createElement('div');
        promptDiv.id = 'loan-login-prompt';
        promptDiv.className = 'loan-login-prompt';
        promptDiv.innerHTML = `
          <div class="prompt-icon">🔐</div>
          <h3>Sign In Required</h3>
          <p>Please sign in to provide a loan. This helps us manage repayments to you.</p>
          <button id="loan-sign-in-btn" class="primary-button">Sign In</button>
        `;
        
        loanContent.appendChild(promptDiv);
        
        // Add event listener
        document.getElementById('loan-sign-in-btn').addEventListener('click', () => {
          showSignInForm();
        });
      }
      
      loginPrompt.style.display = 'block';
      
      // Hide the actual loan form
      const loanForm = loanContent.querySelector('.loan-form-fields');
      if (loanForm) {
        loanForm.style.display = 'none';
      }
    }
    // Hide all loan prompts and show form
    function hideLoanPrompts() {
      const stripeSetupPrompt = document.getElementById('stripe-setup-prompt');
      const loginPrompt = document.getElementById('loan-login-prompt');
      const loanForm = document.querySelector('#loan-content .loan-form-fields');
      
      if (stripeSetupPrompt) {
        stripeSetupPrompt.style.display = 'none';
      }
      if (loginPrompt) {
        loginPrompt.style.display = 'none';
      }
      if (loanForm) {
        loanForm.style.display = 'block';
      }
    }
    // Update loan tab availability based on user status
    function updateLoanTabAvailability() {
      // Only check when loan tab is active
      if (currentTab !== 'loan') {
        return;
      }
      // Check if selected asset supports loans
      if (selectedAssetId === null) {
        // General support doesn't support loans
        return;
      }
      const stripeStatus = checkSupporterStripeStatus();
      
      if (stripeStatus.reason === 'not_logged_in') {
        showLoanLoginPrompt();
      } else if (stripeStatus.reason === 'needs_stripe_setup') {
        showStripeSetupPrompt();
      } else if (stripeStatus.canProvideLoan) {
        hideLoanPrompts();
      }
    }


    
    // State for contributions
    let contributionsLoaded = false;
    let contributionsExpanded = false;
    let contributions = [];
    let contributionsLoading = false;
    let contributionsError = null;

    // Initialize widget with data
    function initializeWidget() {
      // Check for existing session
      checkExistingSession();
      
      // Initialize contributions section if user is logged in
      initializeContributionsSection();
      
      // Set host name
      document.getElementById('host-name').textContent = widgetData.host.displayName;

      // Check if verification is required
      if (widgetData.requiresStripeSetup) {
        document.getElementById('verification-screen').style.display = 'block';
        document.getElementById('selection-screen').style.display = 'none';
        return;
      }

      // Populate asset selector
      const assetSelector = document.getElementById('asset-selector');
      widgetData.assets.forEach(asset => {
        const option = document.createElement('option');
        option.value = asset.id;
        option.textContent = asset.title;
        assetSelector.appendChild(option);
      });

      // Set initial state (General Support)
      updateAssetDisplay();
    }

    function initializeContributionsSection() {
      const contributionsSection = document.getElementById('contributions-section');
      if (!contributionsSection) return;

      // Hide by default
      contributionsSection.style.display = 'none';
    }

    function toggleContributions() {
      contributionsExpanded = !contributionsExpanded;
      const contributionsList = document.getElementById('contributions-list');
      const toggleIcon = document.getElementById('contributions-toggle-icon');
      
      if (contributionsExpanded) {
        contributionsList.style.display = 'block';
        toggleIcon.textContent = '▼';
        
        // Fetch contributions if not already loaded
        if (!contributionsLoaded && !contributionsLoading) {
          fetchContributions();
        }
      } else {
        contributionsList.style.display = 'none';
        toggleIcon.textContent = '▶';
      }
    }

    async function fetchContributions() {
      if (!currentUser || !jwtToken) return;

      contributionsLoading = true;
      contributionsError = null;
      renderContributionsList();

      try {
        const response = await fetch('/_api/widget/contributions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken,
          },
        });

        const text = await response.text();
        
        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }

        // Parse superjson response
        const data = JSON.parse(text);
        const parsed = data.json || data;

        if (parsed.success) {
          contributions = parsed.contributions || [];
          contributionsLoaded = true;
          contributionsError = null;
        } else {
          throw new Error(parsed.error || 'Failed to load contributions');
        }
      } catch (error) {
        console.error('Error fetching contributions:', error);
        contributionsError = error.message || 'Failed to load contributions';
        contributions = [];
      } finally {
        contributionsLoading = false;
        renderContributionsList();
      }
    }

    function renderContributionsList() {
      const listContainer = document.getElementById('contributions-list-container');
      if (!listContainer) return;

      if (contributionsLoading) {
        listContainer.innerHTML = '<div style="text-align: center; padding: 1rem; color: #64748b;">Loading contributions...</div>';
        return;
      }

      if (contributionsError) {
        listContainer.innerHTML = 
          '<div style="padding: 1rem;">' +
          '<p style="color: #ef4444; margin: 0 0 0.5rem 0;">Error loading contributions</p>' +
          '<button onclick="fetchContributions()" style="background: #3d7a77; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer; font-size: 0.875rem;">Retry</button>' +
          '</div>';
        return;
      }

      if (contributions.length === 0) {
        listContainer.innerHTML = '<div style="text-align: center; padding: 1rem; color: #64748b; font-size: 0.875rem;">You havent made any contributions yet</div>';
        return;
      }

      // Show max 5 contributions
      const displayContributions = contributions.slice(0, 5);
      const hasMore = contributions.length > 5;

      let html = '<div style="display: flex; flex-direction: column; gap: 0.75rem;">';
      
      displayContributions.forEach(contribution => {
        const date = new Date(contribution.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
        
        const typeBadgeColor = contribution.type === 'donation' ? '#3d7a77' : '#2563eb';
        const typeLabel = contribution.type === 'donation' ? 'Donation' : 'Loan';
        
        html += '<div style="padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; background: #f8fafc;">';
        html += '<div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">';
        html += '<span style="background: ' + typeBadgeColor + '; color: white; padding: 0.125rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 500;">' + typeLabel + '</span>';
        html += '<span style="font-weight: 600; color: #1e293b;">$' + contribution.amount.toFixed(2) + '</span>';
        html += '</div>';
        html += '<div style="font-size: 0.875rem; color: #334155; margin-bottom: 0.25rem;">' + (contribution.assetTitle || 'General Support') + '</div>';
        html += '<div style="font-size: 0.75rem; color: #64748b;">Host: ' + contribution.hostName + '</div>';
        html += '<div style="font-size: 0.75rem; color: #64748b;">' + formattedDate + '</div>';
        
        if (contribution.type === 'loan' && contribution.status) {
          const statusColor = contribution.status === 'completed' ? '#16a34a' : 
                            contribution.status === 'defaulted' ? '#dc2626' : '#3d7a77';
          html += '<div style="margin-top: 0.5rem;"><span style="color: ' + statusColor + '; font-size: 0.75rem; font-weight: 500;">Status: ' + contribution.status + '</span></div>';
        }
        
        html += '</div>';
      });

      html += '</div>';

      if (hasMore) {
        html += '<div style="text-align: center; margin-top: 0.75rem;"><a href="/dashboard" target="_blank" style="color: #3d7a77; text-decoration: none; font-size: 0.875rem; font-weight: 500;">View All Contributions →</a></div>';
      }

      listContainer.innerHTML = html;
    }

    function updateAuthUI() {
      const authSection = document.getElementById('auth-section');
      const contributionsSection = document.getElementById('contributions-section');
      
      if (currentUser) {
        authSection.innerHTML = 
          '<div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: #f0fdfa; border-radius: 0.5rem; margin-bottom: 1rem;">' +
          '<span style="color: #0f766e; font-weight: 500;">👤 ' + currentUser.email + '</span>' +
          '<button onclick="handleLogout()" style="background: transparent; border: 1px solid #0f766e; color: #0f766e; padding: 0.375rem 0.75rem; border-radius: 0.375rem; cursor: pointer; font-size: 0.875rem;">Logout</button>' +
          '</div>';
        
        // Show contributions section
        if (contributionsSection) {
          contributionsSection.style.display = 'block';
        }
      } else {
        authSection.innerHTML = 
          '<button id="signin-to-conribute-btn" style="width: 100%; background: #169d48; color: white; border: none; padding: 0.75rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500; margin-bottom: 1rem;">Login to Track Contributions</button>';

        // Attach sign-in event listener
        const signInBtn = document.getElementById('signin-to-contribute-btn');
        if (signInBtn) {
          signInBtn.addEventListener('click', showSignInForm);
        }
        
        // Hide contributions section
        if (contributionsSection) {
          contributionsSection.style.display = 'none';
        }
      }
    }

    function updateAssetDisplay() {
      const progressSection = document.getElementById('progress-section');
      const assetDescription = document.getElementById('asset-description');
      const loanTab = document.getElementById('loan-tab');
      const loanInfoText = document.getElementById('loan-info-text');

      if (selectedAssetId === null) {
        // General Support selected
        progressSection.style.display = 'none';
        assetDescription.textContent = 'Your contribution helps the host manage ongoing operational and daily expenses.';
        
        // Hide loan option for general support
        loanTab.style.display = 'none';
        
      } else {
        // Specific asset selected
        const asset = widgetData.assets.find(a => a.id === selectedAssetId);
        if (!asset) return;

        // Show progress section
        progressSection.style.display = 'block';
        
        // Update progress values
        document.getElementById('current-amount').textContent = '$' + asset.currentAmountRaised.toLocaleString();
        document.getElementById('goal-amount').textContent = '$' + asset.fundGoal.toLocaleString();
        
        const progressPercentage = Math.min((asset.currentAmountRaised / asset.fundGoal) * 100, 100);
        document.getElementById('progress-bar-fill').style.width = progressPercentage + '%';

        // Update description
        assetDescription.textContent = asset.shortDescription || 'Support this specific asset.';

        // Show loan option
        loanTab.style.display = 'flex';
        
        // Update loan info text with repayment capable amount
        loanInfoText.textContent = 'Provide an interest-free loan (Qard Hasan) that will be repaid. Maximum loan amount: $' + asset.repaymentCapableAmount.toLocaleString();
        
        // Update loan amount max
        const loanAmountInput = document.getElementById('loan-amount');
        const remainingAmount = Math.max(asset.fundGoal - asset.currentAmountRaised, 0);
        const maxLoanAmount = Math.min(asset.repaymentCapableAmount, remainingAmount);
        loanAmountInput.setAttribute('max', maxLoanAmount);
        loanAmountInput.setAttribute('placeholder', 'Enter amount ($5 - $' + maxLoanAmount.toLocaleString() + ')');
      }

      // Switch to donate tab as default when opening support widget
      switchTab('donate');
      
      // Update loan availability after asset display is updated
      updateLoanTabAvailability();
    }

    function showScreen(screenId) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById(screenId).classList.add('active');
    }

    function openModal() {
      modalOverlay.style.display = "flex";
      setTimeout(() => modalOverlay.classList.add("show"), 10);
      document.body.style.overflow = 'hidden';
      
      initializeWidget();
    }

    function closeModal() {
      modalOverlay.classList.remove("show");
      setTimeout(() => {
        modalOverlay.style.display = "none";
        document.body.style.overflow = '';
        showScreen('selection-screen');
        document.getElementById('donation-form').reset();
        selectedAssetId = null;
        document.getElementById('asset-selector').value = 'general';
        updateAssetDisplay();
      }, 300);
    }

    function switchTab(tab) {
      currentTab = tab;
      const donateContent = document.getElementById('donate-content');
      const loanContent = document.getElementById('loan-content');
      const submitText = document.getElementById('submit-text');
      const tabs = document.querySelectorAll('.tab-button');

      tabs.forEach(t => {
        if (t.dataset.tab === tab) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });

      const donateInputs = document.querySelectorAll('#donate-content input');
      const loanInputs = document.querySelectorAll('#loan-content input, #loan-content select');

      if (tab === 'donate') {
        donateContent.style.display = 'block';
        loanContent.style.display = 'none';
        submitText.textContent = 'Proceed to Payment';

        donateInputs.forEach(i => i.required = true);
        loanInputs.forEach(i => i.required = false);
      } else {
        donateContent.style.display = 'none';
        loanContent.style.display = 'block';
        submitText.textContent = 'Proceed to Payment';

        donateInputs.forEach(i => i.required = false);
        loanInputs.forEach(i => i.required = true);
        
        // Check loan availability when switching to loan tab
        updateLoanTabAvailability();
      }
    }


    
    let stripe = null;
    let elements = null;
    let paymentIntentId = null;
    let contributionData = null;

    async function initializeStripe() {
      let attempts = 0;
      while (!window.Stripe && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (!window.Stripe) {
        throw new Error('Failed to load Stripe.js');
      }

      stripe = window.Stripe('pk_test_51S8I31GVL6MmKL0eJCnPCZfTeur3Ac2cQeSzniGUYD9O1ZxR6L0ia87KsB497Mf2LXD34OfTqHlerkexU2cLPfHn00rZHuGOB6');
    }

    async function handleSubmit(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const intent = document.getElementById('intent-checkbox').checked;
      
      if (!intent) {
        alert('Please confirm your contribution intent');
        return;
      }

      let amount, type, repaymentMonths;
      if (currentTab === 'donate') {
        amount = document.getElementById('amount').value;
        type = 'donation';
      } else {
        // Check if user can provide loan
        const stripeStatus = checkSupporterStripeStatus();
        if (!stripeStatus.canProvideLoan) {
          // This shouldn't happen if UI is working correctly, but just in case
          alert('Please complete the required setup to provide a loan');
          return;
        }
        
        amount = document.getElementById('loan-amount').value;
        const repaymentSelect = document.getElementById('repayment-months');
        if (repaymentSelect) {
          repaymentMonths = parseInt(repaymentSelect.value);
        }
        type = 'loan';
        
        if (repaymentSelect && !repaymentMonths) {
          alert('Please select a repayment period');
          return;
        }
      }

      if (!amount || amount < 5) {
        alert('Please enter a valid amount (minimum $5)');
        return;
      }

      contributionData = {
        assetId: selectedAssetId, // null for general support, or specific asset ID
        amount: parseFloat(amount),
        name: name || 'Anonymous',
        type: type,
        repaymentMonths: repaymentMonths || undefined,
      };

      showScreen('payment-screen');
      
      const amountText = type === 'donation' ? 'Donation' : 'Loan';
      document.getElementById('payment-amount-text').textContent = 
        amountText + ': $' + parseFloat(amount).toFixed(2);

      try {
        if (!stripe) {
          await initializeStripe();
        }

        const apiUrl = 'https://qardhasana.com/_api/payments/widget-intent';
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {},
          body: JSON.stringify({
            hostIdentifier: widgetData.hostIdentifier,
            assetId: contributionData.assetId,
            amount: contributionData.amount,
            type: contributionData.type,
            donorName: contributionData.name,
            repaymentMonths: contributionData.repaymentMonths,
          }),
        });

        const text = await response.text();
        console.log('Response text:', text);
        
        if (!response.ok) {
          let errorMessage = 'Failed to create payment intent';
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            errorMessage = text || errorMessage;
          }
          throw new Error(errorMessage);
        }

        let data;
        try {
          const parsed = JSON.parse(text);
          data = parsed.json || parsed;
        } catch (e) {
          console.log("error:", e);
          throw new Error('Invalid response format from server');
        }

        if (!data || !data.clientSecret) {
          throw new Error('Invalid response format from server');
        }

        const clientSecret = data.clientSecret;
        elements = stripe.elements({
          clientSecret: clientSecret,
        });

        const paymentElement = elements.create('payment', {
          layout: 'tabs',
        });
        paymentElement.mount('#payment-element');

        paymentElement.on('ready', () => {
          const submitBtn = document.getElementById('submit-payment');
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Complete Payment</span>';
        });

        paymentElement.on('change', (event) => {
          const errorDiv = document.getElementById('payment-error');
          if (event.error) {
            errorDiv.textContent = event.error.message;
            errorDiv.style.display = 'block';
          } else {
            errorDiv.style.display = 'none';
          }
        });
      } catch (error) {
        console.error('Payment initialization error:', error);
        document.getElementById('error-message').textContent = 
          error.message || 'Failed to initialize payment. Please try again.';
        showScreen('error-screen');
      }
    }

    async function handlePayment() {
      const submitBtn = document.getElementById('submit-payment');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing...</span>';

      const errorDiv = document.getElementById('payment-error');
      errorDiv.style.display = 'none';

      try {
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: 'https://qardhasana.com',
          },
          redirect: 'if_required',
        });

        if (result.error) {
          throw result.error;
        }

        paymentIntentId = result.paymentIntent.id;

        // Record the contribution in the backend
        const endpoint = contributionData.type === 'donation' 
          ? '/_api/asset/donate' 
          : '/_api/asset/loan';
        
        const payload = contributionData.type === 'donation'
          ? {
              hostIdentifier: widgetData.hostIdentifier,
              paymentIntentId: paymentIntentId,
              assetId: contributionData.assetId,
              amount: contributionData.amount,
              donorName: contributionData.name,
              disclaimerAccepted: true,
            }
          : {
              hostIdentifier: widgetData.hostIdentifier,
              paymentIntentId: paymentIntentId,
              assetId: contributionData.assetId,
              principalAmount: contributionData.amount,
              repaymentMonths: contributionData.repaymentMonths,
              lenderName: contributionData.name,
              lenderDisclaimerAccepted: true,
            };

        // Include auth token if available
        const headers = {};
        if (authToken) {
          headers['Authorization'] = 'Bearer ' + authToken;
        }

        const recordResponse = await fetch('https://qardhasana.com' + endpoint, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload),
        });

        const recordText = await recordResponse.text();
        console.log('Record response text:', recordText);
        
        if (!recordResponse.ok) {
          let errorMessage = 'Failed to record contribution';
          try {
            const errorData = JSON.parse(recordText);
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            errorMessage = recordText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        const successMessage = 'Your ' + contributionData.type + ' of $' + 
          contributionData.amount.toFixed(2) + ' has been processed successfully. Thank you for your support!';
        document.getElementById('success-message').textContent = successMessage;
        showScreen('success-screen');
      } catch (error) {
        console.error('Payment error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Complete Payment</span>';
        errorDiv.textContent = error.message || 'Payment failed. Please try again.';
        errorDiv.style.display = 'block';
      }
    }


    // Event listeners
    triggerContainer.querySelector("button").addEventListener("click", openModal);
    document.getElementById('close-modal').addEventListener("click", closeModal);
    
    modalOverlay.addEventListener("click", function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Asset selector change
    document.getElementById('asset-selector').addEventListener('change', function(e) {
      const value = e.target.value;
      if (value === 'general') {
        selectedAssetId = null;
      } else {
        selectedAssetId = parseInt(value);
      }
      updateAssetDisplay();
    });

    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    document.querySelectorAll('.amount-chip').forEach(chip => {
      chip.addEventListener('click', function() {
        const amount = this.dataset.amount;
        if (currentTab === 'donate') {
          document.getElementById('amount').value = amount;
        } else {
          document.getElementById('loan-amount').value = amount;
        }
      });
    });

    document.getElementById('donation-form').addEventListener('submit', handleSubmit);
    document.getElementById('back-to-selection').addEventListener('click', () => showScreen('selection-screen'));
    document.getElementById('submit-payment').addEventListener('click', handlePayment);
    document.getElementById('close-success').addEventListener('click', closeModal);
    document.getElementById('try-again').addEventListener('click', () => showScreen('selection-screen'));
    document.getElementById('close-error').addEventListener('click', closeModal);
    
    // Auth event listeners
    document.getElementById('show-sign-in-btn').addEventListener('click', showSignInForm);
    document.getElementById('email-form').addEventListener('submit', handleEmailSubmit);
    document.getElementById('otp-form').addEventListener('submit', handleOtpSubmit);
    document.getElementById('resend-code-btn').addEventListener('click', handleResendCode);
    document.getElementById('sign-out-btn').addEventListener('click', handleSignOut);
    document.getElementById('cancel-email-btn').addEventListener('click', cancelAuthFlow);
    document.getElementById('cancel-otp-btn').addEventListener('click', cancelAuthFlow);
    document.getElementById('signin-to-contribute-btn'); 

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderWidget);
  } else {
    renderWidget();
  }
})();