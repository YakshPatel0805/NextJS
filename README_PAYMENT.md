# Payment System Guide

## Payment Integration

The application now includes a complete payment processing system for event bookings.

## Features

✅ Online payment processing
✅ Payment status tracking (Pending, Completed, Failed)
✅ Transaction ID generation
✅ Payment amount calculation
✅ Secure payment form
✅ Payment status display on bookings page

## How It Works

### Booking Flow with Payment

1. **User selects event** → Views event details
2. **Fills booking form** → Name, email, number of seats
3. **Sees total amount** → Price per seat × Number of seats
4. **Clicks "Proceed to Payment"** → Booking created with "pending" status
5. **Payment form appears** → Modal with card details
6. **Enters payment details** → Card number, name, expiry, CVV
7. **Payment processed** → Simulated payment gateway
8. **Payment success** → Booking status updated to "completed"
9. **Confirmation shown** → Success message with transaction ID

### Payment Status

**Pending (⏳)**
- Booking created but payment not completed
- User can see booking in "My Bookings" with pending status
- Yellow badge displayed

**Completed (💳)**
- Payment successfully processed
- Transaction ID generated and stored
- Blue badge displayed
- Full booking confirmation

**Failed (❌)**
- Payment processing failed
- Booking remains but marked as failed
- Red badge displayed
- User can retry payment

## Demo Payment System

### How to Test

The payment system is in **demo mode** for testing:

**Success:** Card numbers ending in **even digits** (0, 2, 4, 6, 8)
- Example: `1234 5678 9012 3456` ✅ Success

**Failure:** Card numbers ending in **odd digits** (1, 3, 5, 7, 9)
- Example: `1234 5678 9012 3457` ❌ Failure

### Test Cards

**Successful Payment:**
```
Card Number: 1234 5678 9012 3456
Name: Test User
Expiry: 12/25
CVV: 123
```

**Failed Payment:**
```
Card Number: 1234 5678 9012 3457
Name: Test User
Expiry: 12/25
CVV: 123
```

## Event Pricing

Events now include ticket prices:

| Event | Price |
|-------|-------|
| Tech Innovation Summit | ₹2,999 |
| AI & ML Conference | ₹3,499 |
| Web Development Bootcamp | ₹1,999 |
| Startup Pitch Night | ₹499 |
| Cloud Computing Workshop | ₹1,499 |
| Cybersecurity Summit | ₹2,499 |

## Database Schema Updates

### Event Model
```typescript
{
  title: string;
  description: string;
  image: string;
  slug: string;
  time: string;
  venue: string;
  date: Date;
  capacity: number;
  bookedSeats: number;
  price: number;  // NEW
}
```

### Booking Model
```typescript
{
  eventId: ObjectId;
  userName: string;
  userEmail: string;
  numberOfSeats: number;
  bookingDate: Date;
  status: 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';  // NEW
  paymentAmount: number;  // NEW
  paymentMethod: string;  // NEW
  transactionId: string;  // NEW
}
```

## API Endpoints

### Create Booking
`POST /api/bookings`
- Creates booking with pending payment status
- Calculates payment amount
- Returns booking ID for payment

### Process Payment
`POST /api/payments/process`
- Processes payment (demo mode)
- Updates booking payment status
- Generates transaction ID

### Get User Bookings
`GET /api/bookings/user?email={email}`
- Returns all bookings with payment status
- Includes transaction IDs

## User Interface

### Booking Form
- Shows price per seat
- Calculates total amount dynamically
- "Proceed to Payment" button

### Payment Modal
- Card details form
- Total amount display
- Secure payment indicator
- Cancel option

### My Bookings Page
- Payment status badges:
  - 💳 Payment Successful (Blue)
  - ⏳ Payment Pending (Yellow)
  - ❌ Payment Failed (Red)
- Transaction ID display
- Total amount paid

## Admin Features

### Create Event
- New field: Ticket Price (₹)
- Required field with validation
- Supports decimal values

### View Bookings
- See payment status for all bookings
- Track revenue
- Monitor pending payments

## Production Integration

For production, replace the demo payment system with a real payment gateway:

### Recommended Gateways
- **Razorpay** (India)
- **Stripe** (International)
- **PayPal**
- **Paytm**

### Integration Steps
1. Sign up for payment gateway
2. Get API keys
3. Replace `simulatePayment()` function
4. Add webhook handlers
5. Implement refund logic
6. Add payment receipts

## Security Notes

⚠️ **Current Implementation:**
- Demo mode only
- No real payment processing
- No PCI compliance needed

⚠️ **For Production:**
- Use HTTPS only
- Never store card details
- Use payment gateway SDKs
- Implement PCI DSS compliance
- Add fraud detection
- Enable 3D Secure
- Add payment webhooks
- Implement refund system

## Testing the Payment System

1. **Seed the database:**
   ```bash
   npm run seed
   ```

2. **Create an account and login**

3. **Browse events** → Click on any event

4. **Fill booking form:**
   - Name: Your Name
   - Email: your@email.com
   - Seats: 1

5. **Click "Proceed to Payment"**

6. **Enter card details:**
   - Card: 1234 5678 9012 3456 (even = success)
   - Name: Test User
   - Expiry: 12/25
   - CVV: 123

7. **Click "Pay"** → Wait 2 seconds for processing

8. **See success message** → Booking confirmed!

9. **Check "My Bookings"** → See payment status

## Payment Status Messages

### On Booking Page
- **Completed:** "💳 Payment Successful" (Blue badge)
- **Pending:** "⏳ Payment Pending" (Yellow badge)
- **Failed:** "❌ Payment Failed" (Red badge)

### Transaction Details
- Transaction ID shown for completed payments
- Total amount displayed
- Payment date recorded

---

**Your payment system is ready! 💳**

Test it with card number ending in even digits for success!
