// CSS string generator for the widget
export const generateWidgetCSS = () => `
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
  `;