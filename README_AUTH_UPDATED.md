# Event Management System - Authentication Guide (Updated)

## Authentication System

The application includes a complete authentication system with automatic role-based access control.

## Features

- User Registration (Signup)
- User Login
- Automatic Role Assignment based on Email
- Protected Routes
- Automatic Redirection based on Role

## How Role Assignment Works

### Automatic Role Detection

When a user signs up, the system automatically determines their role based on their email address:

**Admin Emails** (configured in `lib/config.ts`):
- `admin@devevent.com`
- `admin@example.com`
- Any email added to the `ADMIN_EMAILS` array

**User Role**:
- All other emails automatically get "user" role

### Adding More Admin Emails

Edit `lib/config.ts` and add emails to the `ADMIN_EMAILS` array:

```typescript
export const ADMIN_EMAILS = [
  'admin@devevent.com',
  'admin@example.com',
  'youradmin@company.com',  // Add your admin emails here
];
```

## Getting Started

### 1. Seed the Database

Seed events (no user seeding needed):
```bash
npm run seed
```

### 2. Run the Application

```bash
npm run dev
```

### 3. Create Your First Admin Account

1. Go to `http://localhost:3000`
2. Click "Sign Up"
3. Use an admin email (e.g., `admin@devevent.com`)
4. Create your password
5. You'll automatically be assigned admin role and redirected to admin dashboard

### 4. Create Regular User Accounts

1. Sign up with any other email
2. Automatically assigned "user" role
3. Redirected to events home page

## Application Flow

### First Visit
1. User visits `http://localhost:3000`
2. Sees landing page with information
3. Clicks "Sign Up" or "Login"

### Signup Process
1. User enters name, email, and password
2. System checks if email is in admin list
3. Automatically assigns role:
   - Admin email → Admin role → Redirect to `/admin/home`
   - Other email → User role → Redirect to `/home`

### Login Process
1. User enters email and password
2. System verifies credentials from database
3. Redirects based on stored role:
   - Admin → `/admin/home`
   - User → `/home`

## User Roles

### Admin
- Can create, edit, and delete events
- Access to admin dashboard at `/admin/home`
- Can view all bookings
- Navbar shows: Home | Dashboard | Create Event

### User
- Can browse and book events
- Can view their bookings at `/users`
- Cannot access admin features
- Navbar shows: Home | My Bookings

## Pages

### Public Pages
- `/` - Landing page
- `/signup` - User registration (no role selection)
- `/login` - User login

### Protected Pages
- `/home` - Events list (requires login)
- `/events/[id]` - Event details (requires login)
- `/users` - User bookings (requires login)
- `/admin/home` - Admin dashboard (requires admin role)
- `/admin/create` - Create events (requires admin role)

## Security Notes

⚠️ **Important**: This is a basic authentication system for demonstration purposes.

For production, you should:
1. Use bcrypt to hash passwords ✅ (TODO)
2. Implement JWT tokens or session management
3. Add HTTPS
4. Add CSRF protection
5. Implement rate limiting
6. Add email verification
7. Add password reset functionality
8. Store admin emails in environment variables

## No Static Credentials

- No hardcoded test accounts
- All users created through signup
- All credentials stored in database
- Roles assigned automatically based on email

## Creating Your First Admin

To create your first admin account:

1. Make sure `admin@devevent.com` is in the `ADMIN_EMAILS` array (it is by default)
2. Go to signup page
3. Sign up with `admin@devevent.com`
4. Create any password you want
5. You're now an admin!

## Managing Admin Emails

Edit `lib/config.ts`:

```typescript
export const ADMIN_EMAILS = [
  'admin@devevent.com',      // Default admin
  'ceo@company.com',         // Add your emails
  'manager@company.com',     // Add more as needed
];
```

After adding emails, users with those emails will automatically get admin access when they sign up.

## Logout

Click the "Logout" button in the navbar to:
- Clear user session
- Redirect to landing page
