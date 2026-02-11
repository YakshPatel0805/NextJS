import ExploreBtn from "@/components/ExploreBtn"
import EventCard from "@/components/EventCard"
import connectDB from "@/lib/mongoose"
import Event from "@/models/Event"

const app = async () => {
  let events = [];
  
  try {
    await connectDB();
    const eventsData = await Event.find({}).sort({ date: 1 }).lean();
    events = eventsData.map((event: any) => ({
      ...event,
      _id: event._id.toString(),
      date: event.date.toISOString()
    }));
  } catch (error) {
    console.error('Failed to fetch events:', error);
  }

  return (
    <section>
      <h1 className="text-center">The Place for every Developer</h1>
      <p className="text-center mt-5">Connect with developers, share knowledge, and grow together.</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events available at the moment.</p>
        ) : (
          <ul className="events">
            {events.map((event: any) => (
              <li key={event._id}>
                <EventCard
                  id={event._id}
                  title={event.title}
                  description={event.description}
                  image={event.image}
                  slug={event.slug}
                  time={event.time}
                  venue={event.venue}
                  date={new Date(event.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  capacity={event.capacity}
                  bookedSeats={event.bookedSeats}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default app

