⚡ EV Charging Allocation System

A web-based system to manage and book electric vehicle (EV) charging slots — built using React.js and Supabase (PostgreSQL + Auth).

🚀 Overview

The EV Charging Allocation System allows EV owners to find available charging stations, book a slot, and track their bookings.
Admins can add new charging stations, and the system automatically updates available connectors after each booking.

This project demonstrates real-time database integration, authentication, and trigger-based automation — making it ideal for a DBMS mini project.

🧩 Features
👥 User Features

Sign up / Login using email & password (Supabase Auth)

View list of available charging stations

Book a slot for a chosen time

View personal booking history with time & station name

🧑‍💼 Admin Features

Add new charging stations

See all added stations in the system

⚙️ Automatic Database Logic

When a booking is made, the station’s available connector count decreases automatically (via SQL trigger).

Only logged-in users can make bookings.

🗄 Database Design (Supabase / PostgreSQL)
Tables
Table	Description
users	Stores app user details and links to Supabase Auth users
stations	Charging station info (name, location, connector count)
bookings	Stores booking details (user, station, start time, etc.)




⚙️ Installation & Setup (to run on any machine)
🔹 1. Clone the project
git clone https://github.com/yourusername/ev-charging.git
cd ev-charging

🔹 2. Install dependencies
npm install

🔹 3. Create environment variables

Create a `.env` file with:

VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

For Vercel, add the same two variables in the project settings under Environment Variables.

🔹 4. Run locally
npm run dev

Then open:
http://localhost:5173

🔹 5. Deploy to Vercel

The app is configured as a Vite SPA. `vercel.json` includes a rewrite so routes like `/login` and `/book` work on direct refresh in production.



WORK TO DO : Make a good UI which displays a dashboard in creative and good format using the existing details.
