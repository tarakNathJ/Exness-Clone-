# 🧪 Test Cases - Exness Clone Trading Platform

## Table of Contents
1. [Authentication Tests](#1-authentication-tests)
2. [Trading Operations Tests](#2-trading-operations-tests)
3. [Portfolio Management Tests](#3-portfolio-management-tests)
4. [WebSocket Connection Tests](#4-websocket-connection-tests)
5. [UI Component Tests](#5-ui-component-tests)
6. [API Integration Tests](#6-api-integration-tests)
7. [Performance Tests](#7-performance-tests)
8. [Security Tests](#8-security-tests)
9. [Responsive Design Tests](#9-responsive-design-tests)
10. [End-to-End Tests](#10-end-to-end-tests)

---

## 1. Authentication Tests

### Test Case 1.1: User Registration - Valid Data
**Priority**: High | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | AUTH-001 |
| **Description** | Verify user can register with valid credentials |
| **Preconditions** | - User is on registration page<br>- No existing account with test email |
| **Test Data** | Email: `tarakjana55@gmail.com`<br>Password: `1234`<br>Name: `tarak jana` |

**Steps:**
1. Navigate to `/register` page
2. Enter email in email field
3. Enter password in password field
4. Enter name in name field
5. Click "Register" button

**Expected Result:**
- ✅ API call to `/api/register` is made
- ✅ Success toast notification appears
- ✅ User is redirected to dashboard/login
- ✅ User data is stored correctly

**Actual Result:** [To be filled during testing]

---

### Test Case 1.2: User Registration - Invalid Email
**Priority**: High | **Type**: Negative

| Field | Value |
|-------|-------|
| **Test ID** | AUTH-002 |
| **Description** | Verify registration fails with invalid email format |
| **Test Data** | Email: `tarakjana55@gmail.com`<br>Password: `1234` |

**Steps:**
1. Navigate to registration page
2. Enter invalid email format
3. Enter valid password
4. Click "Register" button

**Expected Result:**
- ❌ Registration should fail
- ❌ Error message: "Invalid email format"
- ❌ User should remain on registration page

---

### Test Case 1.3: User Login - Valid Credentials
**Priority**: High | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | AUTH-003 |
| **Description** | Verify user can login with correct credentials |
| **Preconditions** | User account exists with given credentials |

**Steps:**
1. Navigate to `/login` page
2. Enter valid email
3. Enter correct password
4. Click "Login" button

**Expected Result:**
- ✅ JWT token is received and stored
- ✅ User is redirected to dashboard
- ✅ User session is active
- ✅ Navigation shows logged-in state

---

### Test Case 1.4: User Login - Invalid Password
**Priority**: High | **Type**: Negative

| Field | Value |
|-------|-------|
| **Test ID** | AUTH-004 |
| **Description** | Verify login fails with wrong password |
| **Test Data** | Email: `user@example.com`<br>Password: `WrongPass123` |

**Expected Result:**
- ❌ Login should fail
- ❌ Error message: "Invalid credentials"
- ❌ User remains on login page
- ❌ No JWT token stored

---

### Test Case 1.5: JWT Token Expiration
**Priority**: Medium | **Type**: Security

| Field | Value |
|-------|-------|
| **Test ID** | AUTH-005 |
| **Description** | Verify system handles expired JWT tokens |

**Steps:**
1. Login with valid credentials
2. Wait for token to expire (or manipulate token)
3. Try to access protected route

**Expected Result:**
- ✅ User is redirected to login page
- ✅ Error message about session expiration
- ✅ Token is cleared from storage

---

## 2. Trading Operations Tests

### Test Case 2.1: Place Buy Order - Valid
**Priority**: Critical | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | TRADE-001 |
| **Description** | Verify user can place a valid buy order |
| **Preconditions** | - User is logged in<br>- Sufficient balance available |
| **Test Data** | Symbol: `EUR/USD`<br>Amount: `1000`<br>Type: `Buy` |

**Steps:**
1. Navigate to trading page
2. Select asset (EUR/USD)
3. Enter trade amount
4. Select "Buy" option
5. Confirm order

**Expected Result:**
- ✅ Order is created successfully
- ✅ API POST to `/api/orders` returns 200
- ✅ Order appears in open positions
- ✅ Portfolio balance is updated
- ✅ Success notification is shown

---

### Test Case 2.2: Place Sell Order - Valid
**Priority**: Critical | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | TRADE-002 |
| **Description** | Verify user can place a valid sell order |
| **Test Data** | Symbol: `BTC/USD`<br>Amount: `0.5`<br>Type: `Sell` |

**Steps:**
1. Navigate to trading page
2. Select cryptocurrency asset
3. Enter trade amount
4. Select "Sell" option
5. Confirm order

**Expected Result:**
- ✅ Sell order is executed
- ✅ Position is opened/closed correctly
- ✅ P&L is calculated
- ✅ Transaction history is updated

---

### Test Case 2.3: Order with Insufficient Balance
**Priority**: High | **Type**: Negative

| Field | Value |
|-------|-------|
| **Test ID** | TRADE-003 |
| **Description** | Verify order fails when balance is insufficient |
| **Test Data** | Amount: `1000000` (exceeds balance) |

**Expected Result:**
- ❌ Order should be rejected
- ❌ Error: "Insufficient balance"
- ❌ No order created in database
- ❌ Balance remains unchanged

---

### Test Case 2.4: Close Open Position
**Priority**: High | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | TRADE-004 |
| **Description** | Verify user can close an open position |
| **Preconditions** | User has at least one open position |

**Steps:**
1. Navigate to open positions
2. Select a position to close
3. Click "Close Position" button
4. Confirm closure

**Expected Result:**
- ✅ Position is closed
- ✅ Final P&L is calculated
- ✅ Balance is updated with profit/loss
- ✅ Position moves to history
- ✅ Notification confirms closure

---

### Test Case 2.5: Set Stop Loss / Take Profit
**Priority**: Medium | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | TRADE-005 |
| **Description** | Verify user can set stop loss and take profit levels |

**Steps:**
1. Open a new position
2. Set stop loss price
3. Set take profit price
4. Confirm order

**Expected Result:**
- ✅ Stop loss is set correctly
- ✅ Take profit is set correctly
- ✅ Order triggers when price reaches levels
- ✅ Position closes automatically

---

## 3. Portfolio Management Tests

### Test Case 3.1: View Portfolio Balance
**Priority**: High | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | PORT-001 |
| **Description** | Verify user can view accurate portfolio balance |

**Steps:**
1. Login to account
2. Navigate to portfolio page
3. View balance details

**Expected Result:**
- ✅ Total balance is displayed
- ✅ Available margin shown
- ✅ Used margin calculated
- ✅ Equity displayed correctly
- ✅ All values match database

---

### Test Case 3.2: View Open Positions
**Priority**: High | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | PORT-002 |
| **Description** | Verify all open positions are displayed correctly |

**Steps:**
1. Navigate to portfolio page
2. View "Open Positions" section

**Expected Result:**
- ✅ All positions listed
- ✅ Each shows: Symbol, Amount, Entry Price, Current Price
- ✅ Real-time P&L updates
- ✅ Correct action buttons (Close, Modify)

---

### Test Case 3.3: View Transaction History
**Priority**: Medium | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | PORT-003 |
| **Description** | Verify transaction history is complete and accurate |

**Steps:**
1. Navigate to portfolio page
2. Open transaction history
3. Review past transactions

**Expected Result:**
- ✅ All transactions listed chronologically
- ✅ Each shows: Date, Type, Asset, Amount, P&L
- ✅ Filter options work correctly
- ✅ Export functionality works

---

### Test Case 3.4: Portfolio Performance Chart
**Priority**: Medium | **Type**: UI/Functional

| Field | Value |
|-------|-------|
| **Test ID** | PORT-004 |
| **Description** | Verify portfolio performance chart displays correctly |

**Steps:**
1. Navigate to portfolio page
2. View performance chart
3. Interact with time range filters

**Expected Result:**
- ✅ Chart renders correctly using Recharts
- ✅ Data points are accurate
- ✅ Time filters (1D, 1W, 1M, 1Y) work
- ✅ Tooltips show correct values
- ✅ Chart updates with new data

---

## 4. WebSocket Connection Tests

### Test Case 4.1: WebSocket Connection Establishment
**Priority**: Critical | **Type**: Integration

| Field | Value |
|-------|-------|
| **Test ID** | WS-001 |
| **Description** | Verify WebSocket connection is established successfully |

**Steps:**
1. Navigate to trading page
2. Open browser DevTools Network tab
3. Filter for WebSocket connections
4. Observe connection status

**Expected Result:**
- ✅ WebSocket connects to `VITE_API_URL_WS`
- ✅ Connection status: "Open"
- ✅ Heartbeat messages sent/received
- ✅ No connection errors in console

---

### Test Case 4.2: Real-time Price Updates
**Priority**: Critical | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | WS-002 |
| **Description** | Verify real-time price updates are received via WebSocket |

**Steps:**
1. Open trading page
2. Observe price ticker for selected asset
3. Watch for price changes

**Expected Result:**
- ✅ Prices update in real-time (< 1 second latency)
- ✅ Updates continue without interruption
- ✅ No duplicate messages received
- ✅ Price format is correct

---

### Test Case 4.3: WebSocket Reconnection
**Priority**: High | **Type**: Resilience

| Field | Value |
|-------|-------|
| **Test ID** | WS-003 |
| **Description** | Verify WebSocket reconnects after disconnection |

**Steps:**
1. Establish WebSocket connection
2. Simulate network interruption
3. Restore network connection

**Expected Result:**
- ✅ Connection attempts to reconnect automatically
- ✅ Reconnection succeeds within 5 seconds
- ✅ Data stream resumes
- ✅ User is notified of reconnection

---

### Test Case 4.4: Multiple Symbol Subscription
**Priority**: Medium | **Type**: Functional

| Field | Value |
|-------|-------|
| **Test ID** | WS-004 |
| **Description** | Verify WebSocket handles multiple symbol subscriptions |

**Steps:**
1. Subscribe to EUR/USD
2. Subscribe to BTC/USD
3. Subscribe to GBP/USD
4. Observe updates for all symbols

**Expected Result:**
- ✅ All symbols receive updates
- ✅ No data conflicts between symbols
- ✅ Performance remains stable
- ✅ Unsubscribe works correctly

---

## 5. UI Component Tests

### Test Case 5.1: Button Component Rendering
**Priority**: Low | **Type**: UI

| Field | Value |
|-------|-------|
| **Test ID** | UI-001 |
| **Description** | Verify all button variants render correctly |

**Steps:**
1. Navigate to page with buttons
2. Inspect different button types
3. Test interactions (hover, click, disabled)

**Expected Result:**
- ✅ Default button renders
- ✅ Primary, Secondary, Destructive variants work
- ✅ Disabled state shows correctly
- ✅ Loading state displays spinner
- ✅ Click handlers execute

**Test Code Example:**
```typescript
describe('Button Component', () => {
  it('should render with default variant', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    expect(getByRole('button')).toBeDisabled();
  });
});
```

---

### Test Case 5.2: Dialog/Modal Component
**Priority**: Medium | **Type**: UI

| Field | Value |
|-------|-------|
| **Test ID** | UI-002 |
| **Description** | Verify dialog component opens, closes, and handles content |

**Expected Result:**
- ✅ Dialog opens on trigger click
- ✅ Overlay darkens background
- ✅ Close button works
- ✅ Click outside closes dialog
- ✅ Escape key closes dialog
- ✅ Focus trapped inside dialog

---

### Test Case 5.3: Toast Notifications
**Priority**: Medium | **Type**: UI

| Field | Value |
|-------|-------|
| **Test ID** | UI-003 |
| **Description** | Verify toast notifications appear and dismiss correctly |

**Steps:**
1. Trigger success toast
2. Trigger error toast
3. Trigger info toast

**Expected Result:**
- ✅ Toast appears with correct message
- ✅ Auto-dismisses after timeout
- ✅ Manual dismiss works
- ✅ Multiple toasts stack correctly
- ✅ Icons display correctly

**Test Code Example:**
```typescript
describe('Toast Notifications', () => {
  it('should show success toast', () => {
    const { toast } = useToast();
    toast({ title: 'Success', description: 'Operation completed' });
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

---

### Test Case 5.4: Chart Component Rendering
**Priority**: High | **Type**: UI

| Field | Value |
|-------|-------|
| **Test ID** | UI-004 |
| **Description** | Verify trading charts render with correct data |

**Steps:**
1. Navigate to trading page
2. View price chart
3. Interact with chart controls

**Expected Result:**
- ✅ Chart loads with lightweight-charts
- ✅ Candlestick data displays correctly
- ✅ Zoom controls work
- ✅ Crosshair shows price/time
- ✅ Chart updates with new data

---

### Test Case 5.5: Sidebar Navigation
**Priority**: Medium | **Type**: UI

| Field | Value |
|-------|-------|
| **Test ID** | UI-005 |
| **Description** | Verify sidebar navigation works correctly |

**Steps:**
1. View sidebar on desktop
2. Toggle sidebar collapse
3. Test on mobile device

**Expected Result:**
- ✅ All navigation links visible
- ✅ Active link highlighted
- ✅ Collapse/expand works
- ✅ Mobile menu toggles correctly
- ✅ Routes navigate properly

---

## 6. API Integration Tests

### Test Case 6.1: API Authentication Header
**Priority**: High | **Type**: Integration

| Field | Value |
|-------|-------|
| **Test ID** | API-001 |
| **Description** | Verify JWT token is included in API requests |

**Steps:**
1. Login to get JWT token
2. Make API request to protected endpoint
3. Inspect request headers

**Expected Result:**
- ✅ Authorization header present
- ✅ Format: `Bearer {token}`
- ✅ Token is valid JWT
- ✅ Request succeeds

**Test Code Example:**
```typescript
describe('API Authentication', () => {
  it('should include JWT in authorization header', async () => {
    const token = 'mock_jwt_token';
    localStorage.setItem('token', token);
    
    const response = await axios.get('/api/protected', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    expect(response.status).toBe(200);
  });
});
```

---

### Test Case 6.2: API Error Handling - 401 Unauthorized
**Priority**: High | **Type**: Integration

| Field | Value |
|-------|-------|
| **Test ID** | API-002 |
| **Description** | Verify proper handling of 401 errors |

**Expected Result:**
- ✅ User redirected to login
- ✅ Error toast displayed
- ✅ Token cleared from storage
- ✅ No infinite redirect loops

---

### Test Case 6.3: API Error Handling - 500 Server Error
**Priority**: Medium | **Type**: Integration

| Field | Value |
|-------|-------|
| **Test ID** | API-003 |
| **Description** | Verify handling of server errors |

**Expected Result:**
- ❌ Error toast: "Server error, please try again"
- ✅ Request can be retried
- ✅ No app crash
- ✅ Error logged to console

---

### Test Case 6.4: API Request Timeout
**Priority**: Medium | **Type**: Integration

| Field | Value |
|-------|-------|
| **Test ID** | API-004 |
| **Description** | Verify timeout handling for slow requests |

**Steps:**
1. Make API request
2. Simulate slow response (> 30 seconds)

**Expected Result:**
- ✅ Request times out after configured duration
- ✅ Error message displayed
- ✅ Loading state cleared
- ✅ User can retry

---

## 7. Performance Tests

### Test Case 7.1: Page Load Time
**Priority**: High | **Type**: Performance

| Field | Value |
|-------|-------|
| **Test ID** | PERF-001 |
| **Description** | Verify page loads within acceptable time |
| **Benchmark** | < 3 seconds on 3G network |

**Metrics to Measure:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Total Blocking Time (TBT): < 300ms

**Tools:** Lighthouse, WebPageTest

---

### Test Case 7.2: Bundle Size
**Priority**: Medium | **Type**: Performance

| Field | Value |
|-------|-------|
| **Test ID** | PERF-002 |
| **Description** | Verify production bundle is optimized |

**Expected Result:**
- ✅ Main bundle < 500KB (gzipped)
- ✅ Code splitting implemented
- ✅ Lazy loading for routes
- ✅ Tree shaking enabled

---

### Test Case 7.3: Memory Leaks
**Priority**: Medium | **Type**: Performance

| Field | Value |
|-------|-------|
| **Test ID** | PERF-003 |
| **Description** | Verify no memory leaks during usage |

**Steps:**
1. Open DevTools Performance tab
2. Record memory usage
3. Navigate between pages
4. Check memory release

**Expected Result:**
- ✅ Memory usage stays stable
- ✅ Event listeners cleaned up
- ✅ WebSockets closed properly
- ✅ No increasing heap size

---

### Test Case 7.4: Chart Rendering Performance
**Priority**: High | **Type**: Performance

| Field | Value |
|-------|-------|
| **Test ID** | PERF-004 |
| **Description** | Verify charts render efficiently with large datasets |

**Expected Result:**
- ✅ 10,000 data points render in < 1 second
- ✅ No frame drops during zoom/pan
- ✅ Smooth animations (60 FPS)
- ✅ Efficient re-renders

---

## 8. Security Tests

### Test Case 8.1: XSS Protection
**Priority**: Critical | **Type**: Security

| Field | Value |
|-------|-------|
| **Test ID** | SEC-001 |
| **Description** | Verify protection against XSS attacks |

**Steps:**
1. Attempt to inject script in input fields
2. Try: `<script>alert('XSS')</script>`
3. Submit form

**Expected Result:**
- ✅ Script not executed
- ✅ Input sanitized
- ✅ Displayed as plain text
- ✅ No console errors

---

### Test Case 8.2: CSRF Protection
**Priority**: High | **Type**: Security

| Field | Value |
|-------|-------|
| **Test ID** | SEC-002 |
| **Description** | Verify CSRF token implementation |

**Expected Result:**
- ✅ CSRF token in requests
- ✅ Token validated server-side
- ✅ Invalid token rejected

---

### Test Case 8.3: Password Storage
**Priority**: Critical | **Type**: Security

| Field | Value |
|-------|-------|
| **Test ID** | SEC-003 |
| **Description** | Verify passwords are hashed, not stored in plain text |

**Expected Result:**
- ✅ Password hashed (bcrypt/argon2)
- ✅ Never sent in response
- ✅ Not visible in network tab
- ✅ Minimum password requirements enforced

---

### Test Case 8.4: JWT Token Security
**Priority**: High | **Type**: Security

| Field | Value |
|-------|-------|
| **Test ID** | SEC-004 |
| **Description** | Verify JWT tokens are securely handled |

**Expected Result:**
- ✅ Token stored in httpOnly cookie or secure storage
- ✅ Token expires after timeout
- ✅ Refresh token mechanism works
- ✅ Token revoked on logout

---

## 9. Responsive Design Tests

### Test Case 9.1: Mobile View (320px - 480px)
**Priority**: High | **Type**: UI/Responsive

| Field | Value |
|-------|-------|
| **Test ID** | RESP-001 |
| **Description** | Verify app works on mobile devices |

**Viewports to Test:**
- iPhone SE: 375x667
- Galaxy S8: 360x740
- iPhone 12: 390x844

**Expected Result:**
- ✅ All content visible without horizontal scroll
- ✅ Touch targets at least 44x44px
- ✅ Navigation accessible (hamburger menu)
- ✅ Charts render correctly
- ✅ Forms are usable

---

### Test Case 9.2: Tablet View (768px - 1024px)
**Priority**: Medium | **Type**: UI/Responsive

| Field | Value |
|-------|-------|
| **Test ID** | RESP-002 |
| **Description** | Verify app adapts to tablet screens |

**Expected Result:**
- ✅ Layout adjusts appropriately
- ✅ Sidebar shows/collapses
- ✅ Charts scale correctly
- ✅ Two-column layouts work

---

### Test Case 9.3: Desktop View (> 1024px)
**Priority**: Medium | **Type**: UI/Responsive

| Field | Value |
|-------|-------|
| **Test ID** | RESP-003 |
| **Description** | Verify full desktop experience |

**Expected Result:**
- ✅ Multi-column layouts work
- ✅ Sidebar always visible
- ✅ Advanced charts available
- ✅ Hover states work

---

### Test Case 9.4: Orientation Change
**Priority**: Low | **Type**: UI/Responsive

| Field | Value |
|-------|-------|
| **Test ID** | RESP-004 |
| **Description** | Verify app handles orientation changes |

**Steps:**
1. Open app in portrait mode
2. Rotate to landscape
3. Rotate back to portrait

**Expected Result:**
- ✅ Layout adjusts automatically
- ✅ No content cutoff
- ✅ Charts resize correctly
- ✅ No JavaScript errors

---

## 10. End-to-End Tests

### Test Case 10.1: Complete Trading Flow
**Priority**: Critical | **Type**: E2E

| Field | Value |
|-------|-------|
| **Test ID** | E2E-001 |
| **Description** | Complete user journey from registration to trade |

**Steps:**
1. Register new account
2. Login with credentials
3. Navigate to trading page
4. Select asset
5. Place buy order
6. Monitor position
7. Close position
8. View transaction in history
9. Logout

**Expected Result:**
- ✅ All steps complete without errors
- ✅ Data persists correctly
- ✅ Balance updates accurately
- ✅ User session maintained

**Automation Tool:** Cypress, Playwright

```javascript
// Cypress E2E Test Example
describe('Complete Trading Flow', () => {
  it('should allow user to register, trade, and logout', () => {
    // Registration
    cy.visit('/register');
    cy.get('input[name="email"]').type('tarakjana55@gmail.com');
    cy.get('input[name="password"]').type('Test@123');
    cy.get('button[type="submit"]').click();
    
    // Login
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type('tarakjana55@gmail.com');
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="submit"]').click();
    
    // Trade
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="trade-button"]').click();
    cy.get('[data-testid="symbol-select"]').select('EUR/USD');
    cy.get('[data-testid="amount-input"]').type('1000');
    cy.get('[data-testid="buy-button"]').click();
    
    // Verify
    cy.get('[data-testid="success-toast"]').should('be.visible');
    cy.get('[data-testid="open-positions"]').should('contain', 'EUR/USD');
    
    // Logout
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('include', '/login');
  });
});
```

---

### Test Case 10.2: Portfolio Management Flow
**Priority**: High | **Type**: E2E

| Field | Value |
|-------|-------|
| **Test ID** | E2E-002 |
| **Description** | Complete portfolio management workflow |

**Steps:**
1. Login as existing user
2. View portfolio balance
3. Check open positions
4. Review transaction history
5. Modify position (add stop loss)
6. Close a position
7. Verify updated balance

**Expected Result:**
- ✅ All portfolio data accurate
- ✅ Real-time updates work
- ✅ Modifications persist
- ✅ History is complete

---

## Test Execution Summary

### Priority Distribution
- 🔴 **Critical**: 8 tests
- 🟠 **High**: 22 tests
- 🟡 **Medium**: 15 tests
- 🟢 **Low**: 5 tests

### Test Type Distribution
- **Functional**: 25 tests
- **Integration**: 8 tests
- **UI**: 10 tests
- **Security**: 4 tests
- **Performance**: 4 tests
- **E2E**: 2 tests

### Recommended Testing Tools
- **Unit Tests**: Jest, React Testing Library
- **E2E Tests**: Cypress, Playwright
- **API Tests**: Postman, Supertest
- **Performance**: Lighthouse, WebPageTest
- **Security**: OWASP ZAP, Burp Suite

---

## Test Environment Setup

### Required Software
```bash
# Install testing dependencies
npm install --save-dev \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  vitest \
  cypress \
  @cypress/code-coverage
```

### Environment Variables for Testing
```env
VITE_API_URL=http://localhost:3000
VITE_API_URI_PUBLISH=ws://localhost:3001
VITE_API_URL_WS=ws://localhost:3002
NODE_ENV=test
```

### Running Tests
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage

# Specific suite
npm test -- --grep "Authentication"
```

---

## Test Reporting

### Coverage Targets
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### Bug Tracking
All failed tests should be logged with:
- Test ID
- Steps to reproduce
- Expected vs actual results
- Screenshots/videos
- Environment details
- Severity level

---

**Document Version**: 1.0
**Last Updated**: December 28, 2025
