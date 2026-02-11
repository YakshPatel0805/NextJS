# DevEvent - Complete Event Management System

## 🎉 Final Application Structure

### Landing Page (/)
Beautiful landing page with:
- Hero section with logo and tagline
- Login/Signup buttons
- Features section (Discover, Book, Manage)
- How It Works (4-step process)
- Statistics showcase
- Call-to-action section
- Footer

**Auto-redirect:**
- Logged-in users automatically redirected to their dashboard
- Admin → `/admin/home`
- User → `/home`

### User Flow

#### 1. Landing Page (`/`)
- First page visitors see
- Information about DevEvent
- Login and Signup buttons
- Features and benefits

#### 2. Authentication
**Signup (`/signup`)**
- Create account
- Choose role (User or Admin)
- Auto-login after signup

**Login (`/login`)**
- Email and password
- Role-based redirect

#### 3. User Dashboard (`/home`)
- Browse all events
- View event details
- Book events
- Navbar: Home | My Bookings | User Name | Logout

#### 4. My Bookings (`/users`)
- Search bookings by email
- View all booked events
- Event details and booking info

#### 5. Event Details (`/events/[id]`)
- Full event information
- Booking form
- Real-time seat availability

### Admin Flow

#### 1. Admin Dashboard (`/admin/home`)
- Statistics cards (Total Events, Bookings, Available Seats)
- List all events
- View/Delete events
- Create Event button
- Navbar: Home | Dashboard | Create Event | Admin Name | Logout

#### 2. Create Event (`/admin/create`)
- Form to create new events
- All event details
- Auto-redirect to dashboard after creation

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database
```bash
# Seed events
npm run seed

# Seed users
npm run seed-users
```

### 3. Run Application
```bash
npm run dev
```

### 4. Visit Application
Open `http://localhost:3000`

## 🔐 Test Accounts

**Admin Account:**
- Email: `admin@devevent.com`
- Password: `admin123`
- Access: Admin Dashboard, Create Events

**User Account:**
- Email: `user@devevent.com`
- Password: `user123`
- Access: Browse Events, Book Events, View Bookings

## 📁 Route Structure

```
/                       → Landing Page (public)
/signup                 → User Registration (public)
/login                  → User Login (public)
/home                   → User Dashboard (protected)
/users                  → User Bookings (protected)
/events/[id]            → Event Details (protected)
/admin                  → Admin Redirect (protected)
/admin/home             → Admin Dashboard (admin only)
/admin/create           → Create Event (admin only)
```

## 🎨 Features

### For Users:
✅ Browse events
✅ View event details
✅ Book events with seat selection
✅ View booking history
✅ Email-based booking search
✅ Real-time seat availability

### For Admins:
✅ Dashboard with statistics
✅ Create new events
✅ View all events
✅ Delete events
✅ Track bookings
✅ Manage event capacity

### General:
✅ Role-based authentication
✅ Auto-redirect based on role
✅ Responsive design
✅ Real-time navbar updates
✅ Beautiful landing page
✅ Form validation
✅ Error handling

## 🔄 Application Flow

### First Visit
1. User visits `http://localhost:3000`
2. Sees landing page with information
3. Clicks "Sign Up" or "Login"

### New User
1. Clicks "Sign Up"
2. Fills registration form
3. Selects role (User/Admin)
4. Auto-redirects to appropriate dashboard

### Returning User
1. Clicks "Login"
2. Enters credentials
3. Redirects based on role:
   - Admin → Admin Dashboard
   - User → Events Home

### Logout
1. Clicks "Logout" in navbar
2. Redirects to landing page
3. Can login again

## 🎯 Key Pages

### Landing Page Features:
- Hero with gradient text
- Feature cards with icons
- Step-by-step guide
- Statistics display
- Multiple CTAs
- Responsive design

### Admin Dashboard:
- Statistics overview
- Event management
- Quick actions
- Professional layout

### User Dashboard:
- Event grid
- Search and filter
- Easy booking
- Clean interface

## 📝 Notes

- Landing page only shows to non-authenticated users
- Logged-in users automatically redirected
- Navbar dynamically updates based on user role
- All routes protected except landing, login, signup
- Full page reload on login/logout for navbar update

## 🎨 Design Highlights

- Gradient backgrounds
- Glassmorphism effects
- Smooth transitions
- Hover effects
- Responsive grid layouts
- Professional color scheme
- Clear typography
- Intuitive navigation

## 🔧 Technical Stack

- Next.js 16
- TypeScript
- MongoDB with Mongoose
- Tailwind CSS
- React Context API
- Client-side routing
- Form validation
- Real-time updates

---

**Your complete event management system is ready! 🚀**

Visit `http://localhost:3000` to see the beautiful landing page!
