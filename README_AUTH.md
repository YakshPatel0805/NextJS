# Event Management System - Authentication Guide

## Authentication System

The application now includes a complete authentication system with role-based access control.

## Features

- User Registration (Signup)
- User Login
- Role-based Access (Admin & User)
- Protected Routes
- Automatic Redirection based on Role

## User Roles

### Admin
- Can create, edit, and delete events
- Access to admin dashboard at `/admin`
- Can view all bookings

### User
- Can browse and book events
- Can view their bookings at `/users`
- Cannot access admin features

## Getting Started

### 1. Seed the Database

First, seed the events:
```bash
npm run seed
```

Then, seed test users:
```bash
npm run seed-users
```

### 2. Test Accounts

After seeding, you can use these test accounts:

**Admin Account:**
- Email: `admin@devevent.com`
- Password: `admin123`

**User Account:**
- Email: `user@devevent.com`
- Password: `user123`

### 3. Run the Application

```bash
npm run dev
```

## Application Flow

1. **First Visit**: Application redirects to `/signup`
2. **Signup**: User creates an account and selects role (User or Admin)
3. **Login**: User logs in with email and password
4. **Redirect**:
   - Admin users → `/admin` (Create Event page)
   - Regular users → `/` (Home page with events)

## Pages

### Public Pages
- `/signup` - User registration
- `/login` - User login

### Protected Pages
- `/` - Home page (requires login)
- `/events/[id]` - Event details (requires login)
- `/users` - User bookings (requires login)
- `/admin` - Create events (requires admin role)

## Navigation

The navbar dynamically shows options based on user role:

**For Users:**
- Home
- My Bookings
- User Name
- Logout

**For Admins:**
- Home
- Create Event
- User Name
- Logout

## Security Notes

⚠️ **Important**: This is a basic authentication system for demonstration purposes.

For production, you should:
1. Use bcrypt to hash passwords
2. Implement JWT tokens or session management
3. Add HTTPS
4. Add CSRF protection
5. Implement rate limiting
6. Add email verification
7. Add password reset functionality

## Creating New Users

Users can sign up at `/signup` and choose their role:
- Select "User - Book Events" for regular users
- Select "Admin - Manage Events" for administrators

## Logout

Click the "Logout" button in the navbar to:
- Clear user session
- Redirect to signup page
