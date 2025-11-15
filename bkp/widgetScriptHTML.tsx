// HTML template generator for the widget
export const generateWidgetHTML = () => {
  return `
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

          <div class='action-tabs' id='action-tabs'>
            <button type='button' class='tab-button active' data-tab='donate'>
              <span>❤️ Support</span>
            </button>
            <button type='button' class='tab-button' data-tab='loan' id='loan-tab'>
              <span>🤝 Lend</span>
            </button>
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

          <form class='donation-form' id='donation-form'>
            <div id='donate-content'>
              <div class='info-box'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='#15803d' stroke-width='2'>
                  <circle cx='12' cy='12' r='10'/>
                  <path d='M12 16v-4M12 8h.01'/>
                </svg>
                <p class='info-box-text'>
                  Support this initiative with a voluntary contribution. Please note that support contributions are non-refundable.
                </p>
              </div>

              <div class='form-group'>
                <label class='form-label' for='amount'>Contribution Amount</label>
                <input type='number' id='amount' class='form-input' placeholder='Enter amount (min $5)' min='5' step='5' required />
                <div class='amount-suggestions'>
                  <div class='amount-chip' data-amount='5'>$5</div>
                  <div class='amount-chip' data-amount='25'>$25</div>
                  <div class='amount-chip' data-amount='50'>$50</div>
                  <div class='amount-chip' data-amount='100'>$100</div>
                  <div class='amount-chip' data-amount='250'>$250</div>
                  <div class='amount-chip' data-amount='500'>$500</div>
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
                  <div class='amount-chip' data-amount='1000'>$1000</div>
                  <div class='amount-chip' data-amount='2000'>$2000</div>
                  <div class='amount-chip' data-amount='3000'>$3000</div>
                  <div class='amount-chip' data-amount='5000'>$5000</div>
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
};
